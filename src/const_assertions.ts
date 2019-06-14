/**
 * const assertions `as const`
 * 
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
 */

const b1 = 'B1' // B1

const b2 = {
    value: b1
} // { value: string; }

const b3 = {
    value: b1
} as const // { readonly value: "B1"; }

const b4 = [10, 20] // number[]

const b5 = [10, 20] as const // readonly [10, 20]

// Error! A 'const' assertion can only be applied to a to a string, number, boolean, array, or object literal.
let a = (Math.random() < 0.5 ? 0 : 1) as const;

let b = Math.random() < 0.5 ?
    0 as const :
    1 as const;

let arr = [1, 2, 3, 4];

let foo = {
    contents: arr,
} as const // { readonly contents: number[]; }

foo.contents = [];  // error!
foo.contents.push(5); // 代入は出来ないが push メソッドなどで object を操作をすることは可能
