# 👩‍🔬 EcmaScript Laboratory
<em>Experiments in JavaScript</em>

### [FLIP Transitions](https://aerotwist.com/blog/flip-your-animations/)
```javascript
import anime from 'animejs';

async function FLIP(fromEl: HTMLElement, toEl: HTMLElement): Promise<void> {
  // get initial positions (points that will be animated to and from)
  const initStart = fromEl.getBoundingClientRect();
  const end = toEl.getBoundingClientRect();
  // hide the end state
  toEl.style.opacity = '0';
  // show the start state
  fromEl.style.opacity = '1';
  let start = initStart;
  const scaleX = end.width / initStart.width;
  const scaleY = end.height / initStart.height;
  // if scaling is needed
  if (initStart.width != end.width || initStart.height != end.height) {
    // use the bounding box for the element at full scale
    // (this runs synchronously, so no visible UI update occurs)
    anime.set(fromEl, {
      scaleX: scaleX,
      scaleY: scaleY
    });
    start = fromEl.getBoundingClientRect();
    anime.set(fromEl, {
      scaleX: 1,
      scaleY: 1
    });
  }
  // move fromEl to be exactly on top of toEl
  await anime({
    targets: fromEl,
    scaleX,
    scaleY,
    // in the context of a rescaled element,
    // all related pixels are rescaled, so we
    // need to adjust the transforms accordingly
    translateY: (end.top - start.top) / scaleY,
    translateX: (end.left - start.left) / scaleX,
    duration: 1000,
    easing: 'easeInOutQuad'
  }).finished;
  // Reveal the actual element and hide the animated element
  toEl.style.opacity = '1';
  fromEl.style.opacity = '0';
  // Reset the animated element's transforms.
  anime.set(fromEl, {
    scaleX: 1,
    scaleY: 1,
    translateY: 0,
    translateX: 0
  });
}
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
