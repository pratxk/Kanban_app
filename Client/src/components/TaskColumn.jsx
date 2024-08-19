import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onDrop, onCardClick }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const status = title.toLowerCase().replace(' ', '-'); // Map title to status
    onDrop(taskId, status); // Call onDrop with taskId and new status
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      w="100%"
      maxW='300px'
      minH="300px"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Text fontSize="lg" mb={4} fontWeight="bold">{title}</Text>
      <VStack spacing={4}>
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onClick={onCardClick}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default TaskColumn;
