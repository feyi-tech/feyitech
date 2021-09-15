import groq from 'groq'
import SingleBlogPost from "../../components/pages/blog/SingleBlogPost"
import { sanityClient } from "../../cms/index"
import { get } from "jquery"

const SinglePost = (props) => {
    console.log("CMS.props", props)

    return (
        <SingleBlogPost {...props} />
    )
}

const getBlogPostToRender = async (count, related, slug) => {
  let query;
  let params;

  if(!related || related.length == 0) {
    query = groq`*[_type == "post"] | order(_updatedAt desc){
      slug
    }[0...$count]`
    params = {count}

  } else {
    query = groq`*[_type == "post" && slug.current != $slug ] | order(_updatedAt desc){
      slug
    }[0...$count]`
    params = {count, slug}
  }

  let r
  try {
      r = await sanityClient.fetch(query, params)

  } catch (e) {
      console.log("CMZ.postsError", e)
  }
  console.log(`CMZ.posts`, r)
  return r
}

 // assumes 5 characters as mean word length
 // https://ux.stackexchange.com/questions/22520/how-long-does-it-take-to-read-x-number-of-characters
 // Words per minute: 180
export const getStaticProps = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    console.log("CMZZ.query", context.query?.slug, "CMZZ.query", context.params?.slug)
    
  var slug = context.query?.slug || context.params?.slug
  var maxRelated = parseInt(process.env.POSTS_PER_PAGE)
  const r = await sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug]{
        slug, mainImage, title, body, _createdAt, _updatedAt, publishedAt, 
        "authorName": author->name, "authorPhoto": author->image, "authorBio": author->bio,
        "categories": categories[]->title, 
        "estimatedReadingMinute": round(length(pt::text(body)) / 5 / 180 ),
        "relatedPosts": *[_type == "post" && slug.current != $slug] | order(_updatedAt desc) {
          slug, title
        }[0...$maxRelated]
    }[0]
  `, { slug, maxRelated })
  
  if(r) {
    //r.related = await getBlogPostToRender(parseInt(process.env.POSTS_PER_PAGE), r.categories, slug)

  }
  return {
    props: r,/*
    revalidate: parseInt(process.env.CACHE_TTL),*/
  };
}


// pages/products/[id].js

export async function getStaticPaths() {
  console.log("POSTS.ENV", process.env.TOTAL_CACHED_PER_BUILD)
    const posts = await getBlogPostToRender(parseInt(process.env.TOTAL_CACHED_PER_BUILD));
    const paths = posts.map((post) => ({
      params: { slug: post.slug.current },
    }));
  
    return { paths, fallback: 'blocking' };
}

export default SinglePost