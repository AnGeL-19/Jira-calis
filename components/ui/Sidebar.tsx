import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useContext } from 'react'

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlined from '@mui/icons-material/MailOutlineOutlined';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox','Starred','Send Email','Drafts']

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer
      anchor="left"
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
        <Box>
            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant="h4">
                    Menu
                </Typography>
            </Box>  
            <List>
                    {
                        menuItems.map( (text, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlined/> }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItem>
                        ))
                    }
                </List>

                <Divider />
                <List>
                    {
                        menuItems.map( (text, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon>
                                    { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlined/> }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItem>
                        ))
                    }
                </List> 
        </Box>
      
    </Drawer>
  )
}
