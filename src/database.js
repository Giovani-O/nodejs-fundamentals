import fs from 'node:fs/promises'

// Cria um caminho para o arquivo, relativo a database.js
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  // # torna uma propriedade privada
  #database = {}

  // Lê um arquivo e salva em #database, e cria o arquivo caso não exista
  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    // Escreve uma string em um arquivo
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }
}
