'use strict'

import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    if (i > 10) {
      this.push(null)
    } else {
      const buffer = Buffer.from(String(i) + ' ')

      setTimeout(() => {
        this.push(buffer)
      }, 1000)
    }
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half',
})
  .then((response) => {
    return response.text()
  })
  .then((data) => {
    console.log('Data: ', data)
  })
