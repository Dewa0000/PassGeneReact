import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const copyPassword = () => {
     passRef.current?.select();
     passRef.current?.setSelectionRange(0, 3);
     window.navigator.clipboard.writeText(password),
  [password]}
  
  const passwordGene = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*{}[]";

    for(let i = 1; i <= length; i++){
         let char = Math.floor(Math.random() * str.length ); 
         pass += str.charAt(char);  
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
     passwordGene();
  }, [length,numAllowed,charAllowed,passwordGene]
  )

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
     <h1 className='text-4xl text-center'>Password Generator</h1>
     <input ref = {passRef} type='text' value={password} placeholder='password' readOnly></input>
     <button onClick={copyPassword}>Copy</button>
     <div>
      <input type='range' min={6} max={100} value={length} onChange={(e) => {
           setLength(e.target.value)
      }}></input>
      <label>{length}</label>
      <input type='checkbox' defaultChecked = {numAllowed} onChange={(e) => {
           setNumAllowed((prevState) => !prevState)
      }}></input>
      <label htmlFor='numberInput'>Numbers</label>
      <input type='checkbox' defaultChecked = {charAllowed} onChange={(e) => {
           setCharAllowed((prevState) => !prevState)
      }}></input>
      <label htmlFor='numberInput'>Character</label>
     </div>
    </div>
    
  )
}

export default App
