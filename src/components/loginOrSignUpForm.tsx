import React, { useState, useEffect } from 'react';
import { Toggle, DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios"
initializeIcons();

// interface ILoginProps  {

// }
interface ISignInOrLogin {
    buttonText: string;
    signingUp?: boolean;
}

const SignUpForm: React.FC<ISignInOrLogin> = (props) => {

    const [userEmail, setUserEmail] = useState<string>();
    const [userPassword, setPassword] = useState<string>("");
    const [userAccount, setAccountType] = useState<boolean>(false);
    const handleToggle = (e: any): void => {
        setAccountType(!userAccount)
        console.log(userAccount);
        
        
    }

    // useEffect(() => {

    // }, [])




    // useEffect(() => {
    // fetch('http://localhost:5001/api/user')
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(error => console.log(error))
    //     axios.get('http://localhost:5001/api/user'
    // //     ,{
    // //     headers: {
    // //         'Content-Type': 'application/json',
    // //         'Access-Control-Allow-Origin': '*'
    // //     }
    // // }
    // ).then(response => { 
    //         console.log(response)

    //     })
    //     .catch(error => {
    //         console.log(error)
    //     });

    // fetch(`https://localhost:5001/api/user`,{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         email: "Shanks.trae@yahoo.com",
    //         password: "PASSWORD",
    //         accountType: true
    //     })
    // })
    //                 .then(response => response.json())
    //                 .then(body => {
    //                     console.log(body)

    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //     }, []);

    const handleInputOnchange = (e: any): void => {
        const target = e.target as HTMLTextAreaElement;
        if (target.name === "userEmail") {
            setUserEmail(target.value)
        } else if (target.name === "password") {
            setPassword(target.value)
        }
    }



    return (
        <div>
            <form className="animated pulse">
                <Stack>
                    {/* <input className="ms-TextField-field" onChange={e=>setUserEmail(e.target.value)}/> */}
                    <TextField
                        onChange={handleInputOnchange}
                        name="userEmail"
                        // value={userEmail}
                        className="loginOrSignUpInput"
                        label="E-mail"
                        description="Please provide a valid E-mail"
                        iconProps={{ iconName: 'NewMail' }}

                    />
                    <TextField
                        className="loginOrSignUpInput"
                        label="Password"
                        description="Password must be 6-10 characters long & contain one capitol letter"
                        iconProps={{ iconName: 'AuthenticatorApp' }}
                        name="password"
                        type="password"
                    />

                    {props.signingUp ? <Toggle label="Account Type:" inlineLabel onText="Team Member" offText="Helpdesk User" onChange={handleToggle} /> : null}
                    <div className="submitButtonDiv">
                        <Link to="/dashboard/ViewAll"><PrimaryButton id="submitSignUp" text={props.buttonText} /></Link>

                    </div>

                </Stack>
            </form>

        </div>
    )
}

// function _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
//     console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
// }


export default SignUpForm;
