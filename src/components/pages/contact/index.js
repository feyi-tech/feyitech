import { HStack, VStack, Text } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { useState, useEffect } from "react"
import { CONTACT } from "../../../utils/c"
import PageBody from "../../widgets/PageBody"
import Container from "../../widgets/Container"
import ContactForm from "../../widgets/ContactForm"
import Jumbotron from "../../widgets/Jumbotron"
import Link from "../../widgets/Link"
import TextView from "../../widgets/TextView"

const P = ({as, children, ...props}) => {

    return (
        <Text as={as || "p"} fontSize="1.2rem" overflowWrap="break-word" 
        lineHeight="1.4" {...props}>{children}</Text>
    )
}

//https://www.rascasone.com/en/contact
const ContactPage = ({servicesList}) => {
    const { t } = useTranslation("contact")

    const [services, setServices] = useState(servicesList || [])
    useEffect(() => {
        setServices(servicesList || [])
    }, servicesList)


    return (
        <PageBody  minHeight="150vh"
        link="" title={t('common:title')} url="/" description={t('common:sitedesc')}
        justifyContent="flex-start" alignItems="flex-start" pos="relative">
            <Container>
                <HStack w="100%" p="0px !important" m="0px !important" justifyContent="space-around" alignItems="flex-start">
                    <ContactForm services={services} m="0px !important" w={{base: "100%", md: "50%"}} />
                    <Jumbotron w={{base: "100%", md: "auto"}} m={{base: "15px 0px !important", md: "0px !important"}} 
                    justifyContent="flex-start" alignItems="flex-start" bg="transparent">
                        <P as={Link} href={`mailto:${CONTACT.email}`} fontWeight="bold" textTransform="uppercase">{CONTACT.email}</P>
                        <br />
                        <P>{CONTACT.mobile}</P>
                        <br /><br />
                        <P as={TextView}>{CONTACT.address}</P>
                    </Jumbotron>
                </HStack>
            </Container>
        </PageBody>
    )
}

export default ContactPage