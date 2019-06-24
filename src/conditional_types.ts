/**
 * Conditional types
 */

// Filter 型関数 T と U に ??? 可能な場合に T を返す <=> Diff 関数
type Filter<T, U> = T extends U ? T : never

const a1 = 'aaa'
type A1 = Filter<typeof a1, Function> // => never. it is not a Function type

const a2 = (a = 1) => {}
type A2 = Filter<typeof a2, Function> // => (a?: number) => void

type a3a = { price: number; name: "foo" }
type a3b = { price: number }
type A3a = Filter<a3a, a3b> // => { price: number; name: "foo"; }
                           // a3 は a3a に互換性がある
type A3b = Filter<a3a, { price: number; amount: number }> // => never
                           // a3 には amount プロパティが存在しないため never が返る


// Filter の逆動作
// T型とU型を比較してUがTへアサイン可能な場合にneverを返し、またそれ以外の場合にはT型を返す
export type Diff<T, U> = T extends U ? never : T

/**
 * 配列で比較を行う
 */
const arr = [{ name: 'cat' }] // { name: string; }[]

// 配列の場合には foo, それ以外は bar を返す
// T extends any[] で配列かどうかを比較
type M1<T> = T extends any[] ? 'foo' : 'bar'

type m1a = M1<typeof arr> // => "foo"
type m1c = M1<number> // => "bar"
