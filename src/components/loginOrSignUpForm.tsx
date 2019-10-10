import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
initializeIcons();

// interface ILoginProps  {

// }
interface ISignInOrLogin  {
    buttonText: string;
    // handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
}



const SignUpForm: React.FC<ISignInOrLogin> = (props) => {

    const [userEmail, setEmail] = useState<string>("");
    const [userPassword, setPassword] = useState<string>("");
    // const emailInputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <form>
                <Stack>
                    <TextField
                        className="loginOrSignUpInput"
                        label="E-mail"
                        description="Please provide a valid E-mail"
                        iconProps={{ iconName: 'NewMail' }}
                        // ref={emailInputRef}
                        // onChange={}
                        // onRenderDescription={this._onRenderDescription}
                    />
                    <TextField
                        className="loginOrSignUpInput"
                        label="Password"
                        description="Password must be 6-10 characters long & contain one capitol letter"
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
