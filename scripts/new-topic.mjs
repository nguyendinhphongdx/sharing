#!/usr/bin/env node
// Tạo một topic mới từ templates/topic.
//   node scripts/new-topic.mjs <slug> [--title "..."] [--author "..."]
import { existsSync, cpSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const templateDir = join(root, 'templates', 'topic')

const args = process.argv.slice(2)
function opt(name, def = '') {
  const i = args.indexOf(`--${name}`)
  return i >= 0 && args[i + 1] ? args[i + 1] : def
}
const slug = args.find((a) => !a.startsWith('--'))

if (!slug) {
  console.error('Dùng: node scripts/new-topic.mjs <slug> [--title "..."] [--author "..."]')
  process.exit(1)
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error(`Slug "${slug}" không hợp lệ. Chỉ dùng chữ thường, số và dấu gạch ngang.`)
  process.exit(1)
}

const dest = join(root, 'topics', slug)
if (existsSync(dest)) {
  console.error(`Topic đã tồn tại: topics/${slug}`)
  process.exit(1)
}

const titleFromSlug = slug
  .split('-')
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(' ')

const vars = {
  TITLE: opt('title', titleFromSlug),
  SLUG: slug,
  DATE: new Date().toISOString().slice(0, 10),
  AUTHOR: opt('author', process.env.SLIDES_AUTHOR || ''),
}

cpSync(templateDir, dest, { recursive: true })

// Thay placeholder {{VAR}} trong các file văn bản
function fill(file) {
  let txt = readFileSync(file, 'utf8')
  for (const [k, v] of Object.entries(vars)) {
    txt = txt.replaceAll(`{{${k}}}`, v)
  }
  writeFileSync(file, txt)
}
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(md|json|ya?ml)$/.test(name)) fill(p)
  }
}
walk(dest)

// Tạo sẵn thư mục research/ để topic-researcher ghi notes từng vòng vào đó.
mkdirSync(join(dest, 'research'), { recursive: true })

console.log(`✓ Đã tạo topics/${slug}`)
console.log(`  - topics/${slug}/brief.md        (tiến hoá Stage A → B → C — xem file)`)
console.log(`  - topics/${slug}/research/       (notes thô do topic-researcher ghi)`)
console.log(`  - topics/${slug}/slides.md       (dùng theme: ../../theme)`)
console.log(`\nTiếp theo (skill /make-slides sẽ điều phối):`)
console.log(`  1. Research broad → research/round-1-broad.md`)
console.log(`  2. Stage A brief — chọn outline`)
console.log(`  3. Stage B brief — duyệt key points (lặp research nếu cần)`)
console.log(`  4. Stage C brief — chi tiết per-slide → cổng duyệt cuối`)
console.log(`  5. node scripts/fetch-images.mjs ${slug} --query "..."`)
console.log(`  6. slide-builder → npm run dev -- ${slug}`)
