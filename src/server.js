// Importação com ESModules, módulos internos do node são importados com node:
import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Cria um servidor HTTP
const server = http.createServer(async (req, res) => {
  // Desestruturação de req
  const { method, url } = req

  // Middleware externo
  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  // Retorna um código HTTP
  return res.writeHead(404).end('A rota não existe')
})

// Define a porta que o servidor usará
server.listen(3333)
