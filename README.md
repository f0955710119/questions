# 15 Questions about JS, CSS, React, and STYLiSH

## 1. How to handle array data type?

* Index
* Iterable
* ES6 Spread / Rest Operator
* Array.prototype.methods

#### Example

```js
const names = ['Weil One','Weil Two','Weil Three'];
const namesCopy = [...names];
const [ name, ...otherNames ] = names;
const nameshiftFromNamesCopy = namesCopy.shift();

const nameIsFirstOne = name === names[0]; // true
const otherNamesAreLastTwo = [...otherNames].join('') === [names[1],names[2]].join(''); // true
const twoNamesArrayHasEqualLength = names.length === namesCopy.length; // false
```

#### Caution
1. Rest Operator can only be the **last** variable when destructuring
2. Whether the handled array will be **mutated** by Array.prototype.methods

## 2. How to handle object data type?

#### Key ( with dot or brackets )
```js
const user = {
    id: 0,
    name: 'Weil',
    job: {
        title: 'software engineer',
        field: 'front-end',
        experience: '0 year'
    }
};
const userRef = user;

user.id = 1;
userRef['name'] = 'Weil Liao';

const userRefHasSameId = user['id'] === userRef['id']; // true
const userRefHasSameName = user.name === userRef.name; // true

const jobDescription = {
    requirement: {
        need: ['title', 'field', 'experience']
    }
}
const jobSeeking = jobDescription.requirement.need[0];

const canCallTitle = user.job[`${jobSeeking}`] === 'software engineer'; // true
const isErrorCalling = user.requirement.need[0] !== 'software engineer'; // Cannot read properties of undefined
```
#### Object - ES6 Spread / Rest Operator
```js
const customer = {
    name: 'Weil',
    order: {
        drink: 'black tea',
        meal: 'double beef burger'
    }
};
const customerCopy = { ...customer };

const order = {
    drink: 'milk tea',
    meal: 'double beef cheese burger',
    sideDish: 'salad',
    dressing: 'thousand island'
};

const customerCopyUpdate = { ...customerCopy, order };

const { name } = customer;
const { drink, meal, ...salad } = customerCopyUpdate.order;

customer.name = 'Weil Liao';

const nameBecomeIndependentVar = name !== customer.name; // true
const orderHasUpdated = customer.order !== customerCopyUpdate.order; // true
const saladHasTwoItem = salad.sideDish + salad.dressing === order.sideDish + order.dressing; // true
```

#### Object.methods ( more common than Object.prototype.methods )
* Object.keys() / Object.values() / Object.entries()
Turn keys, values or both of an object to array list

* Object.fromEntries()
Turn array (or other iterable object) into object

* Object.assign() 
A way to clone an object but not deep clone

* Object.create()
A way to create class

