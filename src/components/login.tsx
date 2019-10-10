import React from 'react';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

interface ILoginProps  {
    
}

const LoginPage: React.FC<ILoginProps> = (props) => {
    return (
        <div className="mainDiv">
            <h1>Welcome to Help Desk App</h1>
            <div className="buttonDiv">
                <PrimaryButton id="signUpButton" text="Sign Up"/>
                <DefaultButton id="loginButton" text="Login" />
                {/* <Icon iconName="CommentSolid" className="ms-CommentSolid" /> */}
            </div>
        </div>
    )
}

export default LoginPage;

// const el = <LoginPage title="Welcome!" paragraph="To this example" />