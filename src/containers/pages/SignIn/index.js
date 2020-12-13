import React, { useState } from "react";
import emailIcon from "./../../../assets/images/icons/email.svg";
import passwordIcon from "./../../../assets/images/icons/password.svg";
import { Button } from "./../../../components/atoms";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signInUser } from "./../../../config/redux/action"

function SignIn ({isLoading, signInUser}) {
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
    const signIn = () => {
        signInUser({email, password})
        .then((res)=>{
            // console.log("Sign In Response ===>", res);
            localStorage.setItem("user", JSON.stringify(res));
            setEmail("");
            setPassword("");
            history.push("/");
        })
        .catch((error) => {
            setErrorMessage(error.errorMessage);
        })
    }
    return (
        <div className="auth">
            <div className="auth-box">
                <p className="title-auth">Sign In</p>
                {
                    errorMessage && <p className="error">{errorMessage}</p>
                }
                <div className="form">
                    <div className="email">
                        <div className="email-icon-box">
                            <img src={emailIcon} className="email-icon" alt="img" />
                        </div>
                        <input placeholder="Email" value={email} onChange={changeEmail} />
                    </div>
                    <div className="password">
                        <div className="password-icon-box">
                            <img src={passwordIcon} className="password-icon" alt="img" />    
                        </div>
                        <input placeholder="Password" value={password} onChange={changePassword} />
                    </div>
                    <div className="action">
                        <div className="button">
                            <Button text="Sign In" background="bg-primary" action={signIn} disable={isLoading} />
                        </div>
                        <br></br>
                        <p>Don't have an account? <Link to="/SignUp" style={{color: "lightblue"}}>SignUp here</Link></p>
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
    signInUser : (data) => dispatch(signInUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);