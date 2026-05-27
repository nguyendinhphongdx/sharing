// Tìm ảnh trên web bằng trình duyệt thật (Playwright) — KHÔNG cần API key.
// Google Images là engine chính, Bing Images làm fallback.
// LƯU Ý BẢN QUYỀN: ảnh trả về là bản quyền hỗn hợp/không rõ — hợp dùng nội bộ;
// kiểm tra license trước khi đăng công khai. Nguồn được ghi trong credits.json.
import { chromium } from 'playwright-chromium'

const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36'

// Bỏ ảnh stock có watermark (xem preview là dính chữ) và CDN nội bộ mạng xã hội
const BLOCK = /shutterstock|istockphoto|gettyimages|alamy|dreamstime|123rf|depositphotos|stock\.adobe|freepik|fbsbx|lookaside|\.svg($|\?)/i

export async function createSearcher({ headless = true } = {}) {
  const browser = await chromium.launch({ headless })
  const context = await browser.newContext({
    userAgent: DESKTOP_UA,
    locale: 'en-US',
    viewport: { width: 1366, height: 900 },
  })
  // Bỏ qua trang consent của Google
  await context.addCookies([
    { name: 'CONSENT', value: 'YES+cb', domain: '.google.com', path: '/' },
    { name: 'SOCS', value: 'CAISNQgQEitib3E', domain: '.google.com', path: '/' },
  ])

  async function searchGoogle(query, limit) {
    const page = await context.newPage()
    try {
      await page.goto(
        `https://www.google.com/search?tbm=isch&hl=en&gl=us&q=${encodeURIComponent(query)}`,
        { waitUntil: 'domcontentloaded', timeout: 30000 },
      )
      // Bấm nút đồng ý consent nếu còn hiện
      for (const label of ['Accept all', 'I agree', 'Accept']) {
        const btn = page.getByRole('button', { name: label })
        if (await btn.count().catch(() => 0)) { await btn.first().click().catch(() => {}); break }
      }
      await page.waitForTimeout(1200)
      await page.mouse.wheel(0, 4000).catch(() => {})
      await page.waitForTimeout(900)

      let html = await page.content()
      // Giải mã escape trong JSON nhúng để bắt URL ảnh gốc
      html = html.replace(/\\u003d/g, '=').replace(/\\u0026/g, '&').replace(/\\\//g, '/')
      // Cấu trúc Google: ["<url>",<height>,<width>]
      const re = /\["(https?:\/\/[^"]+?\.(?:jpe?g|png|webp)(?:\?[^"]*)?)",(\d+),(\d+)\]/g
      const seen = new Set()
      const out = []
      let m
      while ((m = re.exec(html)) && out.length < limit * 4) {
        const url = m[1]
        if (/gstatic\.com|googleusercontent|google\.com|ggpht|googlelogo|googleapis/.test(url)) continue
        if (BLOCK.test(url)) continue
        const h = +m[2], w = +m[3]
        if (w < 500 || h < 350) continue
        if (seen.has(url)) continue
        seen.add(url)
        out.push({ title: query, downloadUrl: url, descriptionUrl: url, provider: 'Google Images', width: w, height: h })
      }
      return out.slice(0, limit)
    } finally {
      await page.close()
    }
  }

  async function searchBing(query, limit) {
    const page = await context.newPage()
    try {
      await page.goto(
        `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2&first=1`,
        { waitUntil: 'domcontentloaded', timeout: 30000 },
      )
      await page.waitForSelector('a.iusc', { timeout: 15000 }).catch(() => {})
      const metas = await page.$$eval('a.iusc', (els) => els.map((e) => e.getAttribute('m')).filter(Boolean))
      const out = []
      for (const s of metas) {
        try {
          const j = JSON.parse(s)
          if (j.murl && !BLOCK.test(j.murl) && /\.(jpe?g|png|webp)(\?|$)/i.test(j.murl)) {
            out.push({ title: j.t || query, downloadUrl: j.murl, descriptionUrl: j.purl || j.murl, provider: 'Bing Images' })
          }
        } catch {}
        if (out.length >= limit) break
      }
      return out
    } finally {
      await page.close()
    }
  }

  // engine: 'google' | 'bing'. Google rỗng → tự fallback Bing.
  async function search(query, { engine = 'google', limit = 6 } = {}) {
    let res = []
    try {
      res = engine === 'bing' ? await searchBing(query, limit) : await searchGoogle(query, limit)
    } catch (e) {
      console.warn(`  ! search "${query}" (${engine}) lỗi: ${e.message.split('\n')[0]}`)
    }
    if (!res.length && engine !== 'bing') {
      try { res = await searchBing(query, limit) } catch {}
    }
    return res
  }

  // Tải bytes qua request context của trình duyệt (mang theo header/cookie thật → ít bị 403)
  async function fetchBytes(url) {
    const resp = await context.request.get(url, {
      timeout: 30000,
      headers: { Referer: 'https://www.google.com/', 'User-Agent': DESKTOP_UA },
    })
    if (!resp.ok()) throw new Error(`HTTP ${resp.status()}`)
    return Buffer.from(await resp.body())
  }

  async function close() {
    await browser.close().catch(() => {})
  }

  return { search, fetchBytes, close }
}
