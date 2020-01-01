# 👩‍🔬 EcmaScript Laboratory
<em>Experiments in JavaScript</em>

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
function mccallSort (arr, i=0) {
	const [ia, ib] = [i%arr.length, (i+1)%arr.length];
	ia < ib && arr[ib] < arr[ia] ? [arr[ia], arr[ib]] = [arr[ib], arr[ia]] : null;
	return i > arr.length**2 ? arr : mccallSort(arr, i+1)
}
```

### Only Unique
Given a string, returns only unique characters in their specified order.
```javascript
function onlyUnique(sample) {
  return [...new Set([...sample])].join('')
}
```
