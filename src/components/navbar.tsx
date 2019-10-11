import React, { useState, useEffect } from 'react';
import { Toggle, DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link, RouteComponentProps } from "react-router-dom";
initializeIcons();

// interface ILoginProps  {

// }
interface INavProps {
    // buttonText: string;
    // signingUp?: boolean;
    // handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
}



// export interface DetailsProps extends RouteComponentProps<{}> {}

const Navbar: React.FC<INavProps> = (props) => {

    const [userEmail, setEmail] = useState<string>("");
    const [userPassword, setPassword] = useState<string>("");
    // const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

    }, [])


    return (
        <React.Fragment>

            <div id="navbarDiv">
                <h3>The Helpdesk Experience</h3>
                <h4>Logout</h4>
            </div>

        </React.Fragment>
    )
}



export default Navbar;
