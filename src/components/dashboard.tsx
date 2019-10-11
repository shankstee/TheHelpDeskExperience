import React, { useState, useEffect } from 'react';
import { DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps, Dropdown } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import NavMenu from "./sideNavMenu";
import Navbar from "./navbar";
import DisplayList from "./ticketCard";
import CreatTicket from "./createOrUpdateTicketForm";
import staticData from "../staticData/helpdeskTickets.json";
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
initializeIcons();


interface IDetailProps extends RouteComponentProps<{ dashType: string }> {
    

}

const TicketForm: React.FC<IDetailProps> = (props) => {

    const [styleId, setStyleId] = useState<string>("");
    const { dashType } = props.match.params;

    useEffect(()=>{
        if (dashType === "ViewAll" || dashType === "deleteTicket") {
            setStyleId("dashboardMain");
        } else if (dashType === "createTicket" || dashType === "updateTicket") {
            setStyleId("dashboardMainCreate");
        } 
        
    },[])

    return (
        <React.Fragment>
            <Navbar />
            <div className="mainDashboardDiv">
                <NavMenu />
                <div id={`${styleId}`}>
                    {
                        dashType === "ViewAll" ? 

                        staticData.map(item => {
                            return <DisplayList type="Edit" userObj={item}/>
                        })
                    : dashType === "createTicket" ? <CreatTicket type={"Create"}/> 

                    : dashType === "updateTicket" ? <CreatTicket type={"Update"}/>

                    : dashType === "deleteTicket" ? 
                    
                    staticData.map(item => {
                        return <DisplayList type="Delete" userObj={item}  />
                    })
                    :
                    null
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

export default TicketForm;