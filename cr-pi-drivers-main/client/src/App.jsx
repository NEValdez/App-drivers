import { Landing, Home, Form, Detail } from "./Views"
import { Route, Routes } from "react-router-dom"
import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/detail/:name" element={<Detail/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/form" element={<Form/>}/>
      </Routes>
    </div>
  )
}

export default App
