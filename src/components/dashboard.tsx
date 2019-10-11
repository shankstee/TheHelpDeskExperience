import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps, Dropdown } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import NavMenu from "./sideNavMenu";
import Navbar from "./navbar";
import DisplayList from "./ticketCard";
import staticData from "../staticData/helpdeskTickets.json"
// import {TicketCategory} from "./ticketCategoryOptions";
initializeIcons();

// interface ILoginProps  {

// }
interface ICreateOrUpdate {
}



const TicketForm: React.FC<ICreateOrUpdate> = (props) => {

    // const [userEmail, setEmail] = useState<string>("");
    // const [userPassword, setPassword] = useState<string>("");
    // const emailInputRef = useRef<HTMLInputElement>(null);



    return (
        <React.Fragment>
            <Navbar/>
            <div className="mainDashboardDiv">
                <NavMenu />
                <div id="dashboardMain">
                    
                    {staticData.map(item=>{
                        return <DisplayList />
                    })}
                    
                    
                    
                </div>
            </div>

        </React.Fragment>
    )
}

export default TicketForm;