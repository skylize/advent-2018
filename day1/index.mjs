
import { add, compose, o, map } from 'ramda'

import {
  foldUntil,
  linesToArray,
  logWith,
  num,
  pointfree as pf,
  readFile,
  reiterate,
  rmStr,
  seenBefore as createSeenBefore
} from '../util'

console.log('hello')

let fold = pf( 1, 'reduce' )
let seenBefore = createSeenBefore()

/**
  * Parse data file.
  */

let freqs = readFile( 'data.txt', 'utf8' )
  .then( linesToArray )

/**
 * Part 1
 */

let normalizeNumbers = o( num, rmStr( '+' ) )

let calcLastFreq = o( fold( add ), map( normalizeNumbers ) )

freqs.then( calcLastFreq )
  .then( logWith( 'Last Frequency:') )

/**
 * Part 2
 */

let calcDupeFreq = compose(
  foldUntil( seenBefore, add, 0 ),
  reiterate,
  map( normalizeNumbers ) )

freqs.then( calcDupeFreq )
  .then( logWith( 'Duped Frequency:' ) )
