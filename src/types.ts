const a = {
  A: 'aaa',
  B: (a = 1) => {}
}

// Filter 型関数 T と U に ??? 可能な場合に T を返す <=> Diff 関数
type Filter<T, U> = T extends U ? T : never

type X = Filter<typeof a.B, Function> // => (a?: number) => void
type Y = Filter<typeof a.A, Function> // => never

// T型とU型を比較してUがTへアサイン可能な場合にneverを返し、またそれ以外の場合にはT型を返す
type Diff<T, U> = T extends U ? never : T

type FilterMap<T, F> = {
  [K in keyof T]: Filter<T[K], F>
}

type Z = FilterMap<typeof a, Function>
type X1 = keyof Z // ???

type A = { a: never; b: string }
type AA<T> = { [K in keyof T]: T[K] }[keyof T]
type AAa = AA<A>
const z = { a: undefined, b: "hoge", c: undefined, d: null }
type AAb = AA<typeof z>

/**
 * infer type
 */

// 関数 f と 型
const f = (a: string) => ({ b: 'B property' })

// 引数T Function型の戻り値の型を返す
type F2<T> = T extends (...args: any) => infer I ? I : never

type f2 = F2<typeof f> // => F3 => { b: string }

/**
 * Array types
 */

// 配列
const mi = [{ name: 'cat' }]

// 配列型の場合には foo, それ以外はT型を返す
type M1<T> = T extends any[] ? 'foo' : T

type m1a = M1<typeof mi> // => "foo"
type m1b = M1<number> // => nunber