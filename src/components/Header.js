
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


function Header() {

  const {auth,setAuth} = useAuth()
  let navigate = useNavigate();

  const logout = () =>{
    setAuth({})
    navigate("/login", {replace:true})
  }

  return (
    <header>
        <div className="logo-wrapper">
           <img src="RoomReady.png"/>
        </div>
        {!auth?.username && <button><Link to={"/login"}>Login</Link></button>}
        {auth?.username && <Link to={`user/${auth?.username}`}>{auth.username}/{auth.role}</Link>}
        {auth?.username && <button onClick={logout}>Logout</button>} 
    </header>
  )
}

export default Header