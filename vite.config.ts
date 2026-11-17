import { appendFile } from 'node:fs/promises'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Local stand-in for api/waitlist.js: saves sign-ups to waitlist-dev.jsonl while previewing.
function devWaitlist(): Plugin {
  return {
    name: 'dev-waitlist',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/waitlist', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ ok: false }))
          return
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', async () => {
          try {
            const data = JSON.parse(body)
            if (!data.website) {
              const { website: _honeypot, ...entry } = data
              void _honeypot
              await appendFile('waitlist-dev.jsonl', JSON.stringify({ submittedAt: new Date().toISOString(), ...entry }) + '\n')
            }
            res.end(JSON.stringify({ ok: true }))
          } catch {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devWaitlist()],
})
