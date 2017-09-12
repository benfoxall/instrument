importScripts('recast.js')


// only intercept requests when there's an active page
let active = setTimeout(() => {
  active = null
}, 1000)

// listen for pings from frontend to keep rewriting alive
const meta = new BroadcastChannel('fns-meta')
meta.onmessage = function (ev) {
    if(ev.data === 'ping') {
      clearTimeout(active)
      active = setTimeout(() => {
        active = null
      }, 5000)
    }
  }


addEventListener('fetch', event => {
  if(active === null) return

  if (event.request.method != 'GET') return;

  const request = event.request

  // todo - maybe use headers
  if(request.url.match(/\.js$/)) {

    const wrapName = '_' + Math.random().toString(32).split('.')[1]

    event.respondWith(async function() {

      event.request.mode = 'cors'

      const resp = await fetch(event.request)

      // console.log("RESPONSE", resp.)

      if(resp.type == 'opaque') {
        console.log(`unable to rewrite ${event.request.url} (opaque)`)
        return resp
      }

      const code = await resp.text()

      meta.postMessage(JSON.stringify({
        log: `rewriting ${event.request.url}`
      }))

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

      meta.postMessage(JSON.stringify({
        log: `served ${event.request.url}`
      }))

      return new Response(
        `console.log('${wrapName}: ${count}fns ${event.request.url}')

        const ${wrapName} = (() => {

          const channel = new BroadcastChannel('fns')
          channel.postMessage({
            url: '${event.request.url}',
            max: ${count}
          })

          let calls
          const report = () => {
            // console.log("POSTING ${wrapName}", calls.slice(0))
            channel.postMessage({
              url: '${event.request.url}',
              max: ${count},
              calls: calls
            })
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
