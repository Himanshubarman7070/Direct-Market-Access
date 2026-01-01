import { useNavigate } from "react-router-dom"
import './Signup.css'
export default function Signup(){
    let usenavigate = useNavigate();
    let login = ()=>{
        usenavigate('/');
    }
    return (
        <>
         <div className="Signup-container">
               <form className="Signup-form">
                <div className="Signup-text">Create Your Account</div>
                <input  type="email" placeholder="  Enter your email id" className="Signup-input"/>
                <input type="text" placeholder="   Create password" className="Signup-input"/>
                <div className="Signup-radio" >
                    <label className="Signup-buyer"><input type="radio" name="rol" value="Buyer" /> Buyer
                 </label>
                  <label><input type="radio" name="rol" value="Farmer"/> Farmer
                 </label>
                </div>
                 <input type="number" placeholder="  Pincode"className="Signup-input"/>
                 <input type="text" placeholder="  Complete Address " className="Signup-input"/>
                 <div className="Signup-radio"><button className="Signup-btn"> Sign Up </button></div>
                 <div className="Signup-text2"> Already have an account? <button className="Login-btn2" onClick={login}>Log in</button></div>
               </form>
         </div>
          
        
        </>
    )
}