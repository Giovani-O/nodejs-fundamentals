export async function json(req, res) {
  const buffers = []

  // Usando for await, é possível percorrer cada pedaço dentro de req e os adicionar a buffer
  // Await também garante que req será lido completamente antes de fazer qualquer outra coisa
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  res.setHeader('Content-Type', 'application/json')
}
