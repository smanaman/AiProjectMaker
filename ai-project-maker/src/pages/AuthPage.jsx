import { useState } from "react";
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
? "https://aiprojectmaker-vcp5.onrender.com/api/login"
: "https://aiprojectmaker-vcp5.onrender.com/api/register";

const bodyData = isLogin
? { email, password }
: { name, email, password };

console.log("API URL:", url);
console.log("BODY:", bodyData);

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

<div className="container-fluid min-vh-100">

<div className="row min-vh-100">

{/* LEFT IMAGE */}
<div className="col-lg-6 d-none d-lg-block p-0">

<img
src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
alt="auth"
className="img-fluid w-100 h-100"
style={{objectFit:"cover"}}
/>

</div>

{/* RIGHT FORM */}
<div className="col-lg-6 d-flex align-items-center justify-content-center">

<div className="w-100" style={{maxWidth:"420px"}}>

<h2 className="text-center fw-bold mb-4">
{isLogin ? "Login" : "Signup"}
</h2>

<form onSubmit={handleSubmit}>

{!isLogin && (

<input 
type="text" 
placeholder="Name"
className="form-control mb-3 form-control-lg"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

)}

<input 
type="email" 
placeholder="Email"
className="form-control mb-3 form-control-lg"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input 
type="password" 
placeholder="Password"
className="form-control mb-3 form-control-lg"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button className="btn btn-primary w-100 btn-lg">

{isLogin ? "Login" : "Signup"}

</button>

</form>

<p className="text-center mt-3">

{isLogin ? "Don't have account?" : "Already have account?"}

<span 
style={{color:"#6366f1",cursor:"pointer",marginLeft:"6px",fontWeight:"600"}}
onClick={()=>setIsLogin(!isLogin)}
>

{isLogin ? "Signup" : "Login"}

</span>

</p>

</div>

</div>

</div>

<ToastContainer position="top-right" autoClose={2000} />

</div>

);
}