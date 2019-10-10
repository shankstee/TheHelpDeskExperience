import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, TextField, Stack, initializeIcons } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
initializeIcons();

// interface ILoginProps  {

// }
export interface ILoginProps  {
    buttonText: string;

}



const SignUpForm: React.FC<ILoginProps> = (props) => {

    // const [signUp, setSignUp] = useState<boolean>(false);
    // const [login, setLogin] = useState<boolean>(false);
    



    return (
        <div>
            <form>
                <Stack>
                    <TextField
                        className="loginOrSignUpInput"
                        label="E-mail"
                        description="Please provide a valid E-mail"
                        iconProps={{ iconName: 'NewMail' }}
                        // onRenderDescription={this._onRenderDescription}
                    />
                    <TextField
                        className="loginOrSignUpInput"
                        label="Password"
                        description="Password must be 6-10 characters long & contain one capitol letter"
                        // onRenderDescription={this._onRenderDescription}
                        iconProps={{ iconName: 'AuthenticatorApp' }}
                    />
                    <div className="submitButtonDiv">
                        <PrimaryButton id="submitSignUp" text={props.buttonText}/>
                    </div>
                    
                </Stack>
            </form>

        </div>
    )
}

export default SignUpForm;
