import { useNavigate } from "react-router-dom";

export default function Login(){
  let usenavigate = useNavigate();
  let signup = ()=>{
    usenavigate('/signup');
  }
  let login = ()=>{
    usenavigate('/home')
  }
    return (
        <>
         <div className="Login-container">
           <form className="Login-form">
            <div className="Login-text1"> Welcome</div>
            <div className="Login-text2" >Direct Market Access</div>
            <div className="Login-text">Email</div>
            <input type="email" placeholder="  Enter your email id" className="Login-input"/>
            <div className="Login-text">Password</div>
            <input  type="password" placeholder="  Enter your password" className="Login-input"/>
            <button type="submit" className="Login-btn" onClick={login}>Log in</button>
            <div className="Login-text3">Don't have an account?<button className="Login-btn2" onClick={signup}>Sign Up</button></div>
           </form>
         </div>
        </>
    );
}