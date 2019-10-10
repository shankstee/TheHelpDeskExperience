import * as React from "react";
import LoginOrSignUp from "./loginOrSignUp";

// export interface IUser {
//     email: string;
//     password: string;
// }

// const initState: IUser = {
//     email: "",
//     password: ""
// }
// interface ILoginProps  {
//     buttonText: string;

// }

export default class MainLoginForm extends React.Component {
    // constructor({}) {
    //     super({});
    //     // this.state = initState;
    // }

    public render() {
        return (
            <div>
                <LoginOrSignUp/>
            </div>
        )

    }
    
}