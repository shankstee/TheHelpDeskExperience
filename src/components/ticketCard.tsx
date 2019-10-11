import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps, Dropdown, Persona, Text, Image } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import NavMenu from "./sideNavMenu";
import Navbar from "./navbar";
import DisplayList from "./ticketCard";
import { FontWeights } from '@uifabric/styling';
import {IIconStyles,ITextStyles} from 'office-ui-fabric-react';
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

    const cardTokens: ICardTokens = { childrenMargin: 12 };

    const siteTextStyles: ITextStyles = {
        root: {
            color: '#025F52',
            fontWeight: FontWeights.semibold
        }
    };
    const descriptionTextStyles: ITextStyles = {
        root: {
            color: '#333333',
            fontWeight: FontWeights.semibold
        }
    };
    const helpfulTextStyles: ITextStyles = {
        root: {
            color: '#333333',
            fontWeight: FontWeights.regular
        }
    };
    const iconStyles: IIconStyles = {
        root: {
            color: '#0078D4',
            fontSize: 16,
            fontWeight: FontWeights.regular
        }
    };
    const footerCardSectionStyles: ICardSectionStyles = {
        root: {
            borderTop: '1px solid #F3F2F1'
        }
    };

    const footerCardSectionTokens: ICardSectionTokens = { padding: '12px 0px 0px' };
    



    return (
        <React.Fragment>
            <Card  tokens={cardTokens} className="ticketCard">
                <Card.Item>
                    <Persona text="Trae Shanks" secondaryText="Feb 2, 2019" />
                </Card.Item>
                {/* <Card.Item fill>
                    <Image src="https://placehold.it/256x144" width="100%" alt="Placeholder image." />
                </Card.Item> */}
                <Card.Section>
                    <Text variant="small" styles={siteTextStyles}>
                        Network
            </Text>
                    <Text styles={descriptionTextStyles}>Contoso Denver expansion design marketing hero guidelines</Text>
                    <Text variant="small" styles={helpfulTextStyles}>
                        Is this recommendation helpful?
            </Text>
                </Card.Section>
                <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
                <PrimaryButton className="cardButton" text={"Edit Ticket"} />
                    {/* <Icon iconName="RedEye" styles={iconStyles} />
                    <Icon iconName="SingleBookmark" styles={iconStyles} />
                    <Stack.Item grow={1}>
                        <span />
                    </Stack.Item>
                    <Icon iconName="MoreVertical" styles={iconStyles} /> */}
                </Card.Section>
            </Card>

        </React.Fragment>
    )
}

export default TicketForm;