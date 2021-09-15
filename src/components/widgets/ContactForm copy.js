import { 
    useColorModeValue, VStack, Flex, Text, FormControl, HStack, 
    FormLabel, Checkbox, Input, Textarea, Button, FormErrorMessage
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import Swal from "sweetalert2";
import { BTN_BG, BTN_COLOR, URL_BASE, CONTACT_FORM_ID, G_RECAPTCHA_KEY } from "../../utils/c";
import TextView from "./TextView";
//import ReCAPTCHA from "react-google-recaptcha"

const queryString = require("query-string")


const H2 = ({children, ...props}) => {

    return <Text as="span" fontSize="35px" fontWeight="700" lineHeight="1.22" mb="8px" textAlign="center" 
    textTransform="none" {...props}>{children}</Text>
}


const H3 = ({children, ...props}) => {

    return <Text as="span" fontSize="16px" fontWeight="400" lineHeight="24px" mb="32px" textAlign="center" 
    textTransform="none" {...props}>{children}</Text>
}

export const BTN = ({children, bg, color, ...props}) => {
    return (
      <Button bg={bg} color={color}
      _hover={{
          bg: bg,
          color: "#fff !important",
          textDecoration: "none  !important",
          opacity: "0.7"
      }} 
      marginStart="0px !important" marginInlineStart="0px !important"
      mr={{base: "0px", md: "15px"}}
      mb={{base: "5px", md: "0px"}}
      {...props}>
        {children}
      </Button>
    )
}

export default function ContactForm({title, desc, services, noBg, ...props}) {
    const {t} = useTranslation("contact-form")
    const bg = useColorModeValue("#fff", "#000")
    const color = useColorModeValue("#333", "#f4f4f4")
    const shadow = "0 0 4px rgb(29 37 45 / 5%), 0 8px 32px rgb(29 37 45 / 10%)"
    const colorAccent = useColorModeValue("colorAccent.light", "colorAccent.dark")
    const colorAccentInverse = useColorModeValue("colorAccentInverse.light", "colorAccentInverse.dark")

    const router = useRouter()

    const { msg } = router.query

    useEffect(() => {
        if(msg && msg == "ok") {
            Swal.fire({
                text: t("submit-msg"),
                icon: "success",
                confirmButtonText: t("common:ok")
            })

        } else if(msg && msg == "error") {
            Swal.fire({
                text: t("submit-msg-error"),
                icon: "error",
                confirmButtonText: t("common:ok")
            })
        }
    }, [msg])

    // const [recaptchaResponse, setRecaptchaResponse] = useState("")

    // const onCaptchaChange = value => {
    //     setRecaptchaResponse(value)
    //     console.log("RecaptchaValue:", value)
    // }
    

    const initialValues = {
        likes: ["web-dev"],
        name: "Jinmi",
        email: "jinmi@mail.com",
        desc: "Hello I want in"
    }

    const inputsData = {
        likes: [],
        name: "",
        email: "",
        desc: ""
    }

    const inputsProgram = {
        likes: {
            set: (value, key) => {
                if(value) {
                    inputsData.likes.push(key)

                } else if(inputsData.likes.includes(key)) {
                    removeItem(inputsData.likes, key)
                }
            },
            validate: () => {
                return inputData.likes
            }
        },
        name: {
            set: (value) => {
                inputData.name = value
            },
            validate: () => {
                return inputData.name
            }
        },
        email: {
            set: (value) => {
                inputData.email = value
            },
            validate: () => {
                return inputData.email
            }
        },
        desc: {
            set: (value) => {
                inputData.desc = value
            },
            validate: () => {
                return inputData.desc
            }
        }
    }

    const handleChange = e => {
        inputsProgram[e.target.name].set(e.target.value, e.target.name)

        //console.log("DATA:", `e.target.value: ${e.target.value}, e.target.name: ${e.target.name}`,  inputsData)
    }

    const parsedUrl = queryString.parseUrl(router.asPath)
    var url = parsedUrl.url
    
    const formRedirectUrl = queryString.stringifyUrl({url: url, query: {
        ...parsedUrl.query,
        ...{msg: "ok"}
    }})
    const formRedirectUrlError = queryString.stringifyUrl({url: url, query: {
        ...parsedUrl.query,
        ...{msg: "error"}
    }})

    //console.log("PATH", `${URL_BASE}${formRedirectUrl}`)

    return (
        <VStack w="100%" minW="356px" maxWidth="560px" minH={{base: "400px", md: "608px"}} boxShadow={!noBg? shadow : "none"} bg={!noBg? bg : "transparent"} color={!noBg? color : "initial"} 
        p="48px 24px" borderRadius="8px"
        {...props}>
            <H2 as={TextView}>{title || t("title")}</H2>
            <H3 as={TextView}>{desc || t("desc")}</H3>
            {/* https://submit-form.com/your-form-id */}
            <form encType="multipart/form-data" action={`https://submit-form.com/${CONTACT_FORM_ID}`} method="POST">
                <FormControl id="likes" isRequired 
                    mb="15px !important">
                    <FormLabel>{t("interest-label")}</FormLabel>
                    <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center">
                        {
                            (services || []).map((v, index) => {
                                return (
                                    <Checkbox name={`Requested ${v.title}`} onChange={handleChange} display="block" key={`contact-form-service-${index}`} w={{base: "100%", md: "50%"}} 
                                    m={{base: "5px 0px !important", md: "0px !important"}} p={{base: "0px !important", md: "4px !important"}}>
                                        {v.title}
                                    </Checkbox>
                                )
                            })
                        }
                    </HStack>
                    {/* <FormErrorMessage>{form.errors.likes}</FormErrorMessage> */}
                </FormControl>
                
                <Flex flexDirection={{base: "column", md: "row"}} 
                justifyContent={{base: "flex-start", md: "space-between"}} alignItems="flex-start">
                    <FormControl id="name" onChange={handleChange} isRequired 
                    mr={{base: "0px", md: "15px !important"}} mb={{base: "15px !important", md: "0px"}}>
                        <Input name="name" placeholder={t("name-title")} />
                        {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                    </FormControl>
                    <FormControl id="email" onChange={handleChange} isRequired >
                        <Input name="email" placeholder={t("email-title")} />
                        {/* <FormErrorMessage>{form.errors.email}</FormErrorMessage> */}
                    </FormControl>
                </Flex>
                <FormControl id="desc" onChange={handleChange} isRequired 
                mt="15px !important">
                    <Textarea name="desc" placeholder={t("message-title")} onChange={handleChange} isRequired />
                    {/* <FormErrorMessage>{form.errors.desc}</FormErrorMessage> */}
                </FormControl>

                {/* Configurations */}
                <Input type="hidden" name="_redirect" value={`${URL_BASE}${formRedirectUrl}`} />
                <Input type="hidden" name="_error" value={`${URL_BASE}${formRedirectUrlError}`} />
                <Input type="checkbox" d="none" name="requires_quick_reply" style="display:none" tabindex="-1" autocomplete="off" />
                {/* <Input type="hidden" name="g-recaptcha-response" value={recaptchaResponse} /> */}
                {/* <input type="hidden" name="_subject" value={`${t("common:sitename")} Contact Form Submitted`} />
                <input type="hidden" name="_template" value="box" />
                <input type="hidden" name="_autoresponse" value={t("submit-msg-autoresponse")} />
                <input type="hidden" name="_replyto" /> */}

                {/* <ReCAPTCHA
                    sitekey={G_RECAPTCHA_KEY}
                    onChange={onCaptchaChange}
                /> */}

                <Flex mt="15px !important" flexDirection={{base: "column", md: "row"}} 
                justifyContent={{base: "flex-start", md: "space-between"}} alignItems="flex-start">
                    <VStack justifyContent="flex-start" alignItems="flex-start">
                        <Text as="label" for="upload" display="flex" justifyContent="left" alignItems="center" color={colorAccent} textTransform="uppercase" 
                        whiteSpace="nowarap" overflow="hidden" textOverflow="ellipsis"
                        borderRadius="4px" fontWeight="600" lineHeight="1.5" pos="relative"
                        cursor="pointer" _hover={{
                            color: colorAccentInverse,
                            textDecoration: "none  !important"
                        }}>
                            <Text as="span" mr="4px">{t("attach-file")}</Text> <FaPaperclip />
                            <Input d="none" type="file" name="upload[]" id="upload" multiple accept=".doc,.docx,.odt,.pdf,.txt,.rtf,.jpg,.jpeg,.png" />
                        </Text>
                        <TextView fontSize="12px" color="#7d8995">{t("file-rules")}</TextView>
                    </VStack>
                    

                    <BTN
                    bg={colorAccent} color={"#fff"}
                    textTransform="uppercase"
                    isLoading={false}
                    type="submit" _hover={{
                        bg: colorAccentInverse,
                        color: "#fff !important",
                        textDecoration: "none  !important"
                    }}>
                        {t("submit-text")}
                    </BTN>
                </Flex>
            </form>
            {/* <Formik 
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
                }, 1000)
            }}>
                {({isSubmitting, ...props}) => (
                        <Form method="POST" encType="multipart/form-data" action="https://mailthis.to/jinminetics@gmail.com">
                            <Field name="likes" validate={inputsProgram.likes.validate}>
                                {({ field, form }) => (
                                <FormControl id="likes" isRequired 
                                mb="15px !important">
                                    <FormLabel>{t("interest-label")}</FormLabel>
                                    <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center">
                                        {
                                            (services || []).map((v, index) => {
                                                return (
                                                    <Checkbox name="likes" onChange={handleChange} display="block" key={`contact-form-service-${index}`} w={{base: "100%", md: "50%"}} 
                                                    m={{base: "5px 0px !important", md: "0px !important"}} p={{base: "0px !important", md: "4px !important"}}>
                                                        {v.title}
                                                    </Checkbox>
                                                )
                                            })
                                        }
                                    </HStack>
                                    <FormErrorMessage>{form.errors.likes}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            
                            <Flex flexDirection={{base: "column", md: "row"}} 
                            justifyContent={{base: "flex-start", md: "space-between"}} alignItems="flex-start">
                                <Field name="name" validate={inputsProgram.name.validate} pr={{base: "0px", md: "15px"}}>
                                    {({ field, form }) => (
                                        <FormControl id="name" onChange={handleChange} isInvalid={form.errors.name && form.touched.name} isRequired 
                                        mr={{base: "0px", md: "15px !important"}} mb={{base: "15px !important", md: "0px"}}>
                                            <Input {...field} placeholder={t("name-title")} />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="email" validate={inputsProgram.email.validate}>
                                    {({ field, form }) => (
                                        <FormControl id="email" onChange={handleChange} isInvalid={form.errors.email && form.touched.email} isRequired >
                                            <Input {...field} placeholder={t("email-title")} />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Flex>
                            <Field name="desc" validate={inputsProgram.desc.validate}>
                                {({ field, form }) => (
                                    <FormControl id="desc" onChange={handleChange} isInvalid={form.errors.desc && form.touched.desc} isRequired 
                                    mt="15px !important">
                                        <Textarea {...field} placeholder={t("message-title")} onChange={handleChange} isRequired />
                                        <FormErrorMessage>{form.errors.desc}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Flex mt="15px !important" flexDirection={{base: "column", md: "row"}} 
                            justifyContent={{base: "flex-start", md: "space-between"}} alignItems="flex-start">
                                <VStack justifyContent="flex-start" alignItems="flex-start">
                                    <Text as="div" display="flex" justifyContent="left" alignItems="center" color={colorAccent} textTransform="uppercase" 
                                    whiteSpace="nowarap" overflow="hidden" textOverflow="ellipsis"
                                    borderRadius="4px" fontWeight="600" lineHeight="1.5" pos="relative"
                                    cursor="pointer" _hover={{
                                        color: colorAccentInverse,
                                        textDecoration: "none  !important"
                                    }}>
                                        <Text as="span" mr="4px">{t("attach-file")}</Text> <FaPaperclip />
                                    </Text>
                                    <TextView fontSize="12px" color="#7d8995">{t("file-rules")}</TextView>
                                </VStack>

                                <BTN
                                bg={colorAccent} color={"#fff"}
                                textTransform="uppercase"
                                isLoading={isSubmitting}
                                type="submit" _hover={{
                                    bg: colorAccentInverse,
                                    color: "#fff !important",
                                    textDecoration: "none  !important"
                                }}>
                                    {t("submit-text")}
                                </BTN>
                            </Flex>
                        </Form>
                    )}
            </Formik> */}
        </VStack>
    )
}
/**
 * https://formik.org/docs/overview
 * https://chakra-ui.com/docs/form/form-control
 * https://www.youtube.com/watch?v=oiNtnehlaTo
 */