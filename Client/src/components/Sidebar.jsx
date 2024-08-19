import { List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import {AtSignIcon, CalendarIcon, EditIcon} from '@chakra-ui/icons'
function Sidebar() {
    return (
        <>
            <List color='white' fontSize='1.2em' textAlign='left' spacing={3}>
                <ListItem>
                    <NavLink to='/dashboard'>
                        <ListIcon as={CalendarIcon}/>
                        Dashboard
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to='/create'>
                    <ListIcon as={EditIcon}/>
                        Create Board
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to='/profile'>
                        <ListIcon as={AtSignIcon}/>
                        Profile
                    </NavLink>
                </ListItem>

            </List>
        </>
    )
}

export default Sidebar