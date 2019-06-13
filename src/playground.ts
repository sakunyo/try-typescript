
const n = 5

// type Routine<N, T extends string[]> = T['length'] extends N ? T : Routine<>
// type FizzBuzz<N extends number> = Routine<N, string[]>

type A<N, T extends string[]> = T['length'] extends N ? 'true' : 'false'

type a1 = A<1, string[]>
type a2 = A<0, string[]>

const B1 = 'B1'
const B2 = {
    value: 'B2'
} as const
