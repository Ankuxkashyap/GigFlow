import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='text-5xl text-green-500'>Welcome to the gigflow app</p>
    </>
  )
}

export default App
