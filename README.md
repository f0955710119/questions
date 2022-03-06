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

### 2. How to handle object data type?

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
`Object.keys() / Object.values() / Object.entries()`
Turn keys, values or both of an object to array list

`Object.fromEntries()`
Turn array (or other iterable object) into object

`Object.assign()`
A way to clone an object but not deep clone

`Object.create()`
A way to create class

### 3. How to manage RESTful API calls?

#### Send HTTP Requests: axios and fetch()
* [Axios vs. fetch(): Which is best for making HTTP requests?](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/)
* [request的方式？ ajax & fetch & axios](https://ithelp.ithome.com.tw/articles/10244631)
* [Cancel all axios requests in React’s componentWillUnmount Lifecycle.](https://julietonyekaoha.medium.com/react-cancel-all-axios-request-in-componentwillunmount-e5b2c978c071)
##### Personal Perspective for two methods
1. fetch() is easy to start with in F2E development ( latest version of Node.js is supported now )
2. fetch() is less supported than axios in old browsers( need to polyfilled )
3. fetch() is always resolved when server can response to the request, which makes us identify stauts code ourselves
4. axios itself has system like AbortController API to cancel request

#### Manage URL
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

### 4. How to use Promise to handle asynchronous operation, e.g., fb login?
#### Why Promise? Ensure to get specific value in the future
Cause almost all methods provided by FB SDK are using callback to handle process, it results in that we can not directly store value after calling those methods. Instead, however, we can use Promise as a return value of a function, which package the process. With resolve() and reject() ( features of Promise to store data with certain consuming ways ), we can decide what we will get after consume Promise in different conditiona. 
#### Consume Promise
##### then() & catch() 
These two methods will help us consume promises with then() for resolve value and catch() for reject one. It's not uncommon to return another promise when using then(), so that we can chain another .then() to resolve that promise and get the incoming value without worring about nested callback hell. As the following example, we can see how we consume resolved value step by step.

```js
fb.loadScript()
.then(() => fb.init())
.then(() => fb.getLoginStatus())
.then((response) => {
    if (response.status === 'connected') {
        return Promise.resolve(response.authResponse.accessToken);
    }
    return fb.login().then((response) => {
        if (response.status === 'connected') {
            return Promise.resolve(response.authResponse.accessToken);
        }
        return Promise.reject('登入失敗');
    });
})
.then((accessToken) =>
    api.signin({
        provider: 'facebook',
        access_token: accessToken,
    })
)
.then((json) => {
    window.localStorage.setItem('jwtToken', json.data.access_token);
    checkout();
})
.catch((error) => window.alert(error));
```
##### async / await
These syntax is considered to be more elegant when consumnig a resolved value from promise. We will always get the resolved value when using `await`, which means we have to combine usage of try / catch with this method to handle rejected value.    

```js
async function stylishLogin() {
    try {
        await fb.loadScript();
        await fb.init();
        const access_token = await fb.getLoginStatus().then(response=>{
            if (response.status === 'connected') {
            return Promise.resolve(response.authResponse.accessToken);
            }
            return fb.login().then((response) => {
                if (response.status === 'connected') {
                return Promise.resolve(response.authResponse.accessToken);
            }
            return Promise.reject('登入失敗');
            });
        })
        const signinResponse = await api.signin({
            provider: 'facebook',
            access_token
        })
        const data = await signinResponse.json()
        window.localStorage.setItem('jwtToken', json.data.access_token)
        checkout();
    } catch (error) {
        window.alert(error.message)
    }
} 
```

## Foreword For React 
### 7. How to define a React Element with/without JSX and render it?

#### React.createElement()
This function can take 3 kind of params, which are type, props, children. [See Example with babel](https://pse.is/42392k). It's accessiable to create nested React Elements, but we can have better DX with JSX due to readability of the structure of an element and its props.  

##### Element created by React.createElement()
```js
import React from 'react';
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, World!'
);
```
#### JSX
As mentioned, JSX is more intuitive when it comes to checking the structure of an element. It's easier to check up what has been assigned to an element, such as props, children, and also expression. Besides, JSX can prevent from **injection attack** because ReactDOM will escape any values embedded in JSX before rendering them, which means expression of JSX is always seen as text. ([See explanation on stackoverflow](https://stackoverflow.com/questions/57746377/react-documentation-jsx-prevents-injection-attacks))
##### Element created by JSX
```js
const welcomeMessage = 'Hello, World!';
const element = <h1 className='greeting'>{welcomeMessage}</h1>;
```
#### How to render React Element?
After we create all React elements needed to display on browsers, we use ReactDOM to render them. Usually, we will give a `<div id='root'></div>` in the .html which has the src of this .js, and get that Node to be the insert point for our React Elements to render on.
##### Render
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
const ReactElement = <h1 className='greeting'>'Hello, World!</h1>;
ReactDOM.render(<ReactElement />,document.querySelector('#root'))
```
```html
<!-- index.html -->
<body>
    <div id='root'></div>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel" src="./src/pages/index.js"></script>
</body>
```

### 8.How to define a React Component and render it?
1. [React Class-based vs Functional Component從特性淺談兩種寫法之異同](https://linyencheng.github.io/2020/02/02/react-component-class-based-vs-functional/)
#### Functional Component
```js
import React from 'react'
function NavItem (props) {
    const { id, title, color } = props;
    return (
        <li key={id} className='nav__item' style={{backgroundColor: `#${color}`}}>{title}</li>
    )
}

function Nav(props) {
    const { variants } = props;
    return (
        <nav>
            <ul>
            {variants.map(variant=><NavItem id={variant.id} title={variant.title} color={variant.color}/>)}
            </ul>
        </nav>
    )
}
```

### 9. How to specify attribute and embed JavaScript expressions in JSX?
* JSX is also expression, so it can be insert in another JSX
* Attributes of a component are a bunch of properties call props, which will be send to the component as an object that can be used as a data source
* Be cautious that props of a custom component is different from attributes of a React Element

### 10. How to manage data in React?
* props ( prop chain )
* hooks: useState() & useReducer() ( useReducer is better when it comes to object data type )
* Context API ( A feature that can handle cross-parenet and app-wide data)
* 3rd library like Redux ( Redux is not only avaiable to React )

### 11. How to handle API call & timer in React?
* useEffect() ( what is life cycle of a component )
* useRef() ( give ref to an object )

```js
import { useState, useRef, useEffect } from 'react';

function carousel () {
  const [ campaigns, setCampaigns ] = useState(null);
  const [ activeCampaignIndex, setActiveCampaignIndex ] = useState(0);
  const intervalRef = React.useRef();
  const url = 'https://example-url.com';
  React.useEffect(() => {
    fetch(url).then((json) => {
      setCampaigns(json.data);
      intervalRef.current = window.setInterval(() => {
        setActiveCampaignIndex((prev) =>
          prev === json.data.length - 1 ? 0 : prev + 1
        );
      }, 5000);
    });
  }, []);
}

```

### 12. How to handle form elements in React?
* Consider where the data from the form will be used
* useState() or useReducer() to handle a bunch of infomation
* Depending on complexity of doing validation of UI (when to give feedback to users)

## Foreword For STYLiSH 
When it comes to reading others' React scripts, I will destructe it with three steps.
1. **Check the props, states, or even hooks to get a taste of where data comes**    
With this step, I can have a basic concept of what will be affected if I change data when manipulatimg this component.    
    
2. **Draft the flow of life cycle**    
It's important to figure out the life cylce of a component since we have to display different UI in different stages. Though it's a not easy to define stages of life cycle when using functional component, useEffect() still enables us to do so.    
    
3. **Check JSX and events that will have side effect or change state**

### 13. How to handle cart items in React?
* Index is the controller to decide the content of latest array
* Two-way binding data and how it affects ReactDOM to re-render

### 14. How to handle product variants in React?
* Different between React Element and Components ( when to create a customed component)
* Sequence of first-rendering component, hooks, re-rendering