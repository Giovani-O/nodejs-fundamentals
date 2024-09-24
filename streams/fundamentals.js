// Stream é um conceito onde conseguimos consumir uma informação antes mesmo de ela estar completamente carregada
// Um exemplo é um vídeo no Youtube, onde pequenas partes do vídeo são carregadas em buffer, mas é possível assistir
// o vídeo desde o início, mesmo que ele não esteja completamente carregado.

// Há writeable e readable streams, e no node, todas as portas de entrada e saída são streams

// stdin é uma stream de entrada e stdout uma de saída
// pipe é usado para ler uma stream, no caso stdin está sendo lida
// process.stdin.pipe(process.stdout)

// Construindo uma stream do zero
import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    if (i > 100) {
      this.push(null)
    } else {
      const buffer = Buffer.from(String(i) + ' ')

      setTimeout(() => {
        this.push(buffer)
      }, 1000)
    }
  }
}

new OneToHundredStream().pipe(process.stdout)
