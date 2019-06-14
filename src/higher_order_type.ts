/**
 * TypeScript 3.4+
 * Higher order type inference from generic functions
 * 
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#higher-order-type-inference-from-generic-functions
 * @param f 
 * @param g 
 */
function compose<A, B, C>(
  f: (arg: A) => B,
  g: (arg: B) => C
): (arg: A) => C {
  return x => g(f(x));
}

/**
 * 3.4 以前のバージョンでは 引数が {} として推論されていたが、Generic function を返すようになった
 * 
 * (arg: {}) => Box<{}[]>
 *                       =>
 *                         <T>(arg: T) => Box<T[]>
 */
