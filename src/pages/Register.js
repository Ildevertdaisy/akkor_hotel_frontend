
import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();


  //idle | loading | success | error
  const [status, setStatus] = useState('idle');
  const id = useId();

  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;
  const pseudoId = `${id}-pseudo`;
  const confirmPasswordId = `${id}-confirmPassword`;
  
   async function handleSubmit(event){
      event.preventDefault();

      setStatus("loading");

      const formData = new FormData()
      formData.append('email', email);
      formData.append('pseudo', pseudo);
      formData.append('password', password);

      const response = await fetch("http://127.0.0.1:8000/users/register", {
          method: 'POST', 
          body: formData
      });

      const json = await response.json();
      console.log(json);

      if(response.status === 200) {
        setStatus('success');
        navigate("/login");
      } else {
        setStatus('error');
      }

   }

  return (
   <div className="register-container">
    <form onSubmit={handleSubmit} className="register-form">
         <div className="row">
            <label htmlFor={pseudoId}>Username</label>
            <input
            required={true}
            disabled={status === 'loading'}
            id={pseudoId}
            type="text"
            value={pseudo}
            onChange = {(event) => {
                setPseudo(event.target.value);
            }}
            />
         </div>
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
         <div className="row">
            <label htmlFor={confirmPasswordId}>Confirm password</label>
            <input
             required={true}
             disabled={status === 'loading'}
             id={confirmPasswordId}
             type="password"
             value={confirmPassword}
             onChange = {(event) => {
                 setConfirmPassword(event.target.value);
             }}
            />
         </div>
         <div className="button-row">
              <button
                disabled={status === 'loading'}
              >
                 {status === 'loading'
                  ? <><img src="spinner-login-register.svg"/> <p>Registering...</p></>
                  : 'Register'
                 }
              </button>
              Are you a memnber?
              <Link to={"/login"}>Login here.</Link>
    
         </div>
         {status === 'error' && (<p className="error-register">
            Something went wrong!
         </p>)}
    </form>
   </div>
  )
}
export default Register;