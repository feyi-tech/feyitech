import { Box, useColorModeValue } from "@chakra-ui/react"

export default function HomeTaping({...props}) {

    return (
        <Box as="svg" viewBox="0 0 1660 339" width="100%" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M804 167.023C520.5 167.023 267.5 290.522 0 304.5V339H1660V0.5C1358.83 0.5 1104 167.023 804 167.023Z" 
            fill={useColorModeValue("url(#paint0_linear_light)", "url(#paint0_linear_dark)")}>
            </path>
            <defs>
                <linearGradient id="paint0_linear_light" x1="830" y1="84" x2="830" y2="339" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.48"></stop>
                    <stop offset="0.566389" stopColor="white" stopOpacity="0.35"></stop>
                    <stop offset="1" stopColor="white"></stop>
                </linearGradient>
                <linearGradient id="paint0_linear_dark" x1="830" y1="83.5" x2="830" y2="338.5" 
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#08060B" stopOpacity="0.2"></stop>
                    <stop offset="0.545554" stopColor="#08060B" stopOpacity="0.5"></stop>
                    <stop offset="1" stopColor="#08060B"></stop>
                </linearGradient>
            </defs>
        </Box>
    )
}