import { Box, Button, Card, CardBody, CardFooter, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { login } from '../redux/auth-redux/action'
import { Navigate } from 'react-router-dom'
const Login = () => {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.auth);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(data));   
    }
    if(isAuthenticated){
        return <Navigate to={'/dashboard'} />
      }
    return (
        <>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minH='100vh'  // Ensures full screen height
                bg='gray.50'  // Optional: Adds background color
                padding={4}>
                <Card w='md' maxW='md' minW='sm' boxShadow='xl' border='1px' borderColor='gray.300'>
                    <CardBody>
                        <Heading fontSize='lg' mb={3}>User Login</Heading>
                        <Stack>
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                    <Box>
                                        <FormLabel>Email</FormLabel>
                                        <Input type='email' name='email' onChange={handleChange} />
                                    </Box>
                                    <Box>
                                        <FormLabel>Password</FormLabel>
                                        <Input type='password' name='password' onChange={handleChange} />
                                    </Box>
                                </FormControl>
                                <Button mt={3} colorScheme='teal' type='Submit'>Submit</Button>
                            </form>
                        </Stack>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default Login