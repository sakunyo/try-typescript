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
type A1<T> = { [K in keyof T]: T[K] }
type A2<T> = A1<T>[keyof T]

type a1 = A2<A> // string | number | null

type B = { a: string; b: number; c: never; d: { child: null }; }
type B1<T> = T[keyof T] // 各key の型を返し never は Drop する
type B2<T> = { [P in keyof T]: T[P] } // 各key ごとに map する
type B3<T> = keyof T // key の配列を返す keys

type b1 = B1<B> // string | number | { child: null; }
type b2 = B2<B> // { a: string; b: number; c: never; d: { child: null; }; }
type b3 = B3<B> // "a" | "b" | "c" | "d"

type C1<K extends keyof any, T> = { [P in K]: T }
type c1 = C1<'a' | 'b' | 'c', string> // Record と同様 { a: string; b: string; c: string; }

// T, T1, T2
// R ... Return
// I ... Infer
// K ... Key
// P ... Property
// U
// S, U ... 2nd, 3rd from Java?
