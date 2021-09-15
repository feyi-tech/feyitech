import { createClient, createImageUrlBuilder, createPortableTextComponent } from "next-sanity"
import sanityConfig from "./config"
import { Box, VStack, Button, Text, useClipboard } from "@chakra-ui/react"
import CodeView from "../components/widgets/code-view"

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(sanityConfig)

export const urlFor = (source) => createImageUrlBuilder(sanityConfig).image(source)

// code: (props) => (
//   <pre data-language={props.node.language}>
//     <code>{props.node.code}</code>
//   </pre>
// ),

const CopyButton = ({text, copyText, copiedText, addNewLine, ...props}) => {
  console.log("Text:", text)
  const { hasCopied, onCopy } = useClipboard(text)
  return (
    <Box bg="#2c7a7b" opacity="0.7" color="#fff" 
    _hover={{
      opacity: 1
    }}
    borderRadius="8px" cursor="pointer" p="8px 16px !important"
    onClick={onCopy} {...props}>
      {!hasCopied? copyText : copiedText}
    </Box>
  )
}

export const buildSerializers = ({theme, t}) => {
  return {
    style: {
      h1: (props) => (
        <Box as="h1" fontWeight="bold" fontSize="36px">
            {props.node.h1}
        </Box>
      ),
      h2: (props) => (
        <Box as="h2" fontWeight="bold" fontSize="32px">
            {props.node.h2}
        </Box>
      ),
      h3: (props) => (
        <Box as="h3" fontWeight="bold" fontSize="28px">
            {props.node.h3}
        </Box>
      ),
      code: (props) => (
        <Box as={CodeView} pos="relative" lang={props?.language} theme={theme} w="100%" maxW="500px" h="450px">
            {props.children}
        </Box>
      )
    },
    marks: {
      cliCommand: (props) => (
        <VStack pos="relative" justifyContent="center" alignItems="flex-start" bg="#011627" color="#fff" overflow="hidden" p="1.25rem" 
        borderRadius="8px" m="0px !important" mb="0.5rem !important" fontSize="14px">
          <Text as="div">{props.children}</Text>
          <CopyButton addNewLine text={props.children[0]} copyText={t("common:copy")} copiedText={t("common:copied")}  pos="absolute" right="0" mr="15px !important"  />
        </VStack>
      )
    }
  }
}

// Set up Portable Text serialization
// export const PortableText = ({theme, ...props}) => {
//   return createPortableTextComponent({
//     ...sanityConfig,
//     ...props,
//     // Serializers passed to @sanity/block-content-to-react
//     // (https://github.com/sanity-io/block-content-to-react)
//     serializers: {}//buildSerializers({theme}),
//   })
// }

export const PortableText = createPortableTextComponent({
  ...sanityConfig,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {}//buildSerializers({theme}),
})
