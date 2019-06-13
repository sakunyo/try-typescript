/**
 * infer type
 */

// 関数 f と 型
const f = (a: string) => ({ b: 'B property' })

// 引数T Function型の戻り値の型を返す
type F2<T> = T extends (...args: any) => infer I ? I : never

type f2 = F2<typeof f> // => F3 => { b: string }
