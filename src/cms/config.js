

const sanityConfig = {
    projectId: '6ft38s1x', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    apiVersion: '2021-09-07', // use current UTC date - see "specifying API version"!
    token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
    useCdn: process.env.NODE_ENV === 'production' // `false` if you want to ensure fresh data
}
export default sanityConfig