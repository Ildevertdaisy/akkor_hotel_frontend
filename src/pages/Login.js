
import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const { setAuth } = useAuth();


  //idle | loading | success | error
  const [status, setStatus] = useState('idle');
  const id = useId();

  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;


  const getUserData = async (token) => {
   const response = await fetch("http://127.0.0.1:8000/users/me", {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   });
   if (response.ok) {
     let userData = await response.json();
     console.log(userData);
     userData["token"] = token;
     setAuth(userData);
     navigate("/", { replace: true });
   }
 };
  
   async function handleSubmit(event){
      event.preventDefault();

      setStatus("loading");
       
      const response = await fetch("http://127.0.0.1:8000/users/login", {
         method: 'POST', 
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
            password
         })
      });

      const json = await response.json();
      console.log(json);

      console.log(response.status);

      if(response.status === 201) {
         await getUserData(json["token"])
         setStatus('success');
         navigate("/", { replace: true })
      } else {
        setStatus('error');
      }

   }

  return (
   <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
         <div className="row">
            <label htmlFor={emailId}>Email</label>
            <input
            required={true}
            disabled={status === 'loading'}
            id={emailId}
            type="email"
            value={email}
            onChange = {(event) => {
                setEmail(event.target.value);
            }}
            />
         </div>
         <div className="row">
            <label htmlFor={passwordId}>Password</label>
            <input
             required={true}
             disabled={status === 'loading'}
             id={passwordId}
             type="password"
             value={password}
             onChange = {(event) => {
                 setPassword(event.target.value);
             }}
            />
         </div>
         <div className="button-row">
              <button
                disabled={status === 'loading'}
              >
                 {status === 'loading'
                  ? 'Login....'
                  : 'Login'
                 }
              </button>
              <p>Not yet a member ? <Link to={"/register"}>Register here.</Link></p>
              
         </div>
         {status === 'error' && (<p className="error-login">
            Unknown email or password.
         </p>)}
    
    </form>
   </div>
  )
}
export default Login