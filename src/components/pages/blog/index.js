import { Box, HStack, VStack, Text, Image, useColorModeValue } from "@chakra-ui/react"
import PageBody from "../../widgets/PageBody"
import ExpandCollapse from 'react-expand-collapse';
import Container from "../../widgets/Container";
import { urlFor } from "../../../cms";
import Link from "../../widgets/Link";

const Post = ({title, slug, mainImage, bodyPreview, _createdAt, _updatedAt, publishedAt}) => {

    return (
        <VStack as={Link} href={`/blog/${slug.current}`} justifyContent="flex-start" alignItems="flex-start" w={{base: "100%", md: "50%"}} m="0px !important" mb="25px">
            <Image src={urlFor(mainImage)} />
            <Text>{title}</Text>
            <Text>{bodyPreview}</Text>
        </VStack>
    )
}
const BlogPage = ({posts}) => {

    return (
        <PageBody>
            <Container>
                <HStack pos="relative" justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
                    {
                        (posts || []).map((post, index) => {
                            return <Post {...post} key={index} />
                        })
                    }
                </HStack>
            </Container>
        </PageBody>
    )
}

export default BlogPage