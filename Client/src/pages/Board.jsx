import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Heading,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tfoot,
    Tbody,
    Stack,
    Alert,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, getBoard } from '../redux/board-redux/action';

function Board() {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const { isLoading, boards } = useSelector(state => state.board);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createBoard(data));
        dispatch(getBoard());
    }

    useEffect(() => {
        dispatch(getBoard());
    }, [dispatch]);
    return (
        <>
            <Box p={4} display='flex' alignContent='left' >
                <Flex justify="flex-start" align="center" w='100%' h="100%" >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'end', width:'100%', flexWrap:'wrap' }}>
                        <FormControl  flexBasis={['100%', '50%', '30%']} mr={[4, 6, 8]}>
                            <FormLabel>Board Name</FormLabel>
                            <Input type="text" name='title' w='sm' onChange={handleChange} placeholder="Your new board name" />
                        </FormControl>
                        <FormControl  flexBasis={['100%', '50%', '30%']} mr={[4, 6, 8]}>
                            <FormLabel>Description</FormLabel>
                            <Input type="text" name='description'w='sm' onChange={handleChange} placeholder="Describe your board" />
                        </FormControl>
                        <Button type="submit" mt={[4, 6, 8]} colorScheme="teal" w='sm'>
                            Submit
                        </Button>
                    </form>

                </Flex>
            </Box>
            <Box display='flex' p={4} alignContent='left' flexDir='column'>
                <Heading fontSize='xl' mb={2}>List of Boards</Heading>
                <hr />
                <Stack mt={2}>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Board Name</Th>
                                    <Th display={{ base: 'none', md: 'table-cell' }}>Description</Th>
                                    <Th>Created By</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {boards && boards.map((board) => (

                                    <Tr>
                                        <Td>{board.title}</Td>
                                        <Td display={{ base: 'none', md: 'table-cell' }}>{board.description}</Td>
                                        <Td >{board.userId}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                {/* <Tr>
                                    <Th>To convert</Th>
                                    <Th>into</Th>
                                    <Th >multiply by</Th>
                                </Tr> */}
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Stack>
            </Box>
        </>
    );
}

export default Board;