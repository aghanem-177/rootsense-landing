import { existsSync } from 'node:fs'
import { appendFile, writeFile } from 'node:fs/promises'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Local stand-in for api/waitlist.js and the Google Sheet: while previewing, sign-ups are
// saved to waitlist-dev.csv with the same columns, in the same order, as the real sheet.
const DEV_FILE = 'waitlist-dev.csv'
const COLUMNS = ['Date and time', 'Name', 'Email', 'Model', 'Colour', 'Lock or button', 'Add-ons selected', 'Price shown (EGP)', 'Test row']
const csvCell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`

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
              const email = String(data.email ?? '').trim().toLowerCase()
              const row = [
                new Date().toLocaleString('sv-SE', { timeZone: 'Africa/Cairo' }),
                String(data.name ?? '').trim(),
                email,
                data.model,
                data.colour || '—',
                data.closing || '—',
                data.addOns || 'None offered',
                data.price,
                email.endsWith('@example.com') ? 'TEST' : '',
              ]
              if (!existsSync(DEV_FILE)) await writeFile(DEV_FILE, COLUMNS.map(csvCell).join(',') + '\n')
              await appendFile(DEV_FILE, row.map(csvCell).join(',') + '\n')
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
