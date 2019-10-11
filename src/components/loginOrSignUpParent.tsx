import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import LoginOrSignUpForm from "./loginOrSignUpForm";
import Navbar from "./navbar";
// import SignUpForm from "./signUpForm";

interface ILoginProps {
    // login: ()=>void;
}


const LoginPage: React.FC<ILoginProps> = (props) => {

    const [signUpBoolean, setSignUp] = useState<boolean>(false);
    const [loginBoolean, setLogin] = useState<boolean>(false);



    return (
        <React.Fragment>
            <Navbar/>

            <div className="mainDiv">
                {
                    signUpBoolean
                        ? <LoginOrSignUpForm buttonText={"Sign Up"} signingUp={true} />
                        : loginBoolean
                            ? <LoginOrSignUpForm buttonText={"Login"} />
                            : <div>
                                <h1>Please login or create an account</h1>
                                <div className="buttonDiv">
                                    <PrimaryButton id="signUpButton" text="Sign Up" onClick={() => setSignUp(true)} />
                                    <DefaultButton id="loginButton" text="Login" onClick={() => setLogin(true)} />
                                    {/* <Icon iconName="CommentSolid" className="ms-CommentSolid" /> */}
                                </div>
                            </div>
                }
            </div>
        </React.Fragment>
    )
}

export default LoginPage;

// const el = <LoginPage title="Welcome!" paragraph="To this example" />