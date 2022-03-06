# 15 Questions about JS, CSS, React, and STYLiSH

## 1. How to handle array data type?

* Index
* Iterable
* ES6 Spread / Rest Operator
* Array.prototype.methods

### Example

```js
const names = ['Weil One','Weil Two','Weil Three'];
const namesCopy = [...names];
const [ name, ...otherNames ] = names;
const nameshiftFromNamesCopy = namesCopy.shift();

const nameIsFirstOne = name === names[0]; // true
const otherNamesAreLastTwo = [...otherNames].join('') === [names[1],names[2]].join(''); // true
const twoNamesArrayHasEqualLength = names.length === namesCopy.length; // false
```

### Caution
1. Rest Operator can only be the **last** variable when destructuring
2. Whether the handled array will be **mutated** by Array.prototype.methods

## 2. How to handle object data type?

### Key ( with dot or brackets )
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
### Object - ES6 Spread / Rest Operator
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

### Object.methods ( more common than Object.prototype.methods )
`Object.keys() / Object.values() / Object.entries()`
Turn keys, values or both of an object to array list

`Object.fromEntries()`
Turn array (or other iterable object) into object

`Object.assign()`
A way to clone an object but not deep clone

`Object.create()`
A way to create class

## 3. How to manage RESTful API calls?

### Send HTTP Requests: axios and fetch()
* [Axios vs. fetch(): Which is best for making HTTP requests?](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/)
* [request的方式？ ajax & fetch & axios](https://ithelp.ithome.com.tw/articles/10244631)
* [Cancel all axios requests in React’s componentWillUnmount Lifecycle.](https://julietonyekaoha.medium.com/react-cancel-all-axios-request-in-componentwillunmount-e5b2c978c071)
#### Personal Perspective for two methods
1. fetch() is easy to start with in F2E development ( latest version of Node.js is supported now )
2. fetch() is less supported than axios in old browsers( need to polyfilled )
3. fetch() is always resolved when server can response to the request, which makes us identify stauts code ourselves
4. axios itself has system like AbortController API to cancel request

### Manage URL
1. Set a config file ( can include other env)
2. Split hostname and endpoint
3. Make string of version flexibly change
4. Set different request function to different endpoint
```js
// config.js
export default {
    VERSION: '1.0',
    HOSTNAME: `https://api.appworks-school.tw/api/${this.VERSION}`
};

// util.js
import { HOSTNAME } from './config.js'
const api = {
    getProducts(category, paging) {
        return fetch(`${HOSTNAME}/products/${category}?paging=${paging}`).then(
            (response) => response.json()
        );
    },
    getCampaigns() {
        return fetch(`${HOSTNAME}/marketing/campaigns`).then((response) =>
            response.json()
        );
    }
}

export default api;
```

## 7. How to define a React Element with/without JSX and render it?

### React.createElement()
This function can take 3 kind of params, which are type, props, children. [See Example with babel](https://pse.is/42392k). It's accessiable to create nested React Elements, but we can have better DX with JSX due to readability of the structure of an element and its props.  

#### Element created by React.createElement()
```js
import React from 'react';
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, World!'
);
```
### JSX
As mentioned, JSX is more intuitive when it comes to checking the structure of an element. It's easier to check up what has been assigned to an element, such as props, children, and also expression. Besides, JSX can prevent from **injection attack** because ReactDOM will escape any values embedded in JSX before rendering them, which means expression of JSX is always seen as text. ([See explanation on stackoverflow](https://stackoverflow.com/questions/57746377/react-documentation-jsx-prevents-injection-attacks))
#### Element created by JSX
```js
const welcomeMessage = 'Hello, World!';
const element = <h1 className='greeting'>{welcomeMessage}</h1>;
```
### How to render React Element?
After we create all React elements needed to display on browsers, we use ReactDOM to render them. Usually, we will give a `<div id='root'></div>` in the .html which has the src of this .js, and get that Node to be the insert point for our React Elements to render on.
#### Render
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
const ReactElement = <h1 className='greeting'>'Hello, World!</h1>;
ReactDOM.render(<ReactElement />,document.querySelector('#root'))
```
```html
<!-- index.html -->
<!--  -->
<body>
    <div id='root'></div>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel" src="./src/pages/index.js"></script>
</body>
```

