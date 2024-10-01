// Importação com ESModules, módulos internos do node são importados com node:
import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

// Cria um servidor HTTP
const server = http.createServer(async (req, res) => {
  // Desestruturação de req
  const { method, url } = req

  // Middleware externo
  await json(req, res)

  if (method === 'GET' && url === '/users') {
    // Define os cabeçalhos na response
    return res.end(JSON.stringify(database.select('users')))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name: name,
      email: email,
    }

    database.insert('users', user)

    return res.writeHead(201).end('Usuário adicionado')
  }

  // Retorna um código HTTP
  return res.writeHead(404).end('A rota não existe')
})

// Define a porta que o servidor usará
server.listen(3333)
