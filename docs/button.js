const div = document.currentScript.parentElement

const button = document.querySelector('button#a')

// setInterval(() => {
//   randomcolour()
// }, 100)

div.style.transition = '.5s'

button.addEventListener('click', () => {
  console.log("Button was clicked")

  test()
})

function test(t) {
  setBackground(randomcolour())
  if(t) {
    setTimeout(test, 10, t-1)
  }
}

function randomcolour(t) {
  return `hsl(${~~(Math.random()*360)}, 50%, 50%)`
}

function nope() {
  console.log("NOPE")
}

document.querySelector('button#b')
 .addEventListener('click', function () {
   test(20)
 }, false)



document.querySelector('button#c')
 .addEventListener('click', function () {
   this.innerText = Math.random().toString(32)
 }, false)


const {style} = document.createElement('span')
const isColor = (str) => {
  style.backgroundColor = '#fff'
  style.color = '#000'

  style.backgroundColor = style.color = str
  return style.backgroundColor == style.color
}



document.querySelector('#color')
  .addEventListener('keyup', (event) => {
    const value = event.target.value
    if(isColor(value)) setBackground(value)
  })


function setBackground (c) {
  div.style.background = c || randomcolour()
}
