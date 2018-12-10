
let { add, curry } = require('ramda')

let seenBefore = ( (cache = {}) => 
  x => cache[x] || (cache[x] = true, false)
)()

let foldUntil = curry ( 
  (stop, f, empty, xs) => {
    let ys = empty
    for (let x of xs) {
      ys = f(ys, x)
      if (stop(ys)) break }
    return ys } )

function* reiterate (iterable) {
  while (true)
    for (let x of iterable)
      yield x }

let xs = reiterate( [1, 3, 5] )
  , ys = []
  , i = 0
for (let x of xs) {
  ys.push(x)
  if (i++ > 10) break }
console.log(ys)

xs = reiterate( [1, 3, 5] )
let stop = x => x >  10000
let z = foldUntil(stop, add, 0, xs)
console.log(z)

xs = [2, 5,1, 33, 4, 22, 5, 50]
ys = xs.map( seenBefore )
console.log( ys )

