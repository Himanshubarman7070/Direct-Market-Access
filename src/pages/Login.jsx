import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "./Info";

export default function Login(){
  let  [ email,setemail] = useState();
  let [password,setpassword] = useState();
  
  let usenavigate = useNavigate();
  let signup = ()=>{
    usenavigate('/signup');
  }
  let login = ()=>{
    let obj ={
      email:email,
      password:password
    }
    fetch(`${url}/login`,{method:"POST",headers:{'Content-type':"application/json"},body:JSON.stringify(obj)})
    .then(res=>res.json())
    .then(res=>{
      if(res.data=="success"){

        localStorage.setItem("email",email);
        localStorage.setItem("name",res.name);
        localStorage.setItem('mobile',res.mobile);
        localStorage.setItem('pincode',res.pincode);
        localStorage.setItem('address',res.address);
        usenavigate('/mainpage');
      }
      else alert("Invalid email or password !");
    })
    
  }
    return (
        <>
         <div className="Login-container">
           <form className="Login-form">
            <div className="Login-text1"> Welcome</div>
            <div className="Login-text2" >Direct Market Access  </div>
            <div className="Login-text">Email</div>
            <input type="email" onChange={e=>setemail(e.target.value)} placeholder="  Enter your email id" className="Login-input"/>
            <div className="Login-text">Password</div>
            <input  type="password" onChange={e=>setpassword(e.target.value)} placeholder="  Enter your password" className="Login-input"/>
            <button type="button" className="Login-btn" onClick={login}>Log in</button>
            <div className="Login-text3">Don't have an account?<button type="button" className="Login-btn2" onClick={signup}>Sign Up</button></div>
           </form>
         </div>
        </>
    );
}