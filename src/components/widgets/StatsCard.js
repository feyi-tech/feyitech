import { Box, Heading, useColorModeValue } from "@chakra-ui/react"



export default function StatsCard({icon, name, color, value, desc, ...props}) {

    return (
        <Box minW={{base: "250px", md: "30%"}} 
        bg={useColorModeValue("rgb(231, 227, 235)", "rgb(56, 50, 65)")}
        borderRadius={"24px"} color={color} overflow={"hidden"} pos="relative" 
        p="1px 1px 3px" mb="16px" {...props}>
            <Box w="100%" h="100%" overflow="inherit" borderRadius={"24px"}
            bg={useColorModeValue("rgb(255, 255, 255)", "rgb(rgb(39, 38, 44)")}>
                <Box p="24px">
                    <Box pos="absolute" top="24px" right="24px">{icon}</Box>
                    <Box d="flex" flexDirection="column" justifyContent="flex-end" alignItems="flex-start"
                    mt={{base: "0px", md: "64px"}} minH={{base: "0px", md: "168px"}} 
                    minW={{base: "150px", md: "200px"}} w="fit-content">
                        <Heading as="h2" fontSize={{base: "16px", md: "32px"}} fontWeight="600" 
                        lineHeight={{base: "1.5", md: "1.1"}} 
                        color={useColorModeValue("rgb(40, 13, 95)", "rgb(244, 238, 255)")} textAlign={"center"} mb="16px">
                            {value}
                        </Heading>
                        <Heading as="h2" fontSize={{base: "16px", md: "32px"}} fontWeight="600" 
                        lineHeight={{base: "1.5", md: "1.1"}} 
                        color={color} textAlign={"center"} mb="24px" textTransform="lowercase">
                            {name}
                        </Heading>
                        <Box color={useColorModeValue("rgb(122, 110, 170)", "rgb(184, 173, 210)")} fontSize="16px" fontWeight="400" lineHeight="1.5">{desc}</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}