import { Filter } from './conditional_types'

/** Mapped types */
const o = {
  a: 'aaa',
  b: (b = 1) => {}
} //?

type Z = keyof typeof o

type FilterMap<T, F> =
  { [K in keyof T]: Filter<T[K], F> }
  // { ... } は処理ブロックではなくオブジェクト型

type FM = FilterMap<typeof o, Function> // { a: never; b: (b?: number) => void; }
type fm = keyof FM // 'a' | 'b' が返る never だった a も存在する

/**
 * 単純な型情報Mapする
 */
type A = { a: never; b: string, c: null, d: number; }

// 単純なMap
type A1<T> = { [K in keyof T]: T[K] }
type a1 = A1<A> // { a: never; b: string; c: null; d: number; }
                // 同じ型情報を返すので特にやくに立たない型関数


type A2<T> = A1<T>[keyof T]
type a2 = A2<A> // string | number | null の Union 型を返す
                // foo[keyof T] で never 型はdropされる

type a2b = A2<{ a: string; b: unknown; }>
           // unknown だけが返る

type B = { a: string; b: number; c: never; d: { child: null }; }

type B1<T> = T[keyof T] // 各key の型を返し never は Drop する
type b1 = B1<B> // string | number | { child: null; }

type B2<T> = { [P in keyof T]: T[P] } // 各key ごとに map する
type b2 = B2<B> // { a: string; b: number; c: never; d: { child: null; }; }

type B3<T> = keyof T // key の配列を返す keys
type b3 = B3<B> // "a" | "b" | "c" | "d"

// 略してこの様にも書ける
const obj = { a: 1, b: 2, c: 3 }
type b3b = keyof typeof obj

// <T extends keyof any> は Pick や Omit などような Union type を型引数として受け取る
type C1<T extends keyof any> = { [P in T]: P }
type c1 = C1<'a' | 'b' | 'c'>


// T, T1, T2
// R ... Return
// I ... Infer
// K ... Key
// P ... Property
// U ... ?
// S, U ... 2nd, 3rd from Java?
