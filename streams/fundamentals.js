// Stream é um conceito onde conseguimos consumir uma informação antes mesmo de ela estar completamente carregada
// Um exemplo é um vídeo no Youtube, onde pequenas partes do vídeo são carregadas em buffer, mas é possível assistir
// o vídeo desde o início, mesmo que ele não esteja completamente carregado.

// Há writeable e readable streams, e no node, todas as portas de entrada e saída são streams

// stdin é uma stream de entrada e stdout uma de saída
// pipe é usado para ler uma stream, no caso stdin está sendo lida
// process.stdin.pipe(process.stdout)

// Todo retorno de uma stream precisa ser um buffer, ver exemplos abaixo

// Construindo uma stream do zero
import { Readable, Writable, Transform } from 'node:stream'

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

// Stream de transformação, transforma um dado em outro
class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    // O primeiro parametro é um erro, caso ocorra um
    callback(null, Buffer.from(String(transformed)))
  }
}

// Stream de escrita sempre irá processar um dado, mas nunca transformar um dado em outra coisa ou retornar algo
class MultiplyByTenStream extends Writable {
  // chunk é o dado enviado através do push da strea de leitura
  // encoding é como esse dado está codificado
  // callback é uma função que a stream de escrita chama após terminar de processar a operação
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream() // Leitura
  .pipe(new InvertNumberStream()) // Transformação
  .pipe(new MultiplyByTenStream()) // Escrita
