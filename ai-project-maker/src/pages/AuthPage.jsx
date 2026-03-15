import { useState } from "react";
import "./auth.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {

const [isLogin,setIsLogin]=useState(true);

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();

try {

const url = isLogin 
? "http://localhost:5000/api/login"
: "http://localhost:5000/api/register";

const bodyData = isLogin
? { email, password }
: { name, email, password };

const res = await fetch(url,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(bodyData)
});

const data = await res.json();

if(!res.ok){
toast.error(data.message || "Something went wrong");
return;
}

if(isLogin){

// TOKEN SAVE
localStorage.setItem("token",data.token);

toast.success("Login Successful");

setTimeout(()=>{
navigate("/");
},1500);    

}else{

toast.success("Signup Successful");
setIsLogin(true);

}

}catch(err){
console.log(err);
toast.error("Server Error");
}

};

return (
<div className="auth-container">

<div className="auth-left">
<img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="auth"/>
</div>

<div className="auth-right">

<h2>{isLogin ? "Login" : "Signup"}</h2>

<form onSubmit={handleSubmit}>

{!isLogin && (
<input 
type="text" 
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
)}

<input 
type="email" 
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input 
type="password" 
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button>
{isLogin ? "Login" : "Signup"}
</button>

</form>

<p>

{isLogin ? "Don't have account?" : "Already have account?"}

<span onClick={()=>setIsLogin(!isLogin)}>

{isLogin ? " Signup" : " Login"}

</span>

</p>

</div>

<ToastContainer position="top-right" autoClose={2000} />

</div>
);
}