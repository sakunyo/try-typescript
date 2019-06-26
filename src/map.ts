/**
 * Map
 */

type a = { a: never; b: string, c: null, d: number; }

type A1<T> = { [K in keyof T]: T[K] }

type a1 = A1<a> // { a: never; b: string; c: null; d: number; }
                // 同じ型情報を返す基本的なMap関数


type A2<T> = A1<T>[keyof T]

type a2 = A2<a> // string | number | null の Union 型を返す
                // foo[keyof T] で never 型はdropされる


type A3<T> = keyof T // key の配列を返す keys

type a3 = A3<a> // "a" | "b" | "c" | "d"


// "keyof typeof <JavaScriptObjectへの参照>" の様にも書ける
const obj = { a: 1, b: 2, c: 3 }

type a4 = keyof typeof obj


// <T extends keyof any> は Pick や Omit などような Union type を型引数として受け取る
type A5<T extends keyof any> = { [P in T]: P }

type a5 = A5<'a' | 'b' | 'c'>


type A6<T, K extends keyof T> = { [P in K]: P } // => 第二引数に制約をあたえる

type a6a = A6<typeof obj, 'a' | 'c'>
type a6b = A6<typeof obj, 'd'> // => obj にプロパティ d は存在しないため Error


type A7<T> = {
    readonly [P in Exclude<keyof T, 'a' | 'c'>]: T[P] // [P in ...] に Key を返す関数を記述する
}

type a7a = A7<typeof obj> // => { readonly b: number; }
