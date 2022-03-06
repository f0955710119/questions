function App() {
   const { useState, useEffect } = React;
   const [ text, setText ] = useState('I\'m first.');
   console.log(text);
   useEffect(()=>{
     console.log('I\'m second.')
    //  setText('I\'m third.')
   },[])

   return (
       <h1>{text}</h1>
   )
}

ReactDOM.render(<App/>, document.querySelector('#root'));