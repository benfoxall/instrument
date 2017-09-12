// This inlines everything so it's easier to plonk in a project
const fs = require('fs')

const sw = fs.readFileSync('src/sw.js')
const recast = fs.readFileSync('src/recast.js')
const view = fs.readFileSync('src/view.html')

const parts = sw.toString().split('/*SPLIT*/')

const output = `${recast};
const viewer = () => new Response(atob('${
  Buffer(view, 'binary').toString('base64')
}'), {headers: {'Content-type': 'text/html'}});
${parts[1]}`


fs.writeFile('dist/instrument.js', output, (err) => {
  if(err) throw err
  console.log('Wrote to dist/instrument.js')
})

fs.writeFile('example/instrument.js', output, (err) => {
  if(err) throw err
  console.log('Wrote to example/instrument.js')
})
