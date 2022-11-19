import { Box, Button, VStack, HStack, Text, Flex, useColorModeValue , Image} from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import PageBody from "../../widgets/PageBody"
import Container from "../../widgets/Container"

import Link from "../../widgets/Link"
import { colors } from "../../../../theme"
import HeaderBanner from "./HeaderBanner"
import Card from "../../widgets/Card"
import HomeTaping from "../../svg/HomeTaping"

const bannerImage1 = "/images/banner-comp.png"//"/images/web-builder2.svg"
const bannerImage2 = "/images/banner-mobile.png"

const drop1 = "/images/drop-top-left.png"
const drop2 = "/images/drop-top-right.png"
const drop3 = "/images/drop-bottom-left.png"



const Project = ({id, priority, screenshot, title, link, name, desc, feedback, feedbackAuthor, feedbackAuthorPhoto, forSale, listedAt, completedAt, costPrice, sellingPrice}) => {
    const border = `1px solid ${useColorModeValue(colors.border.light, colors.border.dark)}`

    return (
        <Box w={{base: "100%", md: "50%"}} pr="15px" pb="15px">
            <Card w="100%">
                <Image src={screenshot} w="100%" h="auto" />
                <VStack pl="20px" p="25px 0 15px 0" justifyContent="flex-start" alignItems="flex-start">
                    <Box h="50px" textAlign="left" m="0 0 15px 0" fontSize="1.3rem" fontWeight="bold" lineHeight="1.1">
                        {title}
                    </Box>
                    <Box w="100%" h="64px" borderTop={border} textTransform="uppercase" p="24px 0" textAlign="left">
                        <Link href={link} isExternal={!link.startsWith("/")} hoverMode fontWeight="bold">{name}</Link>
                    </Box>
                    <Text textAlign="left" h="100px">
                        {desc}
                    </Text>
                </VStack>
            </Card>
        </Box>
    )
}

const HomePage = ({projectsList}) => {
    const { t } = useTranslation("home")
    const homeBg = useColorModeValue('homeBg.light', 'homeBg.dark')
    const homeBg2 = useColorModeValue("homeBg2.light", "homeBg2.dark")

    const [projects, setProjects] = useState(projectsList || [])
    useEffect(() => {
        setProjects(projectsList || [])
    }, projectsList)
    
    return (
        <PageBody as={VStack} pt="0px !important" enableMobileStick={false}
        link="/" title={t('common:title')} description={t('common:sitedesc')}
        justifyContent="flex-start" alignItems="flex-start" pos="relative">
            <HeaderBanner img1={bannerImage1}
            img2={bannerImage2} drop1={drop1} drop2={drop2} drop3={drop3} 
            title={t("common:title")} desc={t("common:sitedesc")} 
            mb={{base: "55px !important", md: "75px !important"}} />
            
            <Box w="100%" position="relative">
                <Box pos="absolute" zIndex="0" overflow="hidden" w="100%" h="100%" 
                left="0" bottom="0">
                    <Box pos="absolute" bottom="3px" w="100%">
                        <HomeTaping alignSelf={"center"} flexShrink="0" 
                        fill={useColorModeValue("rgb(40, 13, 95)", "rgb(244, 238, 255)")} />
                    </Box>
                </Box>

                <Container textAlign="left" pos="relative" bg="transparent !important">
                    <VStack w={{base: "100%", md: "50%"}} 
                    justifyContent="flex-start" alignItems="flex-start">
                        <Text as="p" fontWeight="600">
                            {t("done-projects")}
                        </Text>
                        <Text as="h2" fontSize={{base: "1.5rem", md: "2.2rem"}} 
                        textTransform="uppercase" 
                        color="#27C827" lineHeight="1.1" m="0px !important" 
                        mb={{base: "35px !important", md: "55px !important"}} 
                        fontWeight="bold">
                            {t("done-softwares")}
                        </Text>
                    </VStack>
                </Container>
                
                <Box w="100%" bg={homeBg2} mt="0.5rem">
                    <Container textAlign="left" pos="relative" bg="transparent !important">
                        <Flex w="100%" flexWrap="wrap">
                            {
                                projects.map((v, index) => {
                                    return (
                                        <Project key={`project-${index}`} {...v} />
                                    )
                                })
                            }
                        </Flex>
                    </Container>
                </Box>

            </Box>
            
        </PageBody>
    )
}

HomePage.Project = Project

export default HomePage