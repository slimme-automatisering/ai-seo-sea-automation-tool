import express from 'express'
import next from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()

  // Proxy API requests to backend
  server.use(
    '/api',
    createProxyMiddleware({
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  )

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
