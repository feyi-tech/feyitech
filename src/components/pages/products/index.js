import { Box, Flex, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import Trans from "next-translate/Trans"
import { useEffect, useState } from "react"
import Container from "../../widgets/Container"
import FooterContactForm from "../../widgets/FooterContactForm"
import PageBody from "../../widgets/PageBody"
import { colors } from "../../../../theme"
import Link from "../../widgets/Link"
import { buildProductLink, toLocaleString } from "../../../utils/f"
import { CURRENCY } from "../../../utils/c"

const BT = ({as, children, ...props}) => {
    
    
    return (
        <Text textTransform="capitalize" border="1px solid #3b4d71" color="#3b4d71" fontSize="14px" p="7px 15px" textDecoration="none" 
        _hover={{
            bg: "#3b4d71",
            color:"#fff",
            textDecoration:"none",
            transition:"all .5s ease"
        }}
         {...props}>
            {children}
        </Text>
    )
}

const Product = ({noDetails, noLink, t, lang, id, priority, screenshot, screenshotFull, title, link, name, desc, feedback, feedbackAuthor, feedbackAuthorPhoto, forSale, listedAt, completedAt, costPrice, sellingPrice, ...props}) => {
    const border = `1px solid ${useColorModeValue(colors.border.light, colors.border.dark)}`
    const bg = useColorModeValue("#fff", "#000")
    const bgGray = useColorModeValue("#f1f1f1", "#0f0f0f")
    

    return (
        <Box w={{base: "100%", md: "50%"}} pr="25px" pb="25px" {...props}>
            <VStack w="100%" as={!noLink? Link : "div"} href={!noLink? buildProductLink(name, id) : ""} transition="0.3s" borderRadius="6px" pos="relative" overflow="hidden" 
            boxShadow="0 8px 60px 0 rgb(103 151 255 / 11%), 0 12px 90px 0 rgb(103 151 255 / 11%)" border={border} 
            role="group" p="0px !important" border="1px solid #dfdfdf">
                <Image src={screenshotFull} w="100%" h="auto" maxW={{base: "430px", md: "530px"}} maxH={{base: "384px", md: "484px"}} />
                {
                    !noDetails?
                    <>
                        <Text as="div" bg={bg} mt="0px !important" 
                        minH={{base: "70px", md: "100px"}} 
                        w="100%" p="28px" 
                        fontSize="17px" fontWeight="500" textAlign="center">
                            {name}
                        </Text>
                        <Box bg={bgGray} w="100%" pos="absolute" bottom="0" p="25px" fontSize="14px" fontWeight="bold" textAlign="center" 
                        h="0px" transition="all 0.3s ease" opacity="0"
                        _groupHover={{
                            h: {base: "70px", md: "100px"},
                            opacity: 1
                        }}>
                            <HStack justifyContent="center" alignItems="center" w="100%" h="100%">
                                <BT pr="10px" bg={bg}>
                                    {t("read-more")}
                                </BT>
                                <BT pr="10px" bg={bg}>
                                    <Trans i18nKey="products:buy-now-with-price" components={[<span>{CURRENCY.symbol}</span>, <span>{toLocaleString(sellingPrice, lang, 0)}</span>]} />
                                </BT>
                            </HStack>
                        </Box>
                    </>
                    : null
                }
            </VStack>
        </Box>
    )
}


const ProductsPage = ({products, services}) => {
    const { t, lang } = useTranslation("products")


    return (
        <PageBody link="/products" title={t('title')} description={t('desc')}>
            <Container>
                <VStack w={{base: "100%", md: "50%"}} justifyContent="flex-start" alignItems="flex-start" mb="95px">
                    <Text as="h2" fontSize="2.2rem" textTransform="uppercase" 
                    color="#27C827" lineHeight="1.1" fontWeight="bold" mb="2rem">
                        {t('title')}
                    </Text>
                    <Text as="p" mb="9rem" fontSize="1.08rem">
                        {t("desc")}
                    </Text>
                </VStack>
                <Flex w="100%" flexWrap="wrap">
                    {
                        (products || []).map((v, index) => {
                            return (
                                <Product key={`product-${index}`} t={t} lang={lang} {...v} />
                            )
                        })
                    }
                </Flex>
            </Container>
            <FooterContactForm services={services} />
        </PageBody>
    )
}

ProductsPage.Product = Product

export default ProductsPage