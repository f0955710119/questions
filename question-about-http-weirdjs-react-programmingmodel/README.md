# 15 Questions about HTTP, Weird JS, React DOM, FP, and OOP

## 13.Object-oriented programming

## 14.What is Big O notation?

## 15.What is the difference between declarative and imperative paradigm in programming?

![paradigms](https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Schaubilder/programming-paradigms.png)

### 撰寫上的思維差異: what & how

`Declarative` 撰寫方式在於直接表達出「做什麼」，像是常用的`Array.prototype.reduce()`表達「把陣列濃縮成一個自訂的變數內容」；`Imperative`則在於「怎麼做」，會將流程逐一用判斷式或迴圈撰寫出來。

### 前人努力種樹的結晶

- [The Simple Guide to Programming Paradigms](https://dev.to/tamerlang/the-simple-guide-to-programming-paradigms-36o#imperative-programming)

### 不同程式語言的例子

##### delcarative programming e.g. SQL (firebase v9 也是類似的概念)

```sql
-- SQL
select gender, sum(income)
from income_list
group by gender;
```

##### imperative programming e.g. JavaScript

```js
var income_m = 0,
  income_f = 0,
  income_list = [
    { gender: "M", income: 100 },
    { gender: "F", income: 100 },
  ];
for (var i = 0; i < income_list.length; i++) {
  if (income_list[i].gender == "M") income_list[i].income;
  else income_f += income_list[i].income;
}
```

### 生活例子

帶問題去問谷哥或子華問題，會得到關於問題的關鍵字，這是 declarative 的運作方式

```js
var studnet, question;
var keyword = getKeyword(student, question);
```

我們自己去內化一個概念成為知識的過程，是 imperative 的方式。

```js
// 每個人內化概念的過程不一樣
function setupConcept(concept) {
  var concepts = google(keyword);
  if (!concepts) return;

  var knowledge = [];
  var conceptQuantity = concepts.length;
  if (conceptQuantity === 0) return alert("我沒知識...:)");

  var i = 0;
  while (i < knowledgeQuantity) {
    concept.push(knowledgeQuantity[0]);
    i++;
  }
  console.log(concept);
}

setupConcept(["declarative", "imperative"]);
```

由此可見，我們不知道谷哥跟子華心裡是怎麼處理我們的問題來給我們關鍵字，但同一個學生、同一個問題去詢問，會得到同一個關鍵字；當我們要轉換成自己想法時，會對我們的腦袋知識庫做 CRUD，而每個人做 CRUD 的流程都不一樣。

### 與 FP / OOP 的關係

#### Functional Programming

再繼續延伸前面的生活例子，今天去問谷哥跟子華之前，我們先請身邊的夥伴幫我們看 Error 可能是什麼。

```js
function solveCodeProblem(question) {
  return function (problemStatus) {
    if (problemStatus === "resolved")
      return function (solutionCallback) {
        const codeCanWork = solutionCallback(question);
        return codeCanWork;
      };

    return function (getKeywordCallback) {
      const keyword = getKeywordCallback(question);
      return keyword;
    };
  };
}
const dealingProblemFunction = solveCodeProblem(question)(problemStatus);
```

這裡我們會知道自己的 `problemStatus` 帶了什麼東西，所以可以去決定接著決定要帶入的做法(要再給什麼 `callback` )。不同狀態會得到不同 `function`，它的參數能帶入解法 `callback` 來得到解答。我們可以在不同狀況下，決定使用夥伴的解答，還是去找谷哥跟子華討論來找關鍵字。利用`currying`跟`Higher-order Function`的方式幫我們拆分流程，做到更細緻的處理與重複使用

#### Object-Oriented Programming

那改由物件導向的寫法，會變成我們今天可能已經發現自己遇到錯誤常常會有共通性，於是我們抽象化了它們變成一個「錯誤」的物件，進而為它撰寫共同的處理方式，而可以延伸不同類型的錯誤。

```js
class Error {
    constructor(message, view, mdn){
        this.message = message;
        this.view = view;
        this.mdn = mdn
    }
    getErrorConcrete(){},
    searchOnGoogle(){},
    readDocumemt(){},
    askTeacher(){}
}

class TypeError extends Error {
    super()
    constructor(type){
        this.type = type
    }
    studyType(){},
    addValidationTest(){},
}
```

像我們可能常常在開發上遇到 JS 會有 Type 造成我們想像不一樣的 error，因此我們可以延伸我們遇到錯誤時會有的共同特性，再針對型態類型的錯誤去蒐集它們的共同性。

### 以 STYLiSH 為例比較兩者: 有 React 真的很美好

#### 畫面渲染

##### Vanilla JS 的 Imperative 寫法

```js
function createCustomedElement(tag, attributeArr, text) {
  const element = document.createElement(tag);
  attributeArr.forEach((attribute) => {
    element.setAttribute(attribute.attribute.value);
  });
  if (!text) return element;
  const nodeText = document.createNodeText(text);
  element.appendChild(nodeText);
  return;
}

const headerAttributes = [{ name: "class", value: "header" }];

const logoLinkAttributes = [
  { name: "class", value: "logo" },
  { name: "href", value: "./index.html" },
];

const logoImageAttributes = [
  { name: "class", value: "logo__image" },
  { name: "src", value: "./img/logo.png" },
  { name: "alt", value: "STYLiSH logo" },
];

const body = document.body;
const header = createCustomedElement("header", headerAttributes);
const logo = createCustomedElement("a", logoLinkAttributes);
const logoImage = createCustomedElement("img", logoImageAttributes);

logo.appendChild(logoImage);
header.appendChild(logo);
body.appendChild(header);
```

##### React 的 delcarative 寫法 (CDN 載入)

```js
function Header() {
  return (
    <header className="header">
      <ReactRouterDOM.Route path="/index">
        <ReactRouterDOM.Link to="/">
          <img src="./img/logo.png" alt="STYLiSH logo" />
        </ReactRouterDOM.Link>
      </ReactRouterDOM.Route>
    </header>
  );
}

function App() {
  return <Header />;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

#### 事件監聽

##### Vanilla JS 的 Imperative 寫法 ( 擷取部分 )

```js
const button = document.querySelect(".btn--delete");

button.addEvenetListener("click", clickToDeleteCartItem);

function clickToDeleteCartItem(event) {
  const container = event.target.closest(".container");
  const cartItemsNeedParse = localStorage.getItem("ITEMS");
  const cartItems = JSON.parse(cartItemsNeedParse);

  const id = container.querySelector(".cart__id").textContent;
  const color = container.querySelector(".cart__color").dataset.colorCode;
  const size = container.querySelector(".cart__size").textContent;
  const idForLocalStorage = id + color + size;
  const newCartItems = cartItems.filter(
    (item) => item.idForLocalStorage !== idForLocalStorage
  );
  localStorage.setItem("ITEMS", newCartItems);

  const cartIcon = document.querySelector(".icon--cart");
  const cartMobileIcon = document.querySelector(".icon--cart--mobile");
  const cartTitleNumber = document.querySelector(".cart__title");

  const itemsQuantity = newCartItems.length;
  cartIcon.textContent = itemsQuantity;
  cartMobileIcon.textContent = itemsQuantity;
  cartTitleNumber.textContent = `購物車(${itemsQuantity})`;

  container.remove();
}

// https://github.com/f0955710119/Stylish-Backend/commit/4a7dcc91b2b8fa40811c422360838400e5f6d380
// ctrl+F: public/src/views/CartView.js
```

##### React 的 delcarative 寫法 (CDN 載入)

- 不用一直呼叫各種 generateMarkup() > render 就會重新抓 localStoage 來改變 useState 的初始值 (兩者放的順序很重要，不然不會重抓)
- 不用把 DOM 物件一直叫出來 > 不用做 DOM manipulate 讓我非常有 DX
- 可以整個 App 共用一個 localStorage 的 state，並不斷更新 > 原本在 MVC 會需要一個 controll 來寫 handler 的 callback 去協調 model 的 state 跟 view 接收到 event 後要再做得 render

```js
// 來，我們直接來看STYLiSH齁 :)
// https://github.com/f0955710119/Stylish-Backend/blob/main/public/src/pages/cart.js
```

### Declarative

1. 程式碼目的清楚
2. 可以重複使用
3. 語法簡潔
4. 重複執行同樣的參數值會有同樣結果，且不影響系統
5. 不用自己去做除錯機制 ( imperative 需要做 else )
6. `3 + 4 = 4 + 3` 可以不用特別在意順序 ( 像在 firebase 用 where 的複合索引打開後，不用刻意去排同範圍的 where 搜尋順序 )
7. 過程比較抽象

### Imperative

1. 較好上手 ( 有嗎??????? )  
   確實若以剛接觸一門程式語言的角度來看，知道一些語法本身的特性，像是型態跟 forloop，就可以直接寫出一個 sum 的 function
2. 程式會按照我們自己設計的流程去執行  
   像是我們可以去分拆成模組 ( OOP 思維 )，或是自己定義處理一個 state 的程序 ( 同樣的 sum 可以有很多處理方式 )，更細部可以針對不同狀況去寫 condition
3. 能自己去拆分跟組裝
4. 整個環境的 state 是互相影響的
5. 執行順序很重要

### 詞彙定義的討論

- [What's the difference between declarative syntax and encapsulation?](https://cs.stackexchange.com/questions/40793/whats-the-difference-between-declarative-syntax-and-encapsulation)
- [Functional Programming Vs Declarative Programming Vs Imperative Programming](https://stackoverflow.com/questions/10925689/functional-programming-vs-declarative-programming-vs-imperative-programming)

- [Declarative Programming: Is It A Real Thing?](https://www.toptal.com/software/declarative-programming)
