import { Filter } from './conditional_types'

/**
 * Map
 */

const o = {
  a: 'aaa',
  b: (b = 1) => {}
} //?

type FilterMap<T, F> = {
  [K in keyof T]: Filter<T[K], F>
}

type FM = FilterMap<typeof o, Function>
// type FM = { a: never; b: (b?: number) => void; }
type FMKeys = keyof FM // 'a' | 'b' types

type A = { a: never; b: string, c: null, d: number }
type AMap<T> = { [K in keyof T]: T[K] }
type AA<T> = AMap<T>[keyof T]
type AAa = AA<A> // string | number | null

type B<T> = T[keyof T]
// TODO type B1 = B<string | number | never | { child: null }>
