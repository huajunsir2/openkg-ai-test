# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

OpenKG (开放知识图谱) is a Vue 3 + Vite 6 single-page application — the official website for the OpenKG knowledge graph community. It is a pure frontend project with no backend, database, or external API dependencies. All content data is embedded in `src/data/site.js`.

### Branch note

The `main` branch contains only a README. The actual application code lives on feature branches (e.g. `origin/cursor/openkg-new-site-3e62`). Check out the appropriate feature branch before working on the site.

### Development commands

Standard npm scripts defined in `package.json`:

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server (port 5173, binds 0.0.0.0) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build (port 4173) |

### Caveats

- **No linter or TypeScript** configured. `npm run build` is the primary validation step.
- **No automated tests** exist in this project.
- The dev server binds to `0.0.0.0:5173` (configured in `vite.config.js`), so it is accessible from outside the container.
- Node.js 18+ is required (20 recommended). The VM environment may not have Node.js pre-installed; the update script handles this via nodesource.
