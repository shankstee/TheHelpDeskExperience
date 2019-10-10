import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import LoginForm from "./loginForm";
import SignUpForm from "./signUpForm";


const LoginPage: React.FC = (props) => {

    const [signUpBoolean, setSignUp] = useState<boolean>(false);
    const [loginBoolean, setLogin] = useState<boolean>(false);



    return (
        <div className="mainDiv">
            {
                signUpBoolean 
                ? <SignUpForm buttonText={"Sign Up"}/> 
                : loginBoolean 
                ? <LoginForm buttonText={"Login"}/> 
                :  <div>
                        <h1>Welcome to Help Desk App</h1>
                        <div className="buttonDiv">
                            <PrimaryButton id="signUpButton" text="Sign Up" onClick={() => setSignUp(true)} />
                            <DefaultButton id="loginButton" text="Login" onClick={() => setLogin(true)} />
                            {/* <Icon iconName="CommentSolid" className="ms-CommentSolid" /> */}
                        </div>
                    </div>
            }
        </div>
    )
}

export default LoginPage;

// const el = <LoginPage title="Welcome!" paragraph="To this example" />