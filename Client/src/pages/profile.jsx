import {
    ChatIcon,
    CheckCircleIcon,
    EmailIcon,
    StarIcon,
    WarningIcon
} from '@chakra-ui/icons'
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    List,
    ListItem,
    ListIcon
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/auth-redux/action';
import { getBoard } from '../redux/board-redux/action';

export default function Profile() {
    const dispatch = useDispatch();
    const { userData, isLoading, error } = useSelector(state => state.auth);
    const { boards } = useSelector(state => state.board);

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(getBoard());
    }, [dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <Tabs p="10px" variant="enclosed" colorScheme="teal" textAlign='left'>
            <TabList>
                <Tab _selected={{ color: 'white', bg: 'teal.400' }}>Account Info</Tab>
                <Tab _selected={{ color: 'white', bg: 'teal.400' }}>Boards History</Tab>
            </TabList>

            <TabPanels py="10px" >
                <TabPanel >
                    <List spacing={4}>
                        <ListItem display='flex' alignItems='center'>
                            <ListIcon as={EmailIcon} />
                            Email: {userData?.email || 'Loading...'}
                        </ListItem>
                        <ListItem display='flex' alignItems='center'>
                            <ListIcon as={ChatIcon} />
                            Name: {userData?.name || 'Loading...'}
                        </ListItem>
                        <ListItem display='flex' alignItems='center'>
                            <ListIcon as={StarIcon} />
                            Role: {userData?.role || 'Loading...'}
                        </ListItem>
                    </List>
                </TabPanel>
                <TabPanel>
                    <List spacing={4}>
                        {boards && boards.map((board) => (
                            <ListItem display='flex' alignItems='center'>
                                <ListIcon as={CheckCircleIcon} color="teal.400" />
                                {board.title}
                            </ListItem>

                        ))}
                    </List>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
