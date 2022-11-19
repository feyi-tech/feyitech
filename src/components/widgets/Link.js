
import L from 'next/link';

import {Box, Text, useColorModeValue } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { isProduction, saveToStorage, toLocaleString } from '../../utils/f';
import { BLOCK_CHAIN_ADDRESS_SCAN_PREFIX, LOCAL_STORAGE } from '../../utils/c';
import router from "next/router";
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation';
import { FaLink } from 'react-icons/fa';

const linkNativeProps = ["href", "as", "passHref", "prefetch", "replace", "scroll", "shallow", "locale"]
export default function Link({href, disabled, shallow, locale, children, isButton, isContractAddress, hoverMode, color, _hover, 
    target, disableExternalIcon, isExternal, active, showIcon, ...props}) {
    const { lang } = useTranslation()
    const router = useRouter()

    //const shallow = !(shallow === undefined)? shallow : locale && locale != lang? true : false
    
    const clr = useColorModeValue("link.light", "link.dark")
    const activeBorder = useColorModeValue(`3px solid link.light`, `3px solid link.dark`)
    const colorHover = useColorModeValue("linkHover.light", "linkHover.dark")

    if(disabled) {
        return (
            <span {...props}>
                {children}
            </span>
        )
    }
    return (
        <Text as={L} href={href} locale={locale || lang} shallow={shallow} 
        _hover={{
            textDecoration: "none !important"
        }}>
            <Text as="a" 
            cursor="pointer"
            href={buildLink(href, {isContractAddress: isContractAddress})}
            {...props}
            color={color || hoverMode? colorHover : clr}
            borderBottom={active? activeBorder : "none"}
            target={target || (isExternal? "_blank" : "_self")}
            _hover={{
                color: colorHover,
                ..._hover
            }}
            >
                {children} {!disableExternalIcon && (target == "_blank" || isExternal)? <ExternalLinkIcon mx="2px" /> : showIcon? <Box as={FaLink} mx="2px" /> : null}
            </Text>
        </Text>
    )
}

const toLocale = (r, l) => {
    console.log("LLL:2", router.asPath, l)
}

export const buildLink = (href, options) => {
    if(!options?.isContractAddress) return href
    if(isProduction()) {
        return BLOCK_CHAIN_ADDRESS_SCAN_PREFIX.main + href

    } else {
        return BLOCK_CHAIN_ADDRESS_SCAN_PREFIX.test + href
    }
}