
import PageBody from "../../widgets/PageBody"
import { Box, HStack, Image, Text, useColorModeValue, VStack, AspectRatio } from "@chakra-ui/react"


import ReactTimeAgo from 'react-time-ago'

import 'html5-device-mockups/dist/device-mockups.min.css';

import { IPad, IPhone7, MacbookPro } from 'react-device-mockups';
import useTranslation from "next-translate/useTranslation";
import HeaderBanner from "../home/HeaderBanner";
import ServicesPage from "../services/";
import Container from "../../widgets/Container";
import Link from "../../widgets/Link";
import Trans from "next-translate/Trans";
import { CURRENCY } from "../../../utils/c";
import SplitLayout from "../../widgets/SplitLayout";


const Feature = ({id, image, title, desc, youtubeVideoId}) => {
    return <VStack justifyContent="start" alignItems="center" textAlign="center" w="100%">
        <Text lineHeight="36px" fontSize={{base: "35px"}} m="50px auto 15px" w="100%" fontWeight="900" color="#bb0d5e">{title}</Text>
        <Text maxW="600px" m="auto" lineHeight="26px" mt="27px" fontSize="22px" fontWeight="500">{desc}</Text>
        {youtubeVideoId.length == 0? null : 
            <AspectRatio w="100%" maxW="600px" ratio={16 / 9}>
                <Box as="iframe"
                title={title}
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                allowfullscreen
                />
            </AspectRatio>
        }
    </VStack>
}

const SingleProductPage = ({name, desc, sellingPrice, screenshotFull, screenshotMobile, demoLink, latestVersion, latestVersionDate, features, techs}) => {
    const {t, lang} = useTranslation("products-single")

    const color = useColorModeValue("pageColor.dark", "pageColor.dark")
    //http://dev.domain.com:2000/images/projects/cosmobox-full.it.png
    //http://dev.domain.com:2000/images/projects/cosmobox-mobile.it.jpeg
    
    return (
        <PageBody as={VStack} pt="0px !important" enableMobileStick={false}
        link="/" title={t('common:title')} description={t('desc')}
        justifyContent="flex-start" alignItems="flex-start" pos="relative">
            <HStack pos="relative" py={{base: "25px", md: "55px"}} w="100%" pos="relative" color={color}
            bg={`url(https://sitemile.com/wp-content/uploads/2021/07/AdobeStock_439302154-scaled.jpeg)`} 
            py={{base: "25px !important", md: "55px !important"}} px={{base: "15px !important", md: "55px !important"}}
            mb={{base: "35px !important", md: "55px !important"}} w="100%" justifyContent="center" alignItems="center">
                <Container>
                    <HStack w="100%" flexWrap="wrap" justifyContent="space-between" alignItems="flex-start">
                        <VStack m="0px !important" w={{base: "100%", lg: "50%"}} justifyContent="flex-start" alignItems="flex-start" mb="25px !important">
                            <Text as="div" fontSize="2.2em" fontWeight="700">
                                {name}
                            </Text>
                            <Text as="div" fontSize="1.2em" mt="15px">
                                {desc}
                            </Text>
                            <Text as="div" fontSize="1.5em" mt="15px" fontWeight="bold">
                                <Trans i18nKey="products-single:price-text" components={[
                                    <Text as="sup" color="#69ff69">{CURRENCY.symbol}</Text>, 
                                    <Text as="span" color="#69ff69">{sellingPrice}</Text>
                                ]} />{/*
                                <Text as={Link} href="#pricing" ml="5px" color="#111" p="4px" fontSize="12px" fontWeight="normal" bg="#ecc700" borderRadius="5px" transition="0.3s" 
                                _hover={{
                                    bg: "yellow"
                                }}>
                                    {t("see-pricing")}
                            </Text>*/}
                            </Text>
                            {/* <HStack mt="1.5rem !important" justifyContent="flex-start" alignItems="center">
                                <Box textTransform="uppercase" textAlign="center" w="180px" h="50px" p="15px" mr="20px" 
                                borderRadius=".25rem" transition=".15s" as={Link} href={demoLink} color={"#fff !important"} 
                                bg="#007bff" _hover={{
                                    bg: "#0069d9"
                                }}>
                                    {t("view-demo")}
                                </Box>
                                <Box textTransform="uppercase" textAlign="center" w="180px" h="50px" p="15px" mr="20px" 
                                borderRadius=".25rem" transition=".15s" color={"#fff !important"} 
                                bg="#007bff" _hover={{
                                    bg: "#0069d9"
                                }}>
                                    {t("buy-now")}
                                </Box>
                            </HStack> */}
                            <SplitLayout mt="40px !important" 
                            alignItems={{base: "flex-start", md: "center"}} 
                            justifyContent="flex-start">
                                <SplitLayout.First w="auto">
                                    <Box textTransform="uppercase" textAlign="center" w="180px" h="50px" p="15px" mr="20px" 
                                    borderRadius=".25rem" transition=".15s" as={Link} href={demoLink} color={"#fff !important"} 
                                    bg="#007bff" _hover={{
                                        bg: "#0069d9"
                                    }}>
                                        {t("view-demo")}
                                    </Box>
                                </SplitLayout.First>
                                <SplitLayout.Second>
                                    <Box textTransform="uppercase" textAlign="center" w="180px" h="50px" p="15px" mr="20px" 
                                    borderRadius=".25rem" transition=".15s" color={"#fff !important"} 
                                    bg="#007bff" _hover={{
                                        bg: "#0069d9"
                                    }}>
                                        {t("buy-now")}
                                    </Box>
                                </SplitLayout.Second>
                            </SplitLayout>
                            <VStack mt="1.5rem !important" justifyContent="flex-start" alignItems="flex-start" fontSize="1.2em" fontWeight="400">
                                <Box>
                                    <Trans i18nKey="products-single:latest-version" components={[
                                        <Text as="span" fontWeight="bold">v{latestVersion}</Text>
                                    ]} />
                                </Box>
                                <Box>
                                    <Trans i18nKey="products-single:latest-version-release" components={[
                                        <ReactTimeAgo date={new Date(latestVersionDate)} locale={lang} timeStyle="twitter" />
                                    ]} />
                                </Box>
                            </VStack>
                        </VStack>
                        <VStack m="0px !important" w={{base: "100%", lg: "50%"}} pos="relative" justifyContent="flex-start" alignItems="flex-start" 
                        pl={{base: "0px", lg: "25px"}}>
                            <Box w="100%" pos="relative">
                                {
                                    /**
                                     * <Image w="100%" h="auto" maxW="590px" src="https://sitemile.com/wp-content/uploads/2020/12/main-screen-with-mobile-01.png" />
                                     */
                                }
                                <IPad orientation="portrait" height="500px" color='black'>
                                    <Image w="100%" h="100%" src={screenshotFull} />
                                </IPad>
                                <Box pos="absolute" right="30" bottom="20">
                                    <IPhone7 orientation="portrait" height="300px" color='black'>
                                        <Image w="100%" h="100%" src={screenshotMobile} />
                                    </IPhone7>
                                </Box>
                            </Box>
                        </VStack>
                    </HStack>
                </Container>
            </HStack>
            
            <Container>
                <VStack pos="relative" py={{base: "25px", md: "55px"}} w="100%">
                    {
                        (features || []).map((v, index) => {
                            return v.youtubeVideoId.length > 0 ? <Feature key={`feature-${index}`} {...v} /> : null
                        })
                    }
                </VStack>

                <Text pt="1.5em" pb="1em" fontWeight="600">{t("common:techs")}</Text>
                <HStack w="100%" justifyContent="flex-start" alignItems="center" flexWrap="wrap" maxW="850px">
                {
                    (techs || []).map((tech, index) => {
                        return <ServicesPage.Tech {...tech} />
                    })
                }
                </HStack> 
            </Container>
            
        </PageBody>
    )
}

export default SingleProductPage