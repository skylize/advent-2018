
import { promisify } from 'util'
import { readFile as fsReadFile } from 'fs'

import {
  compose, o,
  concat,
  curry,
  equals,
  filter,
  flip,
  keys,
  length,
  map,
  merge,
  reduce,
  replace,
  split,
  tap,
  trim
} from 'ramda'


// type Key = String
// type Nil = Null | Undefined
// type Dict a = {Key: a, ... Key a}

// -- Apply to 2 Functions, returning Pair of results.
// branch :: (a -> b) -> (a -> c) -> [b, c]
export let branch = curry(
  ( f, g, x ) => [ f( x ), g( x ) ]
)

// countProps :: Object -> Number
export let countProps = o( length, keys )

// contains :: ([a] | Dict a) -> Boolean
export let contains = curry( ( x, ys ) =>
  !! o( countProps, filter( equals( x ) ) ) ( ys ) )

// incProp :: Key -> Dict Number -> Dict Number
export let incProp = curry( ( k, xs ) =>
  merge( xs, { [k]: orZero( xs[k] ) + 1  } ) )

// countEachChars :: String -> Dict Number
export let countEachChars = reduce( flip( incProp ), {} )

// -- foldUntil - Reduce (potentially infinitely) until result
    // matches predicate or iterable runs out of values.
// foldUntil :: ( )
export let foldUntil = curry (
  ( stop, f, empty, xs ) => {
    let ys = empty
    for ( let x of xs ) {
      ys = f( ys, x )
      if ( stop( ys ) ) break }
    return ys } )

// incProp ^^

// isStr :: * --> Boolean
export let isStr = x => typeof x === 'string'

// -- linesToArray - Convert String with linefeed-separated
    // data to an Array.
// linesToArray :: String -> [String]
export let linesToArray = o( split( '\n' ), trim )

// logWith :: String -> a -> a
export let logWith = s => tap( x => console.log(s, x) )

// -- num - Cast any value using JS implicit casting
// num :: * -> Number
export let num = x => +x

// orZero :: Number | Nil -> Number
export let orZero = n => n == null ? 0 : n

// pair :: a -> b -> [a, b]
export let pair = curry( ( a, b ) => [ a, b ] )

// -- pairs - All unique pairs from list (*excluding* order)
// pairs :: [a] -> [[a, a]]
export let pairs = ([ head, ...tail ]) => concat(
  map( pair( head ), tail ),
  tail.length ? pairs( tail ) : [] )

// -- pointfree - Create standalone function that calls
    // named method of provided object.
// pointfree :: Number → String → (a → b → … → n → Object → *)
export { invoker as pointfree } from 'ramda'

export let readFile = promisify( fsReadFile )

// -- reiterate - Loop infinitely over a finite iterable.
// reiterate :: Iterable -> Iterable
export function * reiterate ( iterable ) {
  while ( true )
    for ( let x of iterable )
      yield x }

// rmCharAt :: Number -> String -> String
export let rmCharAt = curry( (i, s) =>
  s.slice( 0, i ) + s.slice( i + 1 ) )

// -- rmStr - Return 2nd string with 1st removed.
// rmStr :: String -> String -> String
export let rmStr = flip( replace )( '' )

// -- seenBefore - Cache all inputs, returning bool whether
    // value was previously cached.
// seenBefore :: (Dict String)? -> ( String -> Boolean )
export let seenBefore = ( cache = {} ) =>
  x => cache[x] || ( cache[x] = true, false )
