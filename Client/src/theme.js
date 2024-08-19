import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans'
import '@fontsource/raleway'
import '@fontsource/poppins'

const theme = extendTheme({
    fonts: {
        heading: `'Poppins'`,
        body: `'Poppins'`,

    },
})

export default theme