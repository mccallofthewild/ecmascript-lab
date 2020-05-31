# 👩‍🔬 EcmaScript Laboratory
<em>Experiments in JavaScript</em>

### Node.js Encryption/Decryption
```typescript
import { Encrypt } from './Encrypt';

const data = 'top secret data information';
const password = 'password123';
const encrypted = Encrypt.encryptText(data, password);
const decrypted = Encrypt.decryptText(encrypted, password);
```

### Succinct Fizzbuzz
```javascript
for(let i = 100; i--;) console.log(`${i%3 ? '' : 'fizz'}${i%5 ? '' : 'buzz'}` || i)
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

### Simple Sort
Remove one item at a time and place it before the first item it is less than or equal to in the new array.
```javascript 
function sort([...arr]) {
  const copy = [arr.pop()];
  while (arr.length) {
    let insertIndex = arr.length;
    for (const [copyIndex, copyItem] of copy.entries()) {
      if (arr[0] <= copyItem) {
        insertIndex = copyIndex;
        break;
      }
    }
    copy.splice(insertIndex, 0, arr.splice(0, 1)[0]);
  }
  return copy;
}
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
