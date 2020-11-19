import './array.js'
import { cartesian } from './array.js'
console.log([1, 2, 3].remove(1))
console.log([1, 2, 3].remove(2))
console.log([1, 2, 3].remove(3))
console.log([1, 2, 3].remove(4))

console.log(cartesian([1,2],[1,2,3,4],[1,2,3]))
console.log(cartesian([1,2],[1,2,3,4],[]))