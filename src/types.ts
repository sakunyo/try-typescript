/**
 * Mapped types
 */

const o = {
  a: 'aaa',
  b: 42,
  c: (b = 1) => {},
  d: (a: string) => 4
}

// オブジェクトの key を Union type で抽出する
type Z = keyof typeof o

type Filter<T, U> = T extends U ? T : never

type FilterMap<T, F> =
  { [K in keyof T]: Filter<T[K], F> }
  // { ... } は処理ブロックではなくオブジェクト

type fm1 = FilterMap<typeof o, Function> // => { a: never;
                                         //      b: never;
                                         //      c: (b?: number) => void;
                                         //      d: (a: string) => number; }
                                         // F (Function) にマッチしない場合は never

type fm2 = keyof fm1 // オブジェクトの key を抽出し 'a' | 'b' | 'c' | 'd' が返る


/**
 * 単純な型情報Mapする
 */

type a = { a: never; b: string, c: null, d: number; }

// 単純なMap
type A1<T> = { [K in keyof T]: T[K] }
type a1 = A1<a> // { a: never; b: string; c: null; d: number; }
                // 同じ型情報を返す基本的なMap関数


type A2<T> = A1<T>[keyof T]
type a2 = A2<a> // string | number | null の Union 型を返す
                // foo[keyof T] で never 型はdropされる

type a2b = A2<{ a: string; b: unknown; }> // unknown だけが返る

type A3<T> = keyof T // key の配列を返す keys
type a3 = A3<a> // "a" | "b" | "c" | "d"

// 略して "keyof typeof JavaScriptObjectへの参照" の様にも書ける
const obj = { a: 1, b: 2, c: 3 }
type b3b = keyof typeof obj

// <T extends keyof any> は Pick や Omit などような Union type を型引数として受け取る
type C1<T extends keyof any> = { [P in T]: P }
type c1 = C1<'a' | 'b' | 'c'>


/**
 * Type Parameters
 */

// T, T1, T2
// R ... Return
// I ... Infer
// K ... Key
// P ... Property
// U ... ?
// S, U ... 2nd, 3rd from Java?
