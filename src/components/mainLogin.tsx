import * as React from "react";
import LoginOrSignUp from "./loginOrSignUpParent";
import CreateOrUpdateTicketForm from "./createOrUpdateTicketForm";
import Navbar from "./navbar";

const MainComponent: React.FC = props => {

    return (
        <div>
            <LoginOrSignUp />
        </div>
    )

}

export default MainComponent;