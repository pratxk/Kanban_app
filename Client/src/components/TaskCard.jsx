import React from 'react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminDeleteTask } from '../redux/admin-redux/action';

const TaskCard = ({ task, onClick }) => {
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch()
  const onDeleteTask = (id) => {
    dispatch(adminDeleteTask(id));
  }
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task._id);
    e.dataTransfer.setData('status', task.status); // Store status in dataTransfer
  };

  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      w="100%"
      bg="white"
      boxShadow="sm"
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick(task._id)}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="md" fontWeight="bold">{task.title}</Text>
          <Text fontSize="sm" color="gray.600">{task.description}</Text>
        </Box>
        {role === 'admin' &&
          <IconButton
            icon={<DeleteIcon />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={(e) => {
              e.stopPropagation(); // prevent card click event from firing
              onDeleteTask(task._id); // call delete task function
            }}
          />
        }
      </Flex>
    </Box>
  );
};

export default TaskCard;
