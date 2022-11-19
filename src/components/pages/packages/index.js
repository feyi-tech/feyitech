import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { CURRENCY } from "../../../utils/c"
import { buildProductLink, buildPackageLink } from "../../../utils/f"
import Card from "../../widgets/Card"
import { BTN } from "../../widgets/ContactForm"
import Container from "../../widgets/Container"
import FooterContactForm from "../../widgets/FooterContactForm"
import Link from "../../widgets/Link"
import PageBody from "../../widgets/PageBody"

const Package = ({id, name, price, products, features, t}) => {
    const normalColor = useColorModeValue("linkHover.light", "linkHover.dark")
    const errorColor = useColorModeValue("colorError.light", "colorError.dark")
   
    
    return (
        <Card mr={{base: "0px !important", md: "100px"}} mb={{base: "30px", md: "0px !importnat"}}>
            <Text fontSize="21.66px" as="h3" mb="30px" mt="15px" fontWeight="500" textTransform="uppercase">{name}</Text>
            <Text color={normalColor} fontSize="36.66px" as="h1" mb="30px" mt="15px" fontWeight="700" pos="relative" 
            pl="10px" letterSpacing="-1px" borderBottom="1px solid #dedede" pb="36.66px">{CURRENCY.symbol}{price}</Text>
            <VStack>
                {
                    (products || []).map((v, index) => {
                        return (
                            <HStack w="100%" key={`product-${index}`} as={Link} href={buildProductLink(v.name, v.id)} color={normalColor} showIcon>
                                <FaCheckCircle />
                                <Text ml="5px" as="div">{v.name}</Text>
                            </HStack>
                        )
                    })
                }
                {
                    (features || []).map((v, index) => {
                        return (
                            <HStack w="100%" key={`feature-${index}`} color={v.packages_features.enabled? normalColor : errorColor}>
                                {v.packages_features.enabled? <FaCheckCircle /> : <FaTimesCircle />}
                                <Text ml="5px" as="div">{v.title}</Text>
                            </HStack>
                        )
                    })
                }
            </VStack>
            <BTN mt="25px"
            bg={normalColor} color={"#fff"}
            textTransform="capitalize" as={Link} href={buildPackageLink(name, id)}>
                {t("purchase")}
            </BTN>
        </Card>
    )
}

const PackagesPage = ({packages, services}) => {
    const { t } = useTranslation("packages")


    return (
        <PageBody link="/packages" title={t('title')} description={t('desc')}>
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
                <HStack w="100%" flexWrap="wrap" justifyContent="center" alignItems="flex-start">
                    {
                        (packages || []).map((v, index) => {
                            return (
                                <Package key={`package-${index}`} t={t} {...v} />
                            )
                        })
                    }
                </HStack>
            </Container>
            <FooterContactForm services={services} />
        </PageBody>
    )
}

export default PackagesPage