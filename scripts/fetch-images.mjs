#!/usr/bin/env node
// Tải ảnh chủ đề về public/images của một topic, kèm nguồn/bản quyền (credits.json).
//
// Nguồn ảnh (--source):
//   web        Tìm bằng trình duyệt thật (Playwright) — Google/Bing Images. Liên quan
//              cao nhất, KHÔNG cần key, NHƯNG bản quyền hỗn hợp → hợp dùng nội bộ. (mặc định)
//   openverse  Ảnh Creative Commons (an toàn bản quyền).
//   commons    Wikimedia Commons (an toàn bản quyền).
//   cc         openverse → commons (chỉ ảnh CC).
//   all        web → openverse → commons.
//
//   node scripts/fetch-images.mjs <slug> --query "mcp architecture" --query "ai agent"
//   node scripts/fetch-images.mjs <slug> --query "..." --source web --engine bing|google
//   node scripts/fetch-images.mjs <slug> --query "..." --source cc        # an toàn bản quyền
//   node scripts/fetch-images.mjs <slug> --url https://.../anh.jpg
//
// Ảnh tham chiếu trong slide bằng đường dẫn tuyệt đối: /images/<tên-file>.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const argv = process.argv.slice(2)
const slug = argv.find((a) => !a.startsWith('--'))
function multi(name) {
  const out = []
  for (let i = 0; i < argv.length; i++) if (argv[i] === `--${name}`) out.push(argv[i + 1])
  return out.filter(Boolean)
}
function single(name, def) {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def
}

if (!slug) {
  console.error('Dùng: node scripts/fetch-images.mjs <slug> --query "..." [--source web|cc|openverse|commons|all]')
  process.exit(1)
}
if (!existsSync(join(root, 'topics', slug))) {
  console.error(`Không tìm thấy topics/${slug}. Tạo topic trước: node scripts/new-topic.mjs ${slug}`)
  process.exit(1)
}
const outDir = join(root, 'topics', slug, 'public', 'images')
mkdirSync(outDir, { recursive: true })

const queries = multi('query')
const directUrls = multi('url')
const total = parseInt(single('limit', '6'), 10)
const perQuery = parseInt(single('per-query', '3'), 10)
const source = single('source', 'web')
const engine = single('engine', 'bing') // cho source=web: bing (tin cậy) | google
const UA = 'sharing-slides-harness/0.1 (educational knowledge-sharing slides)'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const stripTags = (s) => (s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
const sanitize = (s) =>
  (s || 'image').replace(/^File:/i, '').replace(/\.[a-z0-9]+$/i, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'image'
const extOf = (url) => {
  const m = url.split('?')[0].match(/\.(jpe?g|png|webp)$/i)
  return m ? m[0].toLowerCase().replace('.jpeg', '.jpg') : '.jpg'
}
const fmtCC = (lic, ver) => {
  if (!lic) return 'unknown'
  if (/^(cc0|pdm)$/i.test(lic)) return 'CC0 / Public domain'
  return `CC ${lic.toUpperCase()}${ver ? ' ' + ver : ''}`
}

// --- web (Playwright) ---
const needWeb = source === 'web' || source === 'all'
let searcher = null
if (needWeb) {
  try {
    const { createSearcher } = await import('./lib/web-images.mjs')
    searcher = await createSearcher()
  } catch (e) {
    console.error(`! Không khởi tạo được trình duyệt (Playwright): ${e.message}`)
    console.error('  Cài: npm i -D playwright-chromium   — hoặc dùng --source cc')
    process.exit(1)
  }
}

// --- Openverse (CC) ---
async function searchOpenverse(query, limit) {
  const url = 'https://api.openverse.org/v1/images/?' +
    new URLSearchParams({ q: query, page_size: String(limit), orientation: 'landscape' })
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Openverse ${res.status}`)
  const data = await res.json()
  return (data.results || []).map((r) => ({
    title: r.title || query, downloadUrl: r.url, descriptionUrl: r.foreign_landing_url || r.url,
    license: fmtCC(r.license, r.license_version), artist: r.creator || 'unknown',
    provider: `Openverse/${r.source || 'web'}`, width: r.width, height: r.height,
  }))
}

// --- Wikimedia Commons (CC) ---
async function searchCommons(query, limit) {
  const url = 'https://commons.wikimedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query', format: 'json', generator: 'search',
      gsrsearch: `${query} filetype:bitmap`, gsrnamespace: '6', gsrlimit: String(limit),
      prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: '1920',
    })
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Commons ${res.status}`)
  const data = await res.json()
  const pages = data?.query?.pages ? Object.values(data.query.pages) : []
  return pages.map((p) => ({ title: p.title, ...(p.imageinfo?.[0] || {}) })).filter((p) => p.thumburl)
    .sort((a, b) => (b.thumbwidth || 0) - (a.thumbwidth || 0))
    .map((r) => ({
      title: r.title, downloadUrl: r.thumburl, descriptionUrl: r.descriptionurl || '',
      license: stripTags(r.extmetadata?.LicenseShortName?.value) || 'unknown',
      artist: stripTags(r.extmetadata?.Artist?.value) || 'unknown',
      provider: 'Wikimedia Commons', width: r.thumbwidth, height: r.thumbheight,
    }))
}

function orderFor() {
  switch (source) {
    case 'web': return ['web']
    case 'openverse': return ['openverse']
    case 'commons': return ['commons']
    case 'cc': return ['openverse', 'commons']
    case 'all': return ['web', 'openverse', 'commons']
    default: return ['web']
  }
}

async function candidatesFor(query) {
  const out = []
  for (const src of orderFor()) {
    try {
      if (src === 'web') out.push(...(await searcher.search(query, { engine, limit: perQuery * 3 })))
      else if (src === 'openverse') out.push(...(await searchOpenverse(query, perQuery * 3)))
      else out.push(...(await searchCommons(query, perQuery * 3)))
    } catch (e) {
      console.warn(`! Lỗi tìm "${query}" (${src}): ${e.message}`)
    }
    if (out.length >= perQuery * 2) break
  }
  return out
}

// Tải: ưu tiên trình duyệt (vượt hotlink), fallback fetch thường + retry
async function download(url, dest, tries = 4) {
  if (searcher) {
    try { const buf = await searcher.fetchBytes(url); writeFileSync(dest, buf); return buf.length } catch {}
  }
  let lastStatus = 0
  for (let attempt = 1; attempt <= tries; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.ok) { const buf = Buffer.from(await res.arrayBuffer()); writeFileSync(dest, buf); return buf.length }
    lastStatus = res.status
    if ((res.status === 429 || res.status === 503) && attempt < tries) {
      await sleep(1200 * attempt); continue
    }
    throw new Error(`HTTP ${res.status}`)
  }
  throw new Error(`HTTP ${lastStatus} sau ${tries} lần thử`) // cạn retry (429/503)
}

const credits = []
const seen = new Set()
let idx = 0

for (const query of queries) {
  if (credits.length >= total) break
  const results = await candidatesFor(query)
  let taken = 0
  for (const r of results) {
    if (credits.length >= total || taken >= perQuery) break
    const key = r.descriptionUrl || r.downloadUrl
    if (!r.downloadUrl || seen.has(key)) continue
    seen.add(key)
    const ext = extOf(r.downloadUrl)
    const file = `${String(++idx).padStart(2, '0')}-${sanitize(r.title)}${ext}`
    try {
      const bytes = await download(r.downloadUrl, join(outDir, file))
      if (!bytes || bytes < 6000) throw new Error('ảnh quá nhỏ') // bỏ icon/placeholder
      credits.push({
        file: `images/${file}`, ref: `/images/${file}`,
        title: stripTags(r.title), descriptionUrl: r.descriptionUrl,
        license: r.license || 'web (dùng nội bộ)',
        artist: r.artist || '—', provider: r.provider, query, width: r.width, height: r.height,
      })
      taken++
      console.log(`  ✓ ${file}  (${(bytes / 1024).toFixed(0)} KB)  [${query} · ${r.provider}]`)
      await sleep(350)
    } catch (e) {
      console.warn(`  ! Bỏ qua ${r.downloadUrl.slice(0, 70)}…: ${e.message}`)
    }
  }
}

for (const url of directUrls) {
  if (credits.length >= total) break
  const file = `${String(++idx).padStart(2, '0')}-direct${extOf(url)}`
  try {
    const bytes = await download(url, join(outDir, file))
    credits.push({ file: `images/${file}`, ref: `/images/${file}`, title: file, descriptionUrl: url, license: 'unknown', artist: '—', provider: 'direct-url', query: 'direct-url' })
    console.log(`  ✓ ${file}  (${(bytes / 1024).toFixed(0)} KB)  [url]`)
  } catch (e) {
    console.warn(`  ! Tải lỗi ${url}: ${e.message}`)
  }
}

await searcher?.close()

// Gradient dự phòng — luôn có ít nhất 1 nền teal dùng được
writeFileSync(join(outDir, 'gradient.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ecfeff"/><stop offset="45%" stop-color="#f0fdfa"/><stop offset="100%" stop-color="#f6f9fb"/>
    </linearGradient>
    <radialGradient id="r" cx="80%" cy="0%" r="70%"><stop offset="0%" stop-color="#cffafe"/><stop offset="100%" stop-color="#cffafe" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#g)"/><rect width="1920" height="1080" fill="url(#r)"/>
</svg>`)

writeFileSync(join(outDir, 'credits.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), source, engine: needWeb ? engine : undefined, images: credits }, null, 2))

console.log(`\n✓ ${credits.length} ảnh -> topics/${slug}/public/images/  (source: ${source})`)
if (credits.length === 0) console.log('  (Không tải được ảnh — slide sẽ dùng gradient.svg / gradient CSS của theme.)')
console.log('  Bản quyền/nguồn: topics/' + slug + '/public/images/credits.json')
