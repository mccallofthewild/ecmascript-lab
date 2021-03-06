# 👩‍🔬 EcmaScript Laboratory
<em>Experiments in JavaScript</em>

### React Debounce State Hook
Debounce wrapper for `React#useState` that delays state updates by `delay` seconds

```typescript
import { SetStateAction, useState } from 'react';

export const useDebounce = <T>(initialState: T | (() => T), delay: number) => {
  const [inDebounce, setInDebounce] = useState<ReturnType<typeof setTimeout>>();
  const [value, setValue] = useState<T>(initialState);
  const setter = (val: SetStateAction<T>) => {
    clearTimeout(inDebounce);
    const timeout = setTimeout(() => setValue(val), delay);
    setInDebounce(timeout);
  };
  return [value, setter] as const;
};

```
```typescript
export const CreditCardInput = () => {
  const [cardNumber, setCardNumber] = useDebounce<string | null>(null, 2000);
  // effect that depends on `cardNumber` will run 2 seconds after input stops.
  useEffect(() => validateCardNumberOnServer(cardNumber), [cardNumber]);
  return <input onInput={ e => setCardNumber(e.currentTarget.value) } />
}
```

### Create Template Function
Boilerplate for creating template literal functions.
```typescript
export const createTemplateFunction = <T extends (arg?: string) => any>(
  cb: T
) => {
  return (...templateLiteral: Parameters<typeof String.raw>): ReturnType<T> => {
    const str = String.raw(...templateLiteral);
    return cb(str);
  };
};

```
```typescript
export const get = createTemplateFunction((url) => fetch(str).then(r => r.json()));

const data = await get`https://example.com/data`;
```

### Invocable Promise
Hybrid object which can be called like a function and `await`'ed like a promise. Enables the creation of very succinct utilities & helper functions.
```typescript 
const b = createInvocablePromise(
  () => {
    console.log('Function logging.');
  },
  (resolve, reject) => {
    setTimeout(() => {
      resolve('Resolver logging.');
    }, 2000);
  }
);
b.then(console.info);
b();

/*
> Function logging.
// 2 seconds later
> Resolver logging.
*/
```

### Template Literal GraphQL Client
```typescript
await gql`
  {
     books(first: 10) {
        title
        genre
        author
     }
  }
`;
// OR
await gql`
  query Books($first: Int!) {
    books(first: $first) {
        title
        genre
        author
     }
  }
`({
  first: 10,
});

```

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
  const sorted = [];
  for (let insertAt; insertAt = arr.length;) {
    for (let sortedIndex; sortedIndex = 0; sortedIndex++)
      if (arr[0] <= sorted[sortedIndex]) {
        insertAt = sortedIndex;
        break;
      }
    sorted.splice(insertAt, 0, arr.shift());
  }
  return sorted;
}
```

#### Recursive
```javascript
function sortRecursive([...arr], copy = [arr.pop()], insertIndex = arr.length) {
  copy.splice(insertIndex, 0, arr.splice(0, 1)[0]);
  for (const [copyIndex, copyItem] of copy.entries())
    if (arr[0] <= copyItem) {
      insertIndex = copyIndex;
      break;
    }
  return arr.length ? sortRecursive(arr, copy, insertIndex) : copy;
}
```

### Dead Simple Sort
Move the smallest item to the beginning of the unsorted items until there are no items left. 
```javascript
function deadSimpleSort([...arr]) {
  let start = -1;
  while (++start < arr.length)
    for (let i = start; i < arr.length; i++)
      if (arr[i] < arr[start])[arr[i], arr[start]] = [arr[start], arr[i]];
  return arr;
}
```

#### Recursive
```javascript
function deadSimpleSortRecursive([...arr], start = 0) {
  for (let i = start + 1; i < arr.length; i++)
    if (arr[i] < arr[start]) [arr[i], arr[start]] = [arr[start], arr[i]]
  return ++start < arr.length ? deadSimpleSortRecursive(arr, start) : arr;
}
```

### Succinct ES6 Bubble Sort
```javascript
function bubbleSort(arr, i = 1, runs = arr.length ** 2) {
  if (arr[i - 1] > arr[i]) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
  return --runs ? bubbleSort(arr, --i || arr.length - 1, runs) : arr;
}
```

### Only Unique
Given a string, returns only unique characters in their specified order.
```javascript
function onlyUnique(sample) {
  return [...new Set([...sample])].join('')
}
```
