import { Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { register } from '../redux/auth-redux/action'
import { Link, Navigate } from 'react-router-dom'
const SignUp = () => {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const {isRegistered} = useSelector(state => state.auth);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(data));   
    }
    if(isRegistered){
        return <Navigate to={'/login'} />
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
                    <CardHeader textAlign='center'>
                        <Heading fontSize='lg' mb={3}>User Registration</Heading>
                    </CardHeader>
                    <CardBody >
                        <Stack textAlign='center' justifyContent='center'>
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                    <Box>
                                        <FormLabel>Email</FormLabel>
                                        <Input type='email' name='email' onChange={handleChange} />
                                    </Box>
                                    <Box>
                                        <FormLabel>Username</FormLabel>
                                        <Input type='text' name='name' onChange={handleChange} />
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
                    <CardFooter justifyContent='center'>
                        <Text fontSize='sm'>Already have an account? <Link to='/login' bg='teal'>Login</Link></Text>
                    </CardFooter>
                </Card>
            </Box>
        </>
    )
}

export default SignUp