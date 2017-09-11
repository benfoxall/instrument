const button = document.querySelector('button')


button.addEventListener('click', () => {
  console.log("Button was clicked")

  test()
})

function test() {
  document.body.style.background = `hsl(${~~(Math.random()*360)}, 50%, 50%)`
}

function nope() {
  console.log("NOPE")
}
