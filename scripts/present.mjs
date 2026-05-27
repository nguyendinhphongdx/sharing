#!/usr/bin/env node
// Chạy Slidev cho một topic cụ thể.
//   node scripts/present.mjs <slug>              # dev server
//   node scripts/present.mjs <slug> --open       # dev + mở trình duyệt
//   node scripts/present.mjs <slug> --build       # build tĩnh -> dist/
//   node scripts/present.mjs <slug> --export      # export PDF
//   node scripts/present.mjs --list               # liệt kê topic
import { existsSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const topicsDir = join(root, 'topics')

const args = process.argv.slice(2)
const flags = new Set(args.filter((a) => a.startsWith('--')))
const slug = args.find((a) => !a.startsWith('--'))

function listTopics() {
  if (!existsSync(topicsDir)) return []
  return readdirSync(topicsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(topicsDir, d.name, 'slides.md')))
    .map((d) => d.name)
}

if (flags.has('--list') || !slug) {
  const topics = listTopics()
  if (!slug && !flags.has('--list')) {
    console.error('Thiếu <slug>. Dùng: node scripts/present.mjs <slug> [--build|--export|--open]')
  }
  console.log(topics.length ? 'Topics:\n' + topics.map((t) => '  - ' + t).join('\n') : 'Chưa có topic nào.')
  process.exit(slug ? 0 : 1)
}

const entry = join('topics', slug, 'slides.md')
if (!existsSync(join(root, entry))) {
  console.error(`Không tìm thấy ${entry}. Topic hiện có: ${listTopics().join(', ') || '(trống)'}`)
  process.exit(1)
}

let sub = []
if (flags.has('--build')) sub = ['build', entry]
else if (flags.has('--export')) sub = ['export', entry]
else sub = [entry, ...(flags.has('--open') ? ['--open'] : [])]

// Cho phép truyền thêm cờ lạ (vd --port 3040) xuống Slidev
const passthrough = args.filter(
  (a) => a.startsWith('--') && !['--build', '--export', '--open', '--list'].includes(a),
)

const cmd = ['slidev', ...sub, ...passthrough]
console.log(`> npx ${cmd.join(' ')}  (cwd: ${root})`)
const res = spawnSync('npx', cmd, { cwd: root, stdio: 'inherit', shell: true })
process.exit(res.status ?? 0)
