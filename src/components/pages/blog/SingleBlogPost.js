import { Flex, Text, Box, VStack, HStack, useColorModeValue, Image } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import Trans from "next-translate/Trans"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Container from "../../widgets/Container"
import PageBody from "../../widgets/PageBody"
import CodeView from "../../widgets/code-view"
import { buildSerializers, PortableText, urlFor } from "../../../cms"
import SplitLayout from "../../widgets/SplitLayout"
import { FaFacebook, FaFacebookSquare, FaLinkedin, FaLinkedinIn, FaTwitter, FaTwitterSquare } from "react-icons/fa"
import Link from "../../widgets/Link"

import ReactTimeAgo from 'react-time-ago'
import ViewAs from "../../widgets/ViewAs"


const SingleBlogPost = ({
    slug, mainImage, title, body, estimatedReadingMinute, _createdAt, _updatedAt, publishedAt, 
    authorName, authorPhoto, authorBio, categories, relatedPosts}) => {
    const { t, lang} = useTranslation("single-blog-post")

    const router = useRouter()
    const theme = useColorModeValue(CodeView.themes.light, CodeView.themes.dark)

    const code = `
    import React from "react";
    import uniquePropHOC from "./lib/unique-prop-hoc";

    // this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

    class Expire extends React.Component {
        constructor(props) {
            super(props);
            this.state = { component: props.children }
        }
        componentDidMount() {
            setTimeout(() => {
                this.setState({
                    component: null
                });
            }, this.props.time || this.props.seconds * 1000);
        }
        render() {
            return this.state.component;
        }
    }

    export default uniquePropHOC(["time", "seconds"])(Expire);
      `

    return (
        <PageBody link="/projects" title={t('title')} description={t('desc')}>
            <Container>
                <Box w="100%">
                    <Text as="h2" fontSize="2.7rem" textTransform="uppercase" lineHeight="1.2" mb="2rem" fontWeight="bold" color="#27C827">{title}</Text>
                    <Box as="hr" w="100%" m="0px !important" mb="20px !important" />
                    <SplitLayout mt="3rem !important">
                        <SplitLayout.First as={VStack} justifyContent="flex-start" alignItems="flex-start">
                            <Text as="div" fontSize="24px" lineHeight="48px" fontWeight="bold">
                                {authorName}
                            </Text>
                            <Text as="div" fontSize="20px" lineHeight="36px" fontWeight="500">
                                <Text as="span" opacity="0.7">{t("updated")}</Text>: <ReactTimeAgo date={new Date(_updatedAt)} locale={lang} />
                                <Trans i18nKey="single-blog-post:read-estimate" components={[
                                    <Text as="span"> . {estimatedReadingMinute}</Text>
                                ]} />
                            </Text>
                        </SplitLayout.First>
                        <SplitLayout.Second as={HStack} justifyContent={{base: "flex-start", md: "flex-end"}} alignItems={{base: "flex-start", md: "center"}}>
                            <Box as={Link} href="#">
                                <FaFacebookSquare size="24px" color="#27C827" />
                            </Box>
                            <Box as={Link} href="#" ml="1.32rem !important">
                                <FaTwitterSquare size="24px" color="#27C827" />
                            </Box>
                            <Box as={Link} href="#" ml="1.32rem !important">
                                <FaLinkedin size="24px" color="#27C827" />
                            </Box>
                        </SplitLayout.Second>
                    </SplitLayout>
                    <SplitLayout mt="3rem !important" mobileReverse>
                        <SplitLayout.First w={{base: "100%", md: "25%"}} minH="100vh" as={VStack} justifyContent="flex-start" alignItems="flex-start" 
                        >
                            <VStack justifyContent="flex-start" alignItems="flex-start" 
                            pos={{base: "relative", md: "sticky"}} 
                            top="2vh" w="100%" pr="5rem" mb="3vh">
                                <Text as="div" fontWeight="bold" fontSize="17px" lineHeight="30px" textTransform="uppercase">
                                    Related posts
                                </Text>
                                <Box as="ul" m="1.2rem 0 !important">
                                {
                                    (relatedPosts || []).map((post, index) => {
                                        return <Box as={Link} fontWeight="600" fontSize="17px" 
                                        lineHeight="20px" m="10px 0 !important" overflow="hidden" textOverflow="..." 
                                        hoverMode key={index} href={`/blog/${post.slug.current}`}>{post.title}</Box>
                                    })
                                }
                                </Box>
                            </VStack>
                        </SplitLayout.First>
                        <SplitLayout.Second w={{base: "100%", md: "75%"}} minH="100vh" pr="15px !important" as={Box} 
                        justifyContent={{base: "flex-start", md: "flex-end"}} alignItems={{base: "flex-start", md: "center"}}>
                            <VStack as="div" justifyContent="flex-start" alignItems="flex-start" w="100%">
                                <Text as="figure">
                                    <Image src={urlFor(mainImage).url()} w="100%" h="auto" m="20px 0px !important" />
                                </Text>
                                <Text as="div" w="100%" maxW="100%">
                                    <PortableText blocks={body} theme={theme} imageOptions={{w: 320, h: 240, fit: 'max'}} 
                                    serializers={buildSerializers({theme, t})} />
                                </Text>

                                <Box as="hr" w="100%" m="0px !important" m="20px 0px !important" />

                                <HStack justifyContent="flex-start" alignItems="flex-start" mb="50px !important">
                                    <Image src={urlFor(authorPhoto).url()} mr="20px" w="96px" h="96px" objectFit="cover" borderRadius=".75rem" />
                                    <VStack justifyContent="flex-start" alignItems="flex-start">
                                        <Text as="div" fontWeight="700">{authorName}</Text>
                                        <PortableText blocks={authorBio} theme={theme} />
                                    </VStack>
                                </HStack>
                            </VStack>
                        </SplitLayout.Second>
                    </SplitLayout>
                </Box>
            </Container>
        </PageBody>
    )
}

export default SingleBlogPost