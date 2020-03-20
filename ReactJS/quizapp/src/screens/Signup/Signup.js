import React from "react";
import swal from "sweetalert";
import "../../App.css";

const CreateUser = (e,ShowLogin) => {
    e.preventDefault();
    const userData = document.getElementsByTagName("input");
    localStorage.setItem( "userName" , userData[0].value )
    localStorage.setItem( "userPass" , userData[1].value )
    swal("Account created successfully","","success")
    setTimeout(ShowLogin(),700);
}

const Signup = ({ShowLogin}) => (
  <form onSubmit={e => {CreateUser(e,ShowLogin)}} action="javascript:void(0)">
    <h1>Signup</h1>
    <br/><br/>
    <input type="email" autoFocus required placeholder="Email Address" />
    <br />
    <br />
    <input type="password" required placeholder="Password" />
    <br />
    <br />
    <button>Signup</button>
    <br/><br/>
    <span>
        Already have an account :
        <a href="javascript:void(0)" onClick={ShowLogin} > Login </a>
    </span>
  </form>
  
);

export default Signup;
