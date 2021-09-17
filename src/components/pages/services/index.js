import { Box, Button, VStack, HStack, Text, Flex, useColorModeValue , Image, IconButton} from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import PageBody from "../../widgets/PageBody"
import Container from "../../widgets/Container"
import { BTN } from "../../widgets/ContactForm"

import Link from "../../widgets/Link"

import { createId } from "../../../utils/f"
import TextView from "../../widgets/TextView"
import { BTN_BG, BTN_COLOR, SOCIAL_LINKS } from "../../../utils/c"
import { FaBehance, FaComment, FaCommentAlt, FaGithub } from "react-icons/fa"
import FooterContactForm from "../../widgets/FooterContactForm"
import ViewAs from "../../widgets/ViewAs"
import SlantHeader from "../../widgets/SlantHeader"


export const H1 = ({children, ...props}) => {

    return (
        <Text as="h1" fontSize="36px" lineHeight="1.2" pt="16px" pb="24px" fontWeight="700" {...props}>{children}</Text>
    )
}

export const H2 = ({children, ...props}) => {

    return (
        <Text as="div" fontSize="36px" lineHeight="1.2" pt="16px" pb="1em" fontWeight="600" {...props}>{children}</Text>
    )
}

const NavButton = ({children, active, link, ...props}) => {
    const bg = useColorModeValue("#fff", "pageBg.dark")
    const color = useColorModeValue("pageColor.light", "pageColor.dark")

    const activeProps = {
        boxShadow: "0 4px 16px 0 rgb(28 32 37 / 10%)",
        fontWeight: "600",
        bg: `${bg} !important`,
        color: `${color} !important`
    }

    return (
        <ViewAs as={[Link, active? Button : "div"]} href={link || "#"} d="flex" flexDirection="column" justifyContent="center" 
        alignItems="center" w="100%" h="100%" p="40px 24px" transition="all .2s ease-out" fontWeight="400" 
        fontSize="16px" fontStyle="normal" fontStretch="normal" lineHeight="1.25" letterSpacing="normal" 
        textAlign="center" mb="3px !important" p="16px 12px" {...(active? activeProps : {})} 
        _hover={activeProps} {...props}>
            <Text whiteSpace="pre-wrap !important">{children}</Text>
        </ViewAs>
    )
}



const NavData = ({t, title, subtitle, desc, image, techs, buttonId, buttonText, ...props}) => {
    const bg = "#f0b528 !important"
    const color = "#fff !important" 
    
    const button = !buttonId || !buttonText? null :
    {
        data: SOCIAL_LINKS[buttonId],
        text: buttonText,
        icon: SOCIAL_LINKS[buttonId].getButton(35)
    }
    

    return (
        <VStack px={{base: "7px !important", md: "0px !important"}} pb={{base: "70px !important", md: "120px !important"}} w="100%" {...props}>
            <Flex w="100%" flexDirection={{base: subtitle? "column" : "column-reverse", md: subtitle? "row" : "row-reverse"}} 
            justifyContent={{base: "flex-start", md: "space-between"}} 
            alignItems={{base: "flex-start", md: "center"}}>
                <H2 maxW={{base: "100%", md: "420px"}} wordBreak="break-word">{title}</H2>
                <Image src={image} w={subtitle? "320px" : "70px"} h={subtitle? "auto" : "70px"}/>
            </Flex>
            <VStack justifyContent="flex-start" alignItems="flex-start">
                {subtitle? <H2>{subtitle}</H2> : null}
                <TextView>{desc}</TextView>
                {
                    !button? null:
                    <BTN as={Link} href={button.data.link} bg={bg} color={color} fontWeight="700" fontSize="17px" _hover={{
                        bg: "#32404e !important",
                        color: "#fff !important",
                        textDecoration: "none  !important",
                        opacity: "0.7"
                    }}>
                        <HStack justifyContent="flex-start" alignItems="center">
                            {
                                button.icon || <Image src={button.data.icon} w="35px" h="35px" mr="5px" />
                            }
                            <Text p="0px !important" textTransform="uppercase">{button.text}</Text>
                        </HStack>
                    </BTN>
                }
                {
                    (techs || []).length == 0? null:
                    <Text pt="1.5em" pb="1em" fontWeight="600">{t("common:techs")}</Text>
                }
                <HStack justifyContent="flex-start" alignItems="center" flexWrap="wrap">
                {
                    (techs || []).map((tech, index) => {
                        return <Tech {...tech} />
                    })
                }
                </HStack> 
            </VStack>
        </VStack>
    )
}

const Tech = ({name, image}) => {

    return (
        <VStack justifyContent="center" alignItems="center" px="7px">
            <Image src={image} w="40px" h="40px" />
            <Text fontSize="14px">{name}</Text>
        </VStack>
    )
}

const WorkProcess = ({image, title, desc}) => {
    const bg = useColorModeValue("#fff", "#fff")
    const color = useColorModeValue("#333", "#333")
    const shadow = useColorModeValue("0 4px 16px 0 rgb(28 32 37 / 10%)", "0 4px 16px 0 rgb(227 223 218 / 10%")

    return (
        <VStack w={{base: "100%", md: "50%"}} justifyContent="center" alignItems="center" transition="all .3s ease-out" p="24px 8px" 
        m="8px 0px !important" 
        _hover={{
            bg: `${bg} !important`,
            color: `${color} !important`,
            boxShadow: `${shadow}`
        }}>
            <Image src={image} w="96px" h="96px" />
            <Text lineHeight="1.25" fontSize="24px" pt=".75em" pb=".333em">{title}</Text>
            <Text maxW="368px" mx="auto" py=".5em">{desc}</Text>
        </VStack>
    )
}

const ServicesPage = ({servicesList, workProcessesList}) => {
    const { t } = useTranslation("services")

    const headerBg = useColorModeValue("pageBg.dark", "pageBg.dark")
    const headerBgSkew = useColorModeValue("pageBg.light", "pageBg.dark")
    const headerColor = useColorModeValue("pageColor.dark", "pageColor.dark")

    const navBg = useColorModeValue("navbarBg.light", "navbarBg.dark")

    const btnBg = BTN_BG
    const btnColor = BTN_COLOR

    
    const updatedForNav = (index) => {
        var temp = [...servicesList]
        temp[index].isCurrent = true
        return temp
    }

    const [nav, setNav] = useState(0)
    useEffect(() => {
        if(servicesList && servicesList.length > 0) {
            setServices(updatedForNav(nav))
        }
    }, nav)

    const [services, setServices] = useState(servicesList || [])
    useEffect(() => {
        setServices(servicesList && servicesList.length > 0? updatedForNav(nav) : [])
    }, servicesList)
    
    const [workProcesses, setWorkProcesses] = useState(workProcessesList || [])
    useEffect(() => {
        setWorkProcesses(workProcessesList || [])
    }, workProcessesList)


    return (
        <PageBody as={VStack} pt="0px !important" minHeight="150vh"
        link="/services" title={t('title')} url="/" description={t('desc')}
        justifyContent="flex-start" alignItems="flex-start">
            <SlantHeader bg={headerBg} bgInverse={headerBgSkew} color={headerColor} title={t('title')} desc={t('desc')} />
            <Container textAlign="left" pos="relative" zIndex="12">
                <HStack w="100%" justifyContent="flex-start" alignItems="flex-start">
                    <VStack w="176px" p="40px 24px" pos="sticky" top="120px" minH="700px" bg={navBg} d={{base: "none", md: "flex"}}>
                        {
                            services.map((v, index) => {
                                return (
                                    <NavButton key={`service-${index}`} active={v.isCurrent} link={`#${createId(v.title)}`} onClick={() => setNav(index)}>
                                        {v.title}
                                    </NavButton>
                                )
                            })
                        }
                    </VStack>
                    <VStack w={{base: "100%", md: "calc(100% - 288px)"}} ml={{base: "0px !important", md: "112px !important"}}>
                        {
                            services.map((v, index) => {
                                return (
                                    <NavData key={`service-data-${index}`} id={`${createId(v.title)}`} t={t} {...v} />
                                )
                            })
                        }
                    </VStack>
                </HStack>
            </Container>
            <Box w="100%" mt="35px !important" textAlign="left" pos="relative" bg={navBg}>
                <Container>
                    <H2 textAlign="center" alignSelf="center">{t("how-we-work")}</H2>
                    <HStack flexWrap="wrap" w="100%" justifyContent="flex-start" alignItems="center" p="0px !important">
                        {
                            (workProcesses || []).map((v, index) => {
                                return <WorkProcess key={`work-process-${index}`} {...v} />
                            })
                        }
                    </HStack>
                </Container>
            </Box>
            <Box mt="0px !important" w="100%" bg={headerBg} color={headerColor} py="40px !important">
                <Container>
                    <Flex flexDirection={{base: "column", md: "row"}} justifyContent={{base: "center", md: "space-between"}} 
                    alignItems={{base: "center", md: "center"}} textAlign={{base: "center !important", md: "left !important"}}>
                        <VStack justifyContent="center" alignItems={{base: "center", md: "flex-start"}}>
                            <H2>{t("our-projects")}</H2>
                            <Text>{t("our-projects-desc")}</Text>
                        </VStack>
                        <BTN as={Link} href={"/projects"} bg={btnBg} color={btnColor} fontWeight="700" fontSize="17px" pos="relative" minW="auto !important">
                            <HStack justifyContent="flex-start" alignItems="center" pos="relative">
                                <Text as="div" p="0px !important" textTransform="uppercase">{t("check-our-works")}</Text>
                            </HStack>
                        </BTN>
                    </Flex>
                </Container>
            </Box>
            <FooterContactForm services={services} />
        </PageBody>
    )
}

ServicesPage.Tech = Tech

export default ServicesPage