import React from 'react';
import { Box, Button, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth-redux/action';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector(state => state.auth.role);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/login');
        });
    };

    return (
        <>
            <Flex as={'nav'} p={'10px'} wrap='wrap' mb="10px" alignItems='center' boxShadow='md'>
                <Heading>Board Tasks</Heading>
                <Spacer />
                <HStack spacing='20px'>
                    {role === 'user' && (
                        <>
                            <Link to='/create-board'>
                                <Box>New Board</Box>
                            </Link>
                            <Link to='/dashboard'>
                                <Box>Dashboard</Box>
                            </Link>
                        </>
                    )}
                    <Link to='/profile'>
                        <Box>Profile</Box>
                    </Link>
                    {role === 'admin' && (
                        <>
                            <Link to='/admin-panel'>
                                <Box>Admin Tasks</Box>
                            </Link>
                        </>
                    )}
                    <Button colorScheme='teal' onClick={handleLogout}>Log Out</Button>
                </HStack>
            </Flex>
        </>
    );
}

export default Navbar;
