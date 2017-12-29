import React from 'react';
import { Link } from 'react-router-dom';
const Menu = (props) => {
	if(props.authenticated){
		return (
 				<ul className="menu">
          <li>
            <Link to={'/'}>To do</Link>
          </li>
          <li>
            <Link to={'/completed'}>Completed</Link>
          </li>
          <li className="logOut"  onClick={ props.logOut }>sign out</li>
        </ul>
		);
	} else {
		return (
 				<div className="auth">
          <p className="facebook" onClick={props.authWithFacebook}>Facebook</p>
          <form 
          onSubmit={(event) => {props.EmailAndPasswordAuthentication(event) }} 
          >
            <label>
              Email <input type="email" ref={ props.emailInput} />
            </label>
            <label>
              Password  <input type="password" ref={ props.passwordInput} />
            </label>
            <input type="submit" value="Register/Login" />
          </form>
        </div>
		);
	}
}

export default Menu;