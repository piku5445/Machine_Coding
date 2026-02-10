
import { useState } from 'react'
import Form from './components/Form'
import './App.css'
import Setting from './components/Settings'
import Header from './components/Header'
import Specialities from './components/Specialities'
import Footer from './components/Footer'

function App() {
  const [tab, setTab] = useState("Form")

 
  function handleTab(tabName) {
    setTab(tabName)
  }

 
  function renderTab() {
    switch (tab) {
      case "Form":
        return <Form />
      case "Specialities":
        return <Specialities />
      case "Setting":
        return <Setting />
      default:
        return <Form />
    }
  }

  return (
    <>
      <Header handleTab={handleTab} />
      {renderTab()}
      <Footer/>
    </>
  )
}

export default App
