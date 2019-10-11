import React, { useState, useEffect } from 'react';
import { Toggle, DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link, RouteComponentProps } from "react-router-dom";
initializeIcons();


const Navbar: React.FC = (props) => {

    const [userEmail, setEmail] = useState<string>("");
    const [userPassword, setPassword] = useState<string>("");
    const logout = () => {
        
    }
    // const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

    }, [])


    return (
        <React.Fragment>

            <div id="navbarDiv">
                <h3>The Helpdesk Experience</h3>
            <Link to="/"> <h4>Logout</h4></Link>
            </div>

        </React.Fragment>
    )
}



export default Navbar;
