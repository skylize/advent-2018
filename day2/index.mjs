
import {
  apply,
  compose, o,
  concat,
  curry,
  filter,
  head,
  identity,
  includes,
  map,
  multiply,
  split,
  trim
} from 'ramda'

import {
  branch,
  contains,
  countEachChars,
  countProps,
  isStr,
  linesToArray,
  pairs,
  readFile,
  rmCharAt
} from '../util'

// -- diffIndexes - Compare 2 lists or Strings, returning
    // list of indexes where different.
// diffIndexes :: [a] | String -> [Number]
let diffIndexes = curry(
  ( a, b ) => {
    if ( isStr( a ) )
      var [ a, b ] = map( split( '' ), [ a, b ] )
    let diff = ( [headA, ...tailA ], [ headB, ...tailB ], i ) =>
      concat (
        headA !== headB ? [ i ] : [],
        tailA.length || tailB.length
          ? diff( tailA, tailB, i + 1 )
          : [] )
    return diff( a, b, 0 ) } )

// headLengthEq1 :: [[a]] -> Boolean
let headLengthEq1 = ([ xs ]) => xs.length === 1

// checksum :: String -> Number
let checksum = compose(
  apply( multiply ),
  map( countProps ),
  branch(
    filter( contains( 2 ) ),
    filter( contains( 3 ) ) ),
  map( countEachChars ) )

// findSameWhereOnly1Diff = [String] -> String -> [[String, String]]
let findSharedWhereOnly1Diff = compose(
  apply( rmCharAt ),
  map( head ), // -> [ indexToRemove, firstSring ]
  head, // only 1 pair left after filter
  filter( headLengthEq1 ),
  map( branch( apply( diffIndexes ), identity ) ),
  pairs
)

let { log } = console

let ids = readFile( 'data.txt', 'utf8' )
  .then( linesToArray )

ids.then( checksum )
  .then( log, log )

ids.then( findSharedWhereOnly1Diff )
  .then( log, log )
