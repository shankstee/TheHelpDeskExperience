import * as React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

const NavMenu: React.FunctionComponent = () => {

    // const _onLinkClick = (ev: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    //     if (item && item.name === 'News') {
    //         alert('News link clicked');
    //     }
    // }
    return (
        <Nav
            onLinkClick={()=>console.log("Read")}
            selectedKey="key3"
            selectedAriaLabel="Selected"
            ariaLabel="Nav basic left of screen"
            styles={{
                root: {
                    width: "15vw",
                    height: "95.9vh",
                    boxSizing: 'border-box',
                    border: '1px solid #484644',
                    overflowY: 'auto',
                    color: 'red',
                    borderTop: "none"
                }
            }}
            groups={[
                {
                    links: [
                        {
                            name: 'View my tickets',
                            url: '/dashboard/ViewAll',
                            key: 'key3',
                            // target: '_blank',
                            icon: 'TextDocumentShared'
                        },
                        {
                            name: 'Create ticket',
                            url: '/dashboard/createTicket',
                            key: 'key4',
                            // target: '_blank',
                            icon: 'ExploreContent'
                        },
                        {
                            name: 'Update ticket',
                            url: '/dashboard/updateTicket',
                            key: 'key5',
                            icon: 'Label'
                            
                        },
                        {
                            name: 'Delete ticket',
                            url: '/dashboard/deleteTicket',
                            key: 'key6',
                            target: '_blank',
                            icon: "RemoveFromShoppingList"
                        },
                    ]
                }
            ]}
        />
    );
};



export default NavMenu;
