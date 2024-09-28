'use strict'

import http from 'node:http'
import { Transform } from 'node:stream'

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

// req = readable stream
// res = writable stream
const server = http.createServer(async (req, res) => {
  const buffers = []

  // Usando for await, é possível percorrer cada pedaço dentro de req e os adicionar a buffer
  // Await também garante que req será lido completamente antes de fazer qualquer outra coisa
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent)

  return res.end(fullStreamContent)
})

server.listen(3334)
