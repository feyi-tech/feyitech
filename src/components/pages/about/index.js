import { Box, Flex, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import { BTN_BG } from "../../../utils/c"
import { toLocaleString } from "../../../utils/f"
import Container from "../../widgets/Container"
import Map from "../../widgets/Map"
import PageBody from "../../widgets/PageBody"
import SlantHeader from "../../widgets/SlantHeader"
import SplitLayout from "../../widgets/SplitLayout"
import TextView from "../../widgets/TextView"
import { H1, H2 } from "../services"
import Link from "../../widgets/Link"

const teamImage = "/images/TeamPlanningDay.png"
const cityImage = "/images/city.jpg"

const StatCounter = ({count, title, lang, ...props}) => {

    const color = useColorModeValue("#828487", "#828487")

    return (
        <VStack justifyContent="center" alignItems="center" mt="0px !important">
            <Text as={"div"} fontSize="64px" fontWeight="700" fontStyle="normal" textAlign="center" {...props}>{toLocaleString(count, lang, 0)}+</Text>
            <Text as="div" color={color} w={{base: "120px", lg: "96px"}} fontSize="16px" lineHeight="1.25" fontWeight="400" textAlign="center" pt="1.2em" pb="1em">{title}</Text>
        </VStack>
    )
}

const Standout = ({title, desc, notActive, ...props}) => {

    if(notActive) return null
    return (
        <VStack justifyContent="flex-start" alignItems="flex-start" {...props}>
            <H2>{title}</H2>
            <TextView>
                {desc}
            </TextView>
        </VStack>
    )
}

const Customer = ({lightBgLogo, darkBgLogo, ...props}) => {
    const logo = useColorModeValue(darkBgLogo, lightBgLogo)

    return (
        <Image src={logo} h="70px" w="auto" pr="100px" pb="10px" />
    )
}

const AboutPage = ({projectsCounts, citiesCounts, customers}) => {
    const { t, lang } = useTranslation("about")

    const headerBg = useColorModeValue("pageBg.dark", "pageBg.dark")
    const headerBgSkew = useColorModeValue("pageBg.light", "pageBg.dark")
    const headerColor = useColorModeValue("pageColor.dark", "pageColor.dark")

    const [standouts, setStandouts] = useState([])

    useEffect(() => {
        setStandouts([
            {
                title: t("s-title-1"),
                desc: t("s-desc-1")
            },
            {
                notActive: true,
                title: t("s-title-2"),
                desc: t("s-desc-2")
            },
            {
                title: t("s-title-3"),
                desc: t("s-desc-3")
            },
            {
                title: t("s-title-4"),
                desc: t("s-desc-4")
            },
            {
                title: t("s-title-5"),
                desc: t("s-desc-5")
            },
            {
                title: t("s-title-6"),
                desc: t("s-desc-6")
            }
        ])
    }, [])

    

    return (
        <PageBody as={VStack} pt="0px !important" minHeight="150vh"
        link="/about" title={t('title')} description={t('desc')}
        justifyContent="flex-start" alignItems="flex-start">
            <SlantHeader bg={headerBg} bgInverse={headerBgSkew} color={headerColor} title={t('title')} desc={t('desc')} zIndex="12" />
            <Box w="100%" bg={headerBgSkew} zIndex="12" mb="0px !important">
                <Container textAlign="left" pos="relative" pb={{base: "25px", md: "120px"}}>
                    <SplitLayout>
                        <SplitLayout.First>
                            <H2>{t("our-story")}</H2>
                            <TextView>
                                {t("story")}
                            </TextView>
                        </SplitLayout.First>
                        <SplitLayout.Second>
                            <HStack pt={{base: 0, md: "48px"}} pos="relative" justifyContent="flex-start" alignItems="center" 
                            bgRepeat="no-repeat" bgSize="cover" w="100%" bgPos="50%" h="auto" 
                            _before={{base: {}, md: {
                                position: "absolute",
                                left: "100px",
                                top: 0,
                                bottom: 0,
                                width: "142%",
                                content: "''",
                                backgroundColor: "#eda923",
                                zIndex: 0
                            }}}>
                                <Image src={teamImage} pos="relative" />
                            </HStack>
                        </SplitLayout.Second>
                    </SplitLayout>
                </Container>
            </Box>
            <Box w="100%" bg={headerBg} zIndex="12" mt="0px !important">
                <Container justifyContent="center" alignItems="center" pos="relative" color={headerColor}>
                    <Map />
                    <HStack w="100%" justifyContent={{base: "center", md: "space-between"}} pos={{base: "relative", md: "absolute"}} zIndex="1">
                        <StatCounter lang={lang} count={projectsCounts} title={t("project-count-title")} />
                        <StatCounter lang={lang} count={citiesCounts} title={t("cities-count-title")} />
                    </HStack>
                </Container>
            </Box>
            <Box w="100%" bg={headerBgSkew} zIndex="12" mb="0px !important" mt="0px !important">
                <Container textAlign="left" pos="relative" zIndex="1" py={{base: "25px", md: "120px"}}>
                    <Text as="div" mt="10px" mb="48px" pb="1em" fontSize={{base: "28px", md: "38px"}} lineHeight="42px" fontWeight="700" maxW="90%">
                        {t("standout-title")}
                    </Text>
                </Container>
            </Box>
            <SplitLayout textAlign="left" pos="relative" zIndex="1" p="0px !important" mt="0px !important">
                <SplitLayout.First bg={headerBgSkew}>
                    <Container neigbours={1}>
                        {
                            (standouts || []).map((v, index) => {
                                return <Standout key={`standout-${index}`} {...v} />
                            })
                        }
                    </Container>
                </SplitLayout.First>
                <SplitLayout.Second px={{base: "0px", md: "16px"}} pos="relative">
                    <Container neigbours={1}>
                        <Box w={{base: "100%", md: "100%"}} h={{base: "600px", md: "800px"}} pos="relative">
                            <Box h="100%" w={{base: "95%", md: "95%"}} 
                            pos="fixed" top="100px" zIndex={{base: "-1", md: "-2"}}
                            backgroundPositionX="center"
                            bgImage={`url(${cityImage})`} bgRepeat="no-repeat" bgSize="contain"></Box>
                        </Box>
                    </Container>
                </SplitLayout.Second>
            </SplitLayout>
            <Box w="100%" bg={headerBg} color={headerColor} zIndex="12" m="0px !important" p="0px !important">
                <Container pt="55px">
                    <H2>{t("our-customers")}</H2>
                    <TextView>{t("about-customers")}</TextView>
                    <HStack flexWrap="wrap" pt="35px">
                        {
                            (customers || []).map((v, index) => {
                                return <Customer key={`cus-${index}`} {...v} />
                            })
                        }
                        <HStack as={Link} href="/projects" justifyContent="flex-start" alignItems="center" color={BTN_BG} textTransform="uppercase" 
                            whiteSpace="nowarap" overflow="hidden" textOverflow="ellipsis"
                            borderRadius="4px" fontWeight="600" lineHeight="1.5" pos="relative"
                            cursor="pointer" _hover={{
                                color: "#32404e !important",
                                textDecoration: "none  !important"
                            }}>
                            <Text as="div" mr="4px">{t("projects")}</Text>
                            <FaArrowRight />
                        </HStack>
                    </HStack>
                </Container>
            </Box>


            {
                /**
                 * <Box w="100%" bg={headerBgSkew} zIndex="12" h="50px" m="0px !important" p="0px !important">
            </Box>
                 */
            }
        </PageBody>
    )
}

export default AboutPage