const button = document.querySelector('button')

// setInterval(() => {
//   randomcolour()
// }, 100)

document.body.style.transition = '.5s'

button.addEventListener('click', () => {
  console.log("Button was clicked")

  test()

  if(Math.random()> 0.6) {
    setTimeout(test, 10, 20)
  }
})

function test(t) {
  document.body.style.background = randomcolour()
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
