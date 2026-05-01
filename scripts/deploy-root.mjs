// Copy the production bundle in dist/ to the repo root so that
// GitHub Pages (configured to serve the source-branch root) directly
// serves the built site. The source files live in web/.
//
// We touch only files that are owned by the build (assets/, index.html,
// 404.html, favicon.svg, .nojekyll). Other repo files (README, package.json,
// web/, scripts/, .github/, etc.) are preserved.

import { mkdir, rm, cp, readdir, copyFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const dist = join(repoRoot, 'dist')

if (!existsSync(dist)) {
  console.error('[deploy-root] dist/ not found - run vite build first')
  process.exit(1)
}

const targets = ['assets', 'index.html', '404.html', 'favicon.svg', '.nojekyll']

async function ensureFallback() {
  // GitHub Pages SPA fallback: 404.html is served for unknown paths.
  // Hash routing makes it unnecessary in normal navigation, but having it
  // protects users that mistype a path.
  const indexPath = join(dist, 'index.html')
  const fallback = join(dist, '404.html')
  if (existsSync(indexPath) && !existsSync(fallback)) {
    await copyFile(indexPath, fallback)
  }
  const nojekyll = join(dist, '.nojekyll')
  if (!existsSync(nojekyll)) {
    await writeFile(nojekyll, '')
  }
}

async function clearOldBuild() {
  const oldAssets = join(repoRoot, 'assets')
  if (existsSync(oldAssets)) {
    await rm(oldAssets, { recursive: true, force: true })
  }
  for (const f of ['index.html', '404.html', 'favicon.svg', '.nojekyll']) {
    const p = join(repoRoot, f)
    if (existsSync(p)) await rm(p, { force: true })
  }
}

async function copyBuild() {
  const entries = await readdir(dist, { withFileTypes: true })
  for (const e of entries) {
    if (!targets.includes(e.name)) continue
    const src = join(dist, e.name)
    const dest = join(repoRoot, e.name)
    if (e.isDirectory()) {
      await mkdir(dest, { recursive: true })
      await cp(src, dest, { recursive: true })
    } else {
      await copyFile(src, dest)
    }
  }
}

await ensureFallback()
await clearOldBuild()
await copyBuild()
console.log('[deploy-root] copied build to repo root - ready for GitHub Pages')
