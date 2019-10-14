import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps,  IDropdownOption ,Dropdown } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import NavMenu from "./sideNavMenu";
import Navbar from "./navbar";
// import {TicketCategory} from "./ticketCategoryOptions";
initializeIcons();

// interface ILoginProps  {

// }
interface ICreateOrUpdate {
    type: "Create" | "Update"
}



const TicketForm: React.FC<ICreateOrUpdate> = (props) => {

    const [subject, setSubject] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [category, setCategory] = useState<string>("Networking");
    const [comment, setComment] = useState<string>("");
    const [userId, setUserId] = useState<number>(1);

    



    const handleCreateTicket = () => {
        let URL;
        let method;
        let body;

        if(props.type === "Create"){
            URL = `https://localhost:5001/api/ticket`
            method = "POST"
            body = JSON.stringify({
                subject,
                department,
                category,
                comment,
                userId
            })
        } else {
            URL = `https://localhost:5001/api/ticket/${userId}`
            method ="PUT"
            body = JSON.stringify({
                id:userId,
                subject,
                department,
                category,
                comment,
                userId
            })
        }

        console.log(body)


        fetch("https://localhost:5001/api/ticket/1", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:userId,
                subject,
                department,
                category,
                comment,
                userId
            })
        })
            .then(response => response.json())
            .then(body => {
                console.log(body)
                alert("Ticket Created!")
                setSubject("")
                setDepartment("")
                setComment("")


            })
            .catch((err) => {
                console.log(err);
                alert("Please check your inputs, a error occurred.")
            });
    }

    const handleDropdown = (e: any): void => {
        const target = e.target as HTMLDivElement;
        console.log(target)
    }

    const handleInputOnchange = (e: any): void => {
        const target = e.target as HTMLTextAreaElement;
        switch (target.name) {
            case "subject":
                setSubject(target.value);
                break;
            case "department":
                setDepartment(target.value);
                break;
            case "comment":
                setComment(target.value);
                break;
        }
        


    }




    return (
        <React.Fragment>

            <form className="animated fadeInUp">
                <Stack>
                    <h1>{props.type} Support Ticket</h1>
                    <div className="flexInputs">
                        <TextField label="Subject" required name="subject" onChange={handleInputOnchange} value={subject}/>
                        <TextField label="Department" required name="department" onChange={handleInputOnchange} value={department}/>
                        <Dropdown
                            required
                            id="categoryDropdown"
                            placeholder="Select a category"
                            label="Category"
                            options={[
                                { key: 'Hardware', text: 'Hardware' },
                                { key: 'Networking', text: 'Networking' },
                                { key: 'Software', text: 'Software' },
                                { key: 'User Auth', text: 'User Auth' },
                                { key: 'Other', text: 'Other' }
                            ]}
                        />
                    </div>
                    <TextField label="With auto adjusting height" name="comment" value={comment} multiline autoAdjustHeight onChange={handleInputOnchange} />
                    <div className="ticketButtonDiv">
                        <PrimaryButton className="submitTicket" text={props.type} onClick={handleCreateTicket} />
                    </div>


                </Stack>
            </form>


        </React.Fragment>
    )
}

export default TicketForm;