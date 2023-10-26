import { Landing, Home, Form, Detail } from "./Views"
import { Route } from "react-router-dom"
import './App.css'

function App() {

  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/detail/:name" component={Detail}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/form" component={Form}/>
    </div>
  )
}

export default App
