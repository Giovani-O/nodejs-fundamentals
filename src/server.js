// Importação com ESModules, módulos internos do node são importados com node:
import http from 'node:http'
import { resourceLimits } from 'node:worker_threads'

const users = []

// Cria um servidor HTTP
const server = http.createServer((req, res) => {
  // Desestruturação de req
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    // Define os cabeçalhos na response
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Jane Doe',
      email: 'doe@mail.com',
    })

    return res.end('Usuário adicionado')
  }

  // Retorna um código HTTP
  return res.writeHead(404).end('A rota não existe')
})

// Define a porta que o servidor usará
server.listen(3333)
