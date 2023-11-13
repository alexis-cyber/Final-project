import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';


function Navbar() {
  const ADMIN = "alex@gmail.com";
  const navigate = useNavigate();
  let token;
  let decoded;
  
  try {
  // Check if a token exists in local storage
  token = localStorage.getItem('token');
  if (token){
    decoded = jwtDecode(token);
  }
  } catch (err) {
    console.log(err);
  }

    function handleLogout() {
      if (token) {
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload()
      } else {
        return;
      }
    }

  return (
    <>    
    <h1 className="title">Alex`s 衣類</h1>   
    {!token ? ( 
      <nav className="navbar">
        <div className="linkGroup">
          
          <Link to="/" className="link">Home</Link>
          <Link to="/login" className="link">Log In</Link>
          <Link to="/register" className="link">Register</Link>
        </div>
      </nav>
     ) : (
        <nav className="navbar">
          <div className="linkGroup">
          
            <Link className="link">{decoded.email}</Link>
            <Link to="/" className="link">Home</Link>
            {token && decoded.email === ADMIN && (
              <Link className="links" to="/create">
                Post Item
              </Link>
            )}
            <Link onClick={handleLogout} className="link">Log Out</Link>
          </div>
        </nav> 
      )}
  </>
  );
}

export default Navbar;