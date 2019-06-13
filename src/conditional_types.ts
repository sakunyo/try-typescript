/**
 * Conditional types
 */

// Filter 型関数 T と U に ??? 可能な場合に T を返す <=> Diff 関数
export type Filter<T, U> = T extends U ? T : never

const a1 = 'aaa'
type A1 = Filter<typeof a1, Function> // => never. it is not a Function type

const a2 = (a = 1) => {}
type A2 = Filter<typeof a2, Function> // => (a?: number) => void

// T型とU型を比較してUがTへアサイン可能な場合にneverを返し、またそれ以外の場合にはT型を返す
export type Diff<T, U> = T extends U ? never : T

/**
 * Array types
 */

// 配列
const mi = [{ name: 'cat' }]

// 配列型の場合には foo, それ以外はT型を返す
type M1<T> = T extends any[] ? 'foo' : T

type m1a = M1<typeof mi> // => "foo"
type m1b = M1<number> // => number
