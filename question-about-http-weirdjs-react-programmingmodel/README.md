# 15 Questions about HTTP, Weird JS, React DOM, FP, and OOP

## 13.Object-oriented programming

## 14.What is Big O notation?

## 15.What is the difference between declarative and imperative paradigm in programming?

![paradigms](https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Schaubilder/programming-paradigms.png)

### 撰寫上的思維差異: what & how

`Declarative` 撰寫方式在於直接表達出「做什麼」，像是常用的`Array.prototype.reduce()`表達「把陣列濃縮成一個自訂的變數內容」；`Imperative`則在於「怎麼做」，會將流程逐一用判斷式或迴圈撰寫出來。

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

### 與 FP / OOP 的關係

#### Functional Programming

再繼續延伸前面的生活例子，今天去問谷哥跟子華之前，我們先請身邊的夥伴幫我們看 Error 可能是什麼。

```js
function solveCodeProblem(student, question) {
  if (pontentialError.status === "resolved")
    return function (solution) {
      const codeCanWork = solution(student, question);
      return codeCanWork;
    };

  return function (getKeyword) {
    const keyword = getKeyword(student, question);
  };
}
const decideHowToDealProblem = solveCodeProblem(errorView);
```

`pontentialError`是環境變數，也就是我們當前跟夥伴討論後的腦袋狀況。如果成功解開，可以再呼叫一個 function，它的參數能帶入解法 callback 來得到解答，而這塊`function (solution) {const codeCanWork = solution();return codeCanWork;};`本身是一塊`Higher-order Function`；相反的，如果沒解開，我們會去得到 function，讓這個 function 能帶入去詢問谷哥或子華的 callback，來拿到關鍵字。利用柯里化的方式幫我們拆分流程，做到更細緻的處理與重複使用

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
    readDocumemt(){}
}

class TypeError extends Error {
    super()
    constructor(type){
        this.type = type
    }
    studyWeirdPartOfType(){}
}
```

像我們可能常常在開發上遇到 JS 會有 Type 的組合跟我們想像不一樣，因此產生很多 error，因此我們可以延伸我們遇到錯誤時會有的共同特性，再針對型態類型的錯誤去蒐集它們的共同性。

### Declarative

1. 程式碼目的清楚
2. 可以重複使用
3. 語法簡潔
4. 重複執行同樣的參數值會有同樣結果，且不影響系統
5. 不用自己去做除錯機制 ( imperative 需要做 else )
6. `3 + 4 = 4 + 3` 可以不用特別在意順序 (像在 firebase 用 where 的複合索引打開後，不用刻意去排同範圍的 where 搜尋順序)
7. 過程比較抽象
8. 本身不好分離  
   以 HTML 違例，在前端我們會用 JS 分拆，在後端會用模板套件(e.g. pug)，但我們都必須額外去找方式再去整理

### Imperative

1. 較好上手 (有嗎???????)  
   確實若以剛接觸一門程式語言的角度來看，知道一些語法本身的特性，像是型態跟 forloop，就可以直接寫出一個 sum 的 function
2. 程式會按照我們自己設計的流程去執行  
   像是我們可以去分拆成模組(OOP 思維)，或是自己定義處理一個 state 的程序(同樣的 sum 可以有很多處理方式)，更細部可以針對不同狀況去寫 condition
3. 能自己去拆分跟組裝
4. 整個環境的 state 是互相影響的
5. 執行順序很重要

### 詞彙定義的討論

- [What's the difference between declarative syntax and encapsulation?](https://cs.stackexchange.com/questions/40793/whats-the-difference-between-declarative-syntax-and-encapsulation)
- [Functional Programming Vs Declarative Programming Vs Imperative Programming](https://stackoverflow.com/questions/10925689/functional-programming-vs-declarative-programming-vs-imperative-programming)

- [Declarative Programming: Is It A Real Thing?](https://www.toptal.com/software/declarative-programming)
