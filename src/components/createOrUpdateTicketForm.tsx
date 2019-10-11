import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps, Dropdown } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import NavMenu from "./sideNavMenu";
import Navbar from "./navbar";
// import {TicketCategory} from "./ticketCategoryOptions";
initializeIcons();

// interface ILoginProps  {

// }
interface ICreateOrUpdate {
    type:  "Create" | "Update"
}



const TicketForm: React.FC<ICreateOrUpdate> = (props) => {

    // const [userEmail, setEmail] = useState<string>("");
    // const [userPassword, setPassword] = useState<string>("");
    // const emailInputRef = useRef<HTMLInputElement>(null);



    return (
        <React.Fragment>

            <form className="animated fadeInUp">
                <Stack>
                    <h1>Create New Support Ticket</h1>
                    <div className="flexInputs">
                        <TextField label="Subject" required />
                        <TextField label="Department" required />
                        <Dropdown
                            required
                            id="categoryDropdown"
                            placeholder="Select a category"
                            label="Category"
                            options={[
                                { key: 'A', text: 'Hardware' },
                                { key: 'B', text: 'Networking' },
                                { key: 'C', text: 'Software' },
                                { key: 'D', text: 'User Auth' },
                                { key: 'E', text: 'Other' }
                            ]}
                        />
                    </div>
                    <TextField label="With auto adjusting height" multiline autoAdjustHeight />
                    <div className="ticketButtonDiv">
                        <PrimaryButton className="submitTicket" text={props.type} />
                    </div>


                </Stack>
            </form>


        </React.Fragment>
    )
}

export default TicketForm;