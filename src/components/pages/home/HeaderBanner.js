import { Box, HStack, Image, useColorModeValue, VStack , Text} from "@chakra-ui/react";
import Float from "../../animations/Float";


const Style = () => {


    return (
        <style jsx global>{`
        .yellow-drop img {
            vertical-align: middle;
        }
        .yellow-drop .yellow-drop-1 {
            position: absolute;
            top: 0;
            left: calc(60px + 40%);
            z-index: 10;
            width: calc(80px + 6vw);
        }
        .yellow-drop .yellow-drop-2 {
            left: calc(195px + 20vw);
            padding: inherit;
            z-index: 10;
            max-height: 64%;
            min-height: calc(100px + 8vmax);
        }
        .yellow-drop .yellow-drop-3 {
            width: calc(100px + 13vw);
            position: absolute;
            bottom: -120px;
            left: 12%;
            z-index: 10;
        }
        .yellow-drop .i-mac {
            position: absolute;
            max-width: 100%;/*
            min-height: calc(200px + 10vmax);*/
            max-height: 95%;
            z-index: 11;
            left: -70px;
            top: calc(20px + 4vh);
        }
        .yellow-drop .i-phone {
            max-height: 68%;
            position: absolute;
            padding: inherit;
            z-index: 11;
        }
        [dir="rtl"] .yellow-drop .i-phone {
            left: 0;
        }
        .yellow-drop .rgh {
            padding-top: 2vh;
            overflow: visible;
            height: calc(calc(100vh - (5vh + calc(56px + 5vh) + 10vh + 30px)) - 5vh - 50px);
            position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
        }
        `}</style>
    )
}

export default function HeaderBanner({img1, img2, drop1, drop2, drop3, title, desc, ...props}) {
    
    const subColor = useColorModeValue("pageColor.light", "pageColor.dark")

    return (
        <HStack alignItems="flex-start" minH="400px" p={{base: "40px 0 0 0 !important", md: "40px 0 0 0 !important"}} m="0 auto !important" h="calc(100vh - (5vh + calc(56px + 5vh) + 10vh + 30px))" 
            w="100%" pos="relative"
            _before={{
                display: "table",
                content: "''"
            }}
            _after={{
                clear: "both"
            }} {...props} className="yellow-drop">
            <Box w={{base: "100%", md: "40%"}} h="100%" pos="relative" display={{base: "none", md: "block"}}>
                <Image src={drop1} className="yellow-drop-1" />
                <Image src={drop3} className="yellow-drop-3" />
                <Float as={Image} src={img1} className="i-mac" />
            </Box>
            <Box w={{base: "100%", md: "60%"}} className="rgh" h="100%">
                <Text as="h1" color="#3929c5" fontSize={{base: "1.8rem", md: "2.8rem"}} fontWeight="bold" textTransform="uppercase" 
                pos="relative"
                lineHeight="calc(1em + 0.5vh)" m="initial" mb={{base: "1.5rem", md: "3.5rem"}} zIndex="12" maxWidth="calc(50rem + 5vw)" 
                textAlign={{base: "center", md: "left"}}>
                    {title}
                </Text>
                <Text mx={{base: "5px", md: "0px"}} color={subColor} 
                p={{base: "5px", md: "0px"}} as="p" maxW="28rem" fontSize={{base: "0.9rem", md: "1.2rem"}} lineHeight="1.8" zIndex="12" pos="relative"
                textAlign={{base: "center", md: "left"}}>{desc}</Text>
                <Image src={drop2} className="yellow-drop-2" pos={{base: "absolute"}} top={{base: "calc(1vh)", md: "calc(50px + 5vh)"}} />
                <Float as={Image} src={img2} className="i-phone" 
                top={{base: "calc(150px + 7vh)", md: "calc(88px + 7vh)"}}
                left={{base: "calc(100vw - 200px)", md: "calc(250px + 7vw);"}}
                minH={{base: "calc(150px + 8vmax)"}} />
            </Box>
            <Style />
        </HStack>
    )
} 