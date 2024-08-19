import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

function DropArea({ onDrop }) {
    const [showDrop, setShowDrop] = useState(false);

    return (
        <Box as='section'
            w='100%'
            h='100px'
            color='#dcdcdc'
            border='1px dashed #dcdcdc'
            borderRadius='10px'
            p='15px'
            mb='15px'
            onDrop={() => {
                onDrop();
                setShowDrop(false);
            }}
            opacity={showDrop ? '1' : '0'}
            transition='all 0.2s ease-in-out'
            onDragEnter={() => setShowDrop(true)}
            onDragLeave={() => setShowDrop(false)}
            onDragOver={(e) => e.preventDefault()}
        >
            Drop here
        </Box>
    );
}

export default DropArea;
