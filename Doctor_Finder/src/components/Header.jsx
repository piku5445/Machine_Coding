function Header({handleTab}) {
    return <div style={{"display":"flex" ,"justifyContent":"center","gap":"20px","margin":"20px" ,"backgroundColor":"#f0f0f0","padding":"10px" ,
      position: "fixed",   
      top: 0,              
      left: 0,
      width: "100%",       
      zIndex: 1000 }}>
    <button onClick={() => handleTab("Form")}>Form</button>
      <button onClick={() => handleTab("Interest")}>Interest</button>
      <button onClick={() => handleTab("Setting")}>Setting</button>
    </div>
}

export default Header