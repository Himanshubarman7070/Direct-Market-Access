import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import { url } from "./Info";

export default function Signup() {
  const usenavigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [mobile, setmobile] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  

  const login = () => {
    usenavigate("/");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
      mobile,
      pincode,
      address,
    };

    
      fetch(`${url}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(res=>res.json())
      .then((res)=>{
        console.log("my datta --->",res)
        if(res.data=="Success"){
          localStorage.setItem("name",name);
          localStorage.setItem('mobile',mobile);
          localStorage.setItem('pincode',pincode);
          localStorage.setItem('address',address);
          localStorage.setItem("email",email);
           
            usenavigate('/mainpage');
        }
        else alert('Email id already registered ');
      })

    
      
  };

  return (
    <div className="Signup-container">
      <form className="Signup-form" onSubmit={handleSignup}>
        <div className="Signup-text">Create Your Account</div>

        {/* ✅ Name added */}
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="Full Name"
          className="Signup-input"
          required
        />

        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter your email id"
          className="Signup-input"
          required
        />

        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Create password"
          className="Signup-input"
          required
        />

        <input
          type="tel"
          onChange={(e) => setmobile(e.target.value)}
          placeholder="Mobile number"
          className="Signup-input"
          required
        />


        <input
          type="number"
          onChange={(e) => setpincode(e.target.value)}
          placeholder="Pincode"
          className="Signup-input"
          required
        />

        <input
          type="text"
          onChange={(e) => setaddress(e.target.value)}
          placeholder="Complete Address"
          className="Signup-input"
          required
        />

        <button className="Signup-btn" type="submit">
          Sign Up
        </button>

        <div className="Signup-text2">
          Already have an account?
          <button type="button" className="Login-btn2" onClick={login}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
