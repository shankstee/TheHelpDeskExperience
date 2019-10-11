import * as React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

const NavMenu: React.FunctionComponent = () => {

    const _onLinkClick = (ev: React.MouseEvent<HTMLElement>, item?: INavLink) => {
        if (item && item.name === 'News') {
            alert('News link clicked');
        }
    }
    return (
        <Nav
            onLinkClick={()=>_onLinkClick}
            selectedKey="key3"
            selectedAriaLabel="Selected"
            ariaLabel="Nav basic example"
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
                        // {
                        //     name: 'Home',
                        //     url: 'http://example.com',
                        //     expandAriaLabel: 'Expand Home section',
                        //     collapseAriaLabel: 'Collapse Home section',
                        //     links: [
                        //         {
                        //             name: 'Activity',
                        //             url: 'http://msn.com',
                        //             key: 'key1',
                        //             target: '_blank'
                        //         },
                        //         {
                        //             name: 'MSN',
                        //             url: 'http://msn.com',
                        //             disabled: true,
                        //             key: 'key2',
                        //             target: '_blank'
                        //         }
                        //     ],
                        //     isExpanded: true
                        // },
                        {
                            name: 'View my tickets',
                            url: 'http://example.com',
                            key: 'key3',
                            target: '_blank',
                            icon: 'TextDocumentShared'
                        },
                        {
                            name: 'Create ticket',
                            url: 'http://msn.com',
                            key: 'key4',
                            target: '_blank',
                            icon: 'ExploreContent'
                        },
                        {
                            name: 'Update ticket',
                            url: 'http://msn.com',
                            key: 'key5',
                            icon: 'Label'
                            
                        },
                        {
                            name: 'Delete ticket',
                            url: 'http://msn.com',
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
