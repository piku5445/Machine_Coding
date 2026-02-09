// import { useState } from 'react'
// import { useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// import Form from './components/form'
// import Header from './components/Header'
// import Interest from './components/Interest'
// import Setting from './components/Settings'
// //import Button from './components/Button/Button'
// function App() {
//  const[tab,setTab]=useState("Form")
// function handelTab(e){
//   // switch(e){
//   //   case "Form":
//   //     setTab(<Form/>)
      
//   //   case "Interest":
//   //     setTab(<Interest/>)
     
//   //   case "Setting":
//   //     setTab(<Setting/>)
      
//   // }

//   setTab(e)
// }
// // useEffect(()=>{
// //   handelTab()
// // },[tab])
//   return (
//     <>
    
//     <Header handelTab={handelTab}/>
//   {tab === "Form" && <Form />}
//   {tab === "Interest" && <Interest />}
//   {tab === "Setting" && <Setting />}
//     </>
//   )
// }

// export default App
import { useState } from 'react'
import Form from './components/Form'
// import Interest from './components/Interest'
 import './App.css'
import Setting from './components/Settings'
//import Setting from './components/Setting'
import Header from './components/Header'
import Specialities from './components/Specialities'

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
      
    </>
  )
}

export default App
