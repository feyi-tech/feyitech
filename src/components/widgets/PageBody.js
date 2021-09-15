import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react'
import Footer from './Footer'
import Nav from './Nav'
import i18nConfig from '../../../i18n'
import useTranslation from 'next-translate/useTranslation'
import PageTitle from './PageTitle'
import { BTN_BG, BTN_COLOR } from '../../utils/c'
import { FaCommentAlt } from 'react-icons/fa'

const { localesMap } = i18nConfig

const PageBody = ({as, children, noChat, headerHasBanner, enableMobileStick, excludeHeader, excludeFooter, className, link, title, description, image, type, updatedTime, ...props}) => {
    const {lang} = useTranslation()
    const bg = useColorModeValue("pageBg.light", "pageBg.dark")
    const color = useColorModeValue("pageColor.light", "pageColor.dark")
    const colorAccent = useColorModeValue("colorAccent.light", "colorAccent.dark")
    

    const nav = excludeHeader? null : 
    <Nav hasBanner={headerHasBanner} enableMobileStick={enableMobileStick} />
    
    return(
        <VStack className="app" dir={localesMap[lang].isRTL? "rtl" : "ltr"} bg={bg} color={color} w="100%" h="100%" minH="100vh">
            <PageTitle link={link} title={title} url="/" description={description} image={image} type={type} updatedTime={updatedTime} />
            {nav}
            <Box as={as || VStack} w="100%" h="100%" flexGrow={1} pt="70px" m="0px !important" pos="relative" {...props}>
                {children}
            </Box>
            {
                // noChat? null:
                // <VStack bg={colorAccent} w="60px" h="60px" pos="fixed" right="5" bottom="16px" borderRadius="50%"
                // zIndex="14" justifyContent="center" alignItems="center" cursor="pointer">
                //     <Box as={FaCommentAlt} color={"#fff"} fontSize="28px" />
                // </VStack>
            }
            {!excludeFooter? <Footer /> : null}
        </VStack>
    )
}

export default PageBody