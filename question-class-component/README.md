# Class-Based Component

自從有了 `React hooks` 之後，讓 `Function Component` 的寫法變成主流，那為什麼我們還需要學習 `Class-Based Component` 呢? 其一，不外乎是仍有公司的專案是以此方式撰寫；其二，也是我認為更重要的原因，是更好瞭解 `React hooks` 跟 `Component` 兩者的運作行為

### 閱讀架構

- 破除害怕 Class-Based Component 的常見原因
  - 它其實只是有 class 環境
  - this 其實只會指去 4 個地方
- Class-Based Component 的重要性
  - 元件生命週期 ( Lifecycle of Component )
  - React hooks 的由來
- 使用細節 ( Sample Code )

## 看到 `class` 下意識的逃跑本能

JavaScript 本身是依靠 prototype 去產生不同類型的 Object，因此才有我們常用的 function、 array、與 ES6 出現的語法糖 class；加上我們幾乎都是在寫 OOP 的過程中看到 class，語法中又附帶不知道會指向誰的 this，因此有了一種「**只要是 class 有關的東西都很複雜**」的印象

## `Class-Based Component` 不是 OOP

之前我們有認識到 MVC 架構下是如何去分離資料邏輯與畫面渲染，不過它確實是一個較難上手的編程方式。但事實上， **`Class-Based Component` 本身僅利用 `class` 的環境，讓 Components 直接有 `props`、`state`、以及 `操作生命週期的 methods`** 的可以使用。

在沒有 React hooks 的時候，反而 class 的特性讓我們更好重複創造不同功用的 Component，同時 class 內部本身又可以寫其他 function，可以維護全域。

所以到這邊我們可以理解一個概念， `Class-Based Component` 不是為了以 OOP 的方式去管理我們程式，它單純是 **想使用 class 的特性來解決重複撰寫** 接收 props、更新 state、使用生命週期的 methods

## 關鍵字對應的參考文章
