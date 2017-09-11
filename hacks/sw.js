importScripts('recast.js')

console.log("in service worker")

addEventListener('fetch', event => {

  if (event.request.method != 'GET') return;

  console.log("fetch", event)

  const request = event.request

  // todo - maybe use headers
  if(request.url.match(/\.js$/)) {

    const wrapName = '_' + Math.random().toString(32).split('.')[1]

    event.respondWith(async function() {

      const resp = await fetch(event.request)
      const code = await resp.text()

      const b = recast.types.builders
      const ast = recast.parse(code)

      let count = 1
      recast.types.visit(ast, {

        visitFunction: function(path) {
          const node = path.node

          const track = b.expressionStatement(b.callExpression(
            b.identifier(wrapName),
            [b.numericLiteral(count++)]
          ))

          path.get("body", "body").unshift(track)

          this.traverse(path)
        }
      })

      const output = recast.print(ast).code

      return new Response(
        `console.log('${wrapName}: ${count}fns ${event.request.url}')

        const ${wrapName} = (() => {

          let calls
          const report = () => {
            console.log("REPORT ${wrapName}", calls.slice(0))
            calls = null
          }

          return function(id) {
            if(!calls) {calls = []; setTimeout(report, 0)}
            calls.push(id)
          }

        })()

        ${output}
        `
      )

    }());


  }



})
