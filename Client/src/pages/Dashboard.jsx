import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from '../redux/board-redux/action';
import { createTask, getTasks, updateTaskStatus } from '../redux/task-redux/action'; // Imported updateTaskStatus
import TaskColumn from '../components/TaskColumn';

function Dashboard() {
  const [data, setData] = useState({});
  const [selectedBoard, setSelectedBoard] = useState('');
  const [page, setPage] = useState(1);  // Initialize page state
  const dispatch = useDispatch();
  const { boards } = useSelector(state => state.board);
  const { tasks, totalPages, currentPage } = useSelector(state => state.task);

  // Fetch boards when the component mounts
  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  // Fetch tasks whenever the selected board changes


  // Handle input changes for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle task creation and auto-select the board
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(data)).then(() => {
      if (data.boardId) {
        setSelectedBoard(data.boardId);
      }
    });
  };

  // Handle board selection change
  const handleSelectChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  // Handle task movement between columns
  const onDrop = (taskId, newStatus) => {
    dispatch(updateTaskStatus(taskId, newStatus));
  };


  useEffect(() => {
    if (selectedBoard) {
      dispatch(getTasks(selectedBoard, page));
    }
  }, [dispatch, selectedBoard, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box p={4}>
        <Flex justify="flex-start" align="center" w='100%' h="100%">
          <form style={{ display: 'flex', gap: '8px', width:'100%',alignItems: 'end', flexWrap: 'wrap' }} onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Task Name</FormLabel>
              <Input w='sm' type="text" name='title' onChange={handleChange} placeholder="Your new task name" />
            </FormControl>
            <FormControl flexBasis={['100%', '50%', '30%']} mr={[4, 6, 8]}>
              <FormLabel>Board</FormLabel>
              <Select name='boardId'w='sm' onChange={handleChange} placeholder='Select Board'>
                {boards && boards.map((board) => (
                  <option key={board._id} value={board._id}>{board.title}</option>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="teal" mt={[4, 6, 8]} w={'sm'}>
              Submit
            </Button>
          </form>
        </Flex>
      </Box>
      <Box display='flex' flexDir='column' p={4}>
        <Box as='section' display='flex' flexDir='column' gap={2}>
          <Text>Select the Board to get tasks</Text>
          <Select w='200px' placeholder='Select Board' value={selectedBoard} onChange={handleSelectChange}>
            {boards && boards.map((board) => (
              <option key={board._id} value={board._id}>{board.title}</option>
            ))}
          </Select>
          <hr style={{ width: '100%' }} />
        </Box>
        <Flex gap={4} p={4} mt={4} wrap='wrap' justifyContent='space-evenly'>
          <TaskColumn
            title="Pending"
            tasks={tasks.filter(task => task.status === 'pending')}
            onDrop={(taskId, status) => onDrop(taskId, status)}
            onCardClick={(id) => console.log('Card clicked:', id)}
          />
          <TaskColumn
            title="In Progress"
            tasks={tasks.filter(task => task.status === 'in-progress')}
            onDrop={(taskId, status) => onDrop(taskId, status)}
            onCardClick={(id) => console.log('Card clicked:', id)}
          />
          <TaskColumn
            title="Completed"
            tasks={tasks.filter(task => task.status === 'completed')}
            onDrop={(taskId, status) => onDrop(taskId, status)}
            onCardClick={(id) => console.log('Card clicked:', id)}
          />
        </Flex>
        <Flex justifyContent='center' mt={4} alignItems='center'>
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Text mx={4}>Page {currentPage} of {totalPages}</Text>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Dashboard;
