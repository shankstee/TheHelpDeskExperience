import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, TextField, Stack, initializeIcons, ITextFieldProps, Dropdown, Persona, Text, Image } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import NavMenu from "./sideNavMenu";
import Navbar from "./navbar";
import DisplayList from "./ticketCard";
import { FontWeights } from '@uifabric/styling';
import {IIconStyles,ITextStyles} from 'office-ui-fabric-react';
import {Link} from "react-router-dom";
// import {TicketCategory} from "./ticketCategoryOptions";
initializeIcons();

// interface ILoginProps  {

// }
interface ICreateOrUpdate {
    type: string;
    userObj: {
        "key": number,
        "subject": string,
        "department": string,
        "category": string,
        "comment": string,
        "userName": string
    };
}

const TicketForm: React.FC<ICreateOrUpdate> = (props) => {
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
    

    const {subject, department, category, comment, userName} = props.userObj;


    return (
        <React.Fragment>
            <Card  tokens={cardTokens} className="ticketCard animated fadeInLeft"  compact={false}>
                <Card.Item>
                    <Persona text={userName} secondaryText="Feb 2, 2019" />
                </Card.Item>
                <Card.Section>
                    <Text variant="small" styles={siteTextStyles}>
                        {category}
            </Text>
                    <Text styles={descriptionTextStyles}>{subject}</Text>
                    <Text variant="small" styles={helpfulTextStyles}>
                        {comment}
            </Text>
                </Card.Section>
                <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
                <PrimaryButton className="cardButton" text={props.type} />
                </Card.Section>
            </Card>

        </React.Fragment>
    )
}

export default TicketForm;