/**
 * Inference
 *
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-inference-in-conditional-types
 */

// 関数 f と 型
const f = (a: string, b: { b2: number }, c: number = 42) => ({ d: 'value' })

// 引数T Function型の戻り値の型を返す
type F2<T> = T extends (...args: any) => infer R ? R : never

type f2 = F2<typeof f> // => { d: string }

// 引数の型を抽出する
type FirstArg<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type SecondArg<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never

type arg1 = FirstArg<typeof f> // => string
type arg2 = SecondArg<typeof f> // => { b2: number }

// ...args: infer I で全ての引数を配列として返す
type Args<T> = T extends (...args: infer I) => any ? I : never

// tuple っぽい
type args = Args<typeof f> // [string, { b2: number; }, (number | undefined)?]
