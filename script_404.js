var commands = [
  {
    'name':  "bird",
    'desc':  "Shows a random image of a bird.",
    'html':  "<img src='https://i.some-random-api.ml/1stP458w9J.png'>",
    'credit':"Courtesy to <a href='https://some-random-api.ml'>Some Random API</a> for providing images."
  },
  {
    'name':  "dish",
    'desc':  "Shows a random image of a dish.",
    'html':  "<img src='https://foodish-api.herokuapp.com/images/dessert/dessert36.jpg'>",
    'credit':"Courtesy to <a href='https://foodish-api.herokuapp.com/api/'>Foodish API</a> for providing images."
  },
  {
    'name':  "quantum_random",
    'params':"{Type: 256 or 65536} {No. of numbers}",
    'desc':  "Generates a random number by observing quantum fluctuations.",
    'credit':"Courtesy to <a href='https://qrng.anu.edu.au/'>ANU Quantum Random Number Generator</a> for providing numbers."
  },
  {
    'name':  "compress",
    'params':"{Text}",
    'desc':  "Compresses a piece of text by Huffman encoding. You will receive a key and a TXT file; to decompress it, upload the TXT file and use =decompress {key}.",
  }
]

var command = commands[random_(0, commands.length - 1)]
document.getElementById("C1").innerText = `=${command['name']}`
if (command['params']) {
  document.getElementById("C1").insertAdjacentHTML('beforeend', `<span class='code' style='font-size: 2.5vw;'>${command['params']}</span>`)
}
document.getElementById("C2").innerText = `${command['desc']}`
if (command['html']) {
  document.getElementById("C2").insertAdjacentHTML('afterend', command['html'])
}
if (command['credit']) {
  document.getElementById("C2").insertAdjacentHTML('afterend', `<p class='smallest'>${command['credit']}</p>`)
}