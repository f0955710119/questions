# Class-Based Component

自從有了 `React hooks` 之後，讓 `Function Component` 的寫法變成主流，那為什麼我們還需要學習 `Class-Based Component` 呢? 其一，不外乎是仍有公司的專案是以此方式撰寫；其二，也是我認為更重要的原因，是更好瞭解 `React hooks` 跟 `Component` 兩者的運作行為

### 閱讀架構

- 破除害怕 Class-Based Component 的常見原因
  - 它其實只是有 class 環境
  - this 其實只要去記 4 個地方
- Class-Based Component 的重要性
  - 元件生命週期 ( Lifecycle of Component )
- 使用細節 ( Sample Code )

## 看到 `class` 下意識的逃跑本能

JavaScript 本身是依靠 prototype 去產生不同類型的 Object，因此才有我們常用的 function、 array、與 ES6 出現的語法糖 class；加上我們幾乎都是在寫 OOP 的過程中看到 class，語法中又附帶不知道會指向誰的 this，因此有了一種「**只要是 class 有關的東西都很複雜**」的印象。這篇文章的宗旨之一便是要來打破這個謎思，讓大家之後能面對這塊心魔！

## `Class-Based Component` 不是 OOP

之前我們有認識到 MVC 架構下是如何去分離資料邏輯與畫面渲染，它本身是一種較難上手的程式管理架構。MVC 等於我們每一頁都會要有新的 model、controller、view，透過 OOP 的方式去撰寫，可以降低一直重複寫共用的 properties 跟 methods，這樣才會方便我們去寫多個分頁，而又不會有過多重複程式碼跟物件產生。( 之前有提到 ES5 的 constructor 是利用在 prototype 上加東西，達到只產生一次，而其他實例都能有同樣 method 能使用的效果 )

讀到這邊，大家是不是發現了什麼?

沒錯，利用 `class 產生實例` 跟 `使用MVC架構管理程式碼` 是**兩件事是獨立分開的**。

事實上， **`Class-Based Component` 也只是在使用 `class` 的環境，讓 Components 直接有 `props`、`state`、以及 `操作生命週期的 methods`** ，而不用每次創造 Component 都要重複給這些特性。

在沒有 React hooks 的時候，反而 class 的特性讓我們更好創造不同功用的 Component，同時 class 內部本身又可以寫其他 function，做到維護全域乾淨。

所以到這邊我們可以理解一個概念， `Class-Based Component` 不是為了以 OOP 的方式去管理我們程式，更不是要我們去用 MVC 的框架分類程式碼，它單純是 **想使用 class 的特性來解決重複撰寫的問題**。

## this 是根據「function 被呼叫的位置」去找東西

`this` 的關鍵所在，我們可以先理解它的在不同環境的不同指向。

> In most cases, the value of this is determined by how a function is called (runtime binding). It can't be set by assignment during execution, and it may be different each time the function is called.

根據上述，`this` 並非一開始賦值，而且有綁定運作環境。多數時候是根據 function 被呼叫時所決定，所以它的值可能每次都不同。

那根據這個定義，加上 function 會是 first-class，或是直接 log 出 this，所以全域環境也列入的話，整理出原生 7 種呼叫情形 ( ES6 class 是建構式的語糖，所以與 ES5 建構式算為同一種 )。
| 環境 | this 指向|
| --- | --- |
| Browser | Window Object |
| 全域 | Window Object |
| 全域 ( strict mode ) | undefined |
| `一般 function` | function 生成環境的 Object |
| `作為 constructor() 的 function` | 特殊的 constructor Object |
| `Arrow function` | 往上找到的第一個 scope |
| `Event Listener 的 callback 是一般 function` | targeted event |

比較特別的是到了 ES6 class 後，內部寫的 methods 也會以 prototype 的方式加到 constructor 特殊物件上 ( 但 static method 不會)

## class

## 關鍵字對應的參考文章
