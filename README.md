# 15 Questions about JS, CSS, React, and STYLiSH

## 1. How to handle array data type?

* Index
* ES6 Spread / Rest Operator
* Array.prototype.methods

#### Example

```js
const names = ['Weil One','Weil Two','Weil Three'];
const [ name, ...otherNames ] = names;

const nameIsFirstOne = name === names[0]; // true
const otherNamesAreLastTwo = [...otherNames].join('') === [names[1],names[2]].join(''); // true
```

#### Caution
* Rest Operator can only be the last variable when destructuring
* Whether the handled array will be mutated by Array.prototype.methods 