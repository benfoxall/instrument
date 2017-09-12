const button = document.querySelector('button#a')

// setInterval(() => {
//   randomcolour()
// }, 100)

document.body.style.transition = '.5s'

button.addEventListener('click', () => {
  console.log("Button was clicked")

  test()
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

document.querySelector('button#b')
 .addEventListener('click', function () {
   test(20)
 }, false)



document.querySelector('button#c')
 .addEventListener('click', function () {
   this.innerText = Math.random().toString(32)
 }, false)
