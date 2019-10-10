import * as React from "react";
import LoginOrSignUp from "./loginOrSignUp";

export interface IUser {
    email: string;
    password: string;
}

const initState: IUser = {
    email: "",
    password: ""
}

export default class MainLoginForm extends React.Component<{}, IUser> {
    constructor({}) {
        super({});
        this.state = initState;
    }

    public render() {
        return (
            <div>
                <LoginOrSignUp/>
            </div>
        )

    }
    
}