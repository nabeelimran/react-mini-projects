import React from "react";
import swal from "sweetalert";
import "../../App.css";

const Authenticate = (e,Login) => {
    e.preventDefault();
    const userName = localStorage.getItem("userName");
    const userPass = localStorage.getItem("userPass");
    const loginData = document.getElementsByTagName("input");

    if ( loginData[0].value == userName && loginData[1].value == userPass) {
        swal("Successfully logged in","","success")
        setTimeout(Login(),700);
    }    
    else
       swal("Wrong email or password","","error")

}

const Login = ({ShowSignup , Login}) => {
    return(
        <form onSubmit={(e) => {Authenticate(e,Login)}} action="javascript:void(0)">
            <h1>Login</h1>
            <br/><br/>
            <input type="email" autoFocus required placeholder="Email Address" />
            <br />
            <br />
            <input type="password" required placeholder="Password" />
            <br />
            <br />
            <button>Login</button>
            <br/><br/><hr/>
            <span>
                Don't have an account :
                <a href="javascript:void(0)" onClick={ShowSignup}> Signup </a>
            </span>
        </form>
    );
}

export default Login;
