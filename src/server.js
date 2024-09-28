// Importação com ESModules, módulos internos do node são importados com node:
import http from 'node:http'
import { resourceLimits } from 'node:worker_threads'
import { json } from './middlewares/json.js'

const users = []

// Cria um servidor HTTP
const server = http.createServer(async (req, res) => {
  // Desestruturação de req
  const { method, url } = req

  // Middleware externo
  await json(req, res)

  if (method === 'GET' && url === '/users') {
    // Define os cabeçalhos na response
    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name: name,
      email: email,
    })

    return res.writeHead(201).end('Usuário adicionado')
  }

  // Retorna um código HTTP
  return res.writeHead(404).end('A rota não existe')
})

// Define a porta que o servidor usará
server.listen(3333)
