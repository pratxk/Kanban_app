import { Box, Button, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <>
     <Box
      minH="100vh"
      bgGradient="linear(to-r, gray.300, yellow.200)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        columns={1}
        spacing={10}
        alignItems="center"
        justifyContent="center"
      >
        <Image
          h="30%"
          w='100%'
          src="https://static.vecteezy.com/system/resources/previews/011/884/040/original/siver-welcome-on-banner-vector.jpg"
          alt="Logo"
        />
        <Heading as="h1" fontSize="4xl" color="gray.800">
          Welcome to Our KanBan App!
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Get started with our amazing kanban Board's features and tools.
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
      </SimpleGrid>
    </Box>
    </>
  )
}

export default Home