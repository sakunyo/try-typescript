/**
 * Practice
 */

/**
 * ジェネリクスで頻出する Type Parameters
 */
// T, T1, T2
// R ... Return
// I ... Infer
// K ... Key
// P ... Property
// U ... ?
// S, U ... 2nd, 3rd from Java?

const o = {
  a: 'aaa',
  b: 42,
  c: (b = 1) => {},
  d: (a: string) => 4
}

// オブジェクトの key を Union type で抽出する
type p = keyof typeof o // => "a" | "b" | "c" | "d"

// T と U がマッチした場合にプロパティ型を返す
type Filter<T, U> = T extends U ? T : never

type Values<T, F> =
  { [K in keyof T]: Filter<T[K], F> }
  // { ... } は処理ブロックではなくオブジェクト

type p2 = Values<typeof o, Function> // => { a: never;
                                     //      b: never;
                                     //      c: (b?: number) => void;
                                     //      d: (a: string) => number; }
                                     // F (Function) にマッチしない場合は never

// オブジェクトから関数のプロパティ名を抜き出す
type Keys<T, F> =
  { [K in keyof T]: T[K] extends Filter<T[K], F> ? K : never }[keyof T]
  // => never を除外する場合は ...[keyof T] を最後に追加する

 // 特定の型にマッチする型のプロパティ名を抽出する
type p3 = Keys<typeof o, Function> // => "c" | "d"
type p3b = Keys<typeof o, string> // => "a"

type p4 = Pick<typeof o, Exclude<keyof typeof o, p3>> // => { a: string; b: number; }
                                                      // 関数以外を抜き出す

type p5 = Pick<typeof o, p3> // => { c: (b?: number) => void; d: (a: string) => number; }
                             // 関数のみを抜き出す
