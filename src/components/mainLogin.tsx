import * as React from "react";
import LoginOrSignUp from "./loginOrSignUpParent";
import CreateOrUpdateTicketForm from "./createOrUpdateTicketForm";

// export interface IUser {
//     email: string;
//     password: string;
// }

// const initState: IUser = {
//     email: "",
//     password: ""
// }
interface ILoginProps {
    // buttonText: string;
}

const MainComponent: React.FC<ILoginProps> = props => {

    return (
        <div>
            
            <LoginOrSignUp />
        </div>
    )

}

export default MainComponent;