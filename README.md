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
```
