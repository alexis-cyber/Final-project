import { Link} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import logo from './alex2.png';

import "./Home.css"


function Navbar() {
  const ADMIN = "alex@gmail.com";
  // const navigate = useNavigate();
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
        // navigate("/login");
        window.location.reload()
      } else {
        return;
      }
    }

  return (
    <>      
    {!token ? ( 
      <nav className="navbar">
         <Link to="/" className="link"><img src={logo} alt="Logo" className="logos"/></Link>
        <div className="linkGroup">
        {/* <img src={logo} alt="Logo" className="logos"/>  */}
          {/* <Link to="/" className="link"><img src={logo} alt="Logo" className="logos"/></Link> */}
          <Link to="/cart" className="link">Cart</Link>
          <Link to="/login" className="link">Log In</Link>
          <Link to="/register" className="link">Register</Link>
        </div>
      </nav>
     ) : (
        <nav className="navbar">
          
          <div className="linkGroup">
          <Link to="/" className="link"><img src={logo} alt="Logo" className="logos"/></Link>
            <Link className="link">{decoded.email}</Link>
            <Link to="/cart" className="link">Cart</Link>
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