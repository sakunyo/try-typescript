/**
 * const assertions `as const`
 *
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
 */

const a1 = "foo" // => "foo"
                  // const で文字列を代入するとリテラルタイプが設定される

let a1a = a1 // => string
             // 可変な値になった場合には string へアップキャストされる
             // 型の教科書 P31

/**
 * JS界の const とは違い as const は型定義として変更不可になる
 */
const a2 = "bar" as const
let a2b = a2 // => "bar"

const a3 = { value: a1 } // => { value: string; }

const a4 = { value: a1 } as const // { readonly value: "foo"; }


/**
 * const assertion と配列
 */
const b1 = [10, 20] // number[]
b1.push(40)

const b2 = [10, 20] as const // readonly [10, 20]

b2.push(40) // => Error
            // Property 'push' does not exist on type 'readonly [10, 20]'.

// Error! A 'const' assertion can only be applied to a to a string, number, boolean, array, or object literal.
let c1 = (Math.random() < 0.5 ? 0 : 1) as const;

// 上の様な書き方は const assertion では記述できないので次の様に分割して記述する
let c2 = Math.random() < 0.5 ?
    0 as const :
    1 as const // 0 | 1
               // 0 もしくは 1 の二つの数値が返る事が保証される


/**
 * ミュータブルな値と as const
 */
let arr = [1, 2, 3, 4];

const arr2 = {
    contents: arr,
} as const // { readonly contents: number[]; }
           // as const により readonly へ変更

arr2.contents = [] // Error
                   // contents プロパティが readonly なので 代入はできない
arr2.contents.push(5) // 代入は出来ないが push メソッドなどで object を操作をすることは可能

let arr3 = [1, 2, 3, 4] as const
const arr4 = {
    contents: arr3
} as const // { readonly contents: readonly [1, 2, 3, 4]; }

arr4.contents = [] // Error
arr4.contents.push(5) // [] as const で配列が readonly の為 push できない
