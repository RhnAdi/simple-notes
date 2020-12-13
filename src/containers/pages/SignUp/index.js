import React, { useState } from "react";
import emailIcon from "./../../../assets/images/icons/email.svg";
import passwordIcon from "./../../../assets/images/icons/password.svg";
import {Button} from "./../../../components/atoms";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signUpUser } from "./../../../config/redux/action"

function SignUp ({isLoading, signUpUser}) {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    const SignUpMethod = () => {
        signUpUser({email, password})
        .then((res) => {
            // console.log("res SignUp ===>", res)
            localStorage.setItem("user", JSON.stringify(res));
            setEmail("");
            setPassword("");
            history.push("/")
        })
        .catch((error) => {
            setErrorMessage(error.errorMessage);
        })
    }

    return (
        <div className="auth">
            <div className="auth-box">
                <p className="title-auth">Sign Up</p>
                {
                    errorMessage && <p className="error">{errorMessage}</p>
                }
                <div className="form">
                    <div className="email">
                        <div className="email-icon-box">
                            <img src={emailIcon} className="email-icon" alt="img" />
                        </div>
                        <input placeholder="Email" onChange={changeEmail} value={email} />
                    </div>
                    <div className="password">
                        <div className="password-icon-box">
                            <img src={passwordIcon} className="password-icon" alt="imgs" />    
                        </div>
                        <input type="password" placeholder="Password" onChange={changePassword} value={password} />
                    </div>
                    <div className="action">
                        <div className="button">
                            <Button text="Sign Up" background="bg-primary" action={SignUpMethod} disable={isLoading} />
                        </div>
                        <br></br>
                        <p>
                            Already have an account?  
                            <Link to="/SignIn" style={{color: "lightblue"}}>
                                SignIn here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading : state.isLoading,
})
const mapDispatchToProps = (dispatch) => ({
    signUpUser : (data) => dispatch(signUpUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);