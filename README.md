# 👩‍🔬 EcmaScript Laboratory
<em>Experiments in JavaScript</em>

### Succinct Fizzbuzz
```javascript
[...Array(100)].map((v, i) => console.log(`${i%3 ? '' : 'fizz'}${i%5 ? '' : 'buzz'}` || i))
```

### [FLIP Transitions](https://aerotwist.com/blog/flip-your-animations/)
A continuity illusion for UI elements
```javascript
import { FLIP } from './FlipTransition.ts'
// Identical Elements in Different Locations
const fromEl = document.querySelector('.exiting-section button.continue-btn');
const toEl = document.querySelector('.entering-section button.continue-btn');
// Hides `toEl`, scales & moves `fromEl` to be exactly on top of `toEl`, then unhides `toEl` and hides `fromEl`
await FLIP(fromEL, toEl);
// Exit the transitioned container element
document.querySelector('.exiting-section').remove()
```

### Easy Sort
An item's position in a sorted list is determined by how many items it is greater than.
```javascript
const mccallSort = arr => {
  const copy = [...arr];
  for (const [aI, a] of copy.entries()) {
    let pos = 0;
    for(const [bI, b] of copy.entries()) pos += (b < a) || (b == a && bI < aI)
    arr[pos] = a;
  }
  return arr;
}

// recursive
const mccallSort = (src, i = 0, copy = [...src], a = src[i]) => copy.splice(
  src.filter((b,bI) => (b < a || (a == b && bI < i))).length, 1, a) 
  && src.length == i+1 ? copy : mccallSort(src, i+1, copy)
```
### Succinct ES6 Bubble Sort
```javascript
function bubbleSort (arr, i=0) {
  const [ia, ib] = [i%arr.length, (i+1)%arr.length];
  if(ia < ib && arr[ib] < arr[ia]) [arr[ia], arr[ib]] = [arr[ib], arr[ia]];
  return i > arr.length**2 ? arr : bubbleSort(arr, i+1)
}
```

### Only Unique
Given a string, returns only unique characters in their specified order.
```javascript
function onlyUnique(sample) {
  return [...new Set([...sample])].join('')
}
```
