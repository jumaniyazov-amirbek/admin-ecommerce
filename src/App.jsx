import { useContext, useState } from "react"
import {Main} from "./components"
import { Login } from "./pages"
import { UserContext } from "./context/UserContext"

function App() {
  const {user} = useContext(UserContext)
  
  return (
    <>
    {
      user.isAuth ? <Main/> : <Login/>
    }
    </>
  )
}

export default App
