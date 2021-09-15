import groq from 'groq'
import BlogPage from "../../components/pages/blog/"
import { sanityClient } from "../../cms/index"


const Blog = (props) => {
    return <BlogPage {...props} />
}

const getBlogPostToRender = async (count) => {
    const query = groq`*[_type == "post"] | order(_updatedAt desc){
        title, mainImage, slug, bodyPreview, _createdAt, _updatedAt, publishedAt
    }[0...$count]`

    let r
    var slug = "how-to-number-2"
    try {
        r = await sanityClient.fetch(query, {count})

    } catch (e) {
        console.log("CMZ.postsError", e)
    }
  console.log(`CMZ.posts`, r)
  return r
}


export const getStaticProps = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
  const { page = "" } = context.query || {}
  const r = await getBlogPostToRender(parseInt(process.env.POSTS_PER_PAGE))
  console.log(`CMS.POSTS: ${page}, CMS.POSTS.LIST = ${r? JSON.stringify(r) : null}`)
  return {
    props: {
      posts: r
    },/*
    revalidate: parseInt(process.env.CACHE_TTL),*/
  };
}

export default Blog