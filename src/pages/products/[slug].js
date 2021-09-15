import { useRouter } from "next/router"
import SingleProductPage from "../../components/pages/products/SingleProductPage"
import { buildProductLink, destroySlugLink } from "../../utils/f";

import { STATUS_CODES } from "../../next-data"
import getTables from "../../next-data/get-tables"
import { API_OPTIONS } from "../api/[...v1]"
import { useEffect, useState } from "react";
const Sequelize = require("sequelize")

const SingleProduct = ({product}) => {

    const router = useRouter()

    const { slug } = router.query;

    console.log("Slug:", slug)

    const [thisProduct, setThisProduct] = useState(product || {})
    useEffect(() => {
        setThisProduct(product)
    }, product)

    return (
        <SingleProductPage 
        id={thisProduct.id}
        name={thisProduct.name} 
        desc={thisProduct.desc} 
        sellingPrice={thisProduct.sellingPrice}
        screenshotFull={thisProduct.screenshotFull}
        screenshotMobile={thisProduct.screenshotMobile}
        demoLink={thisProduct.link || ""}
        latestVersion={thisProduct.latestVersion}
        latestVersionDate={thisProduct.updatedAt}
        features={thisProduct.features || []} 
        techs={thisProduct.techs || []} />
    )
}


export async function getServerSideProps({ params, query, req, locale, res }) {
    const { slug } = query
    console.log("PPP:4", slug)
    const linkShreds = destroySlugLink(slug)
    
    var props = {}
    var redirect = null
    var viewer = {}

    const { Project, Feature, Tech, ProjectFeature, ProjectTech } = getTables(API_OPTIONS.dbInfo, ["Project", "Feature", "Tech", "ProjectFeature", "ProjectTech"], locale)
    
    try {

        //features
        Project.belongsToMany(Feature, {through: ProjectFeature, foreignKey: 'projectId', as: 'features'})
        //Feature.belongsToMany(Project, {through: ProjectFeature, foreignKey: 'featureId', as: 'projects'})
        ProjectFeature.belongsTo(Feature, {foreignKey: 'featureId'})

        //techs
        Project.belongsToMany(Tech, {through: ProjectTech, foreignKey: 'projectId', as: 'techs'})
        //Feature.belongsToMany(Project, {through: ProjectFeature, foreignKey: 'featureId', as: 'projects'})
        ProjectTech.belongsTo(Tech, {foreignKey: 'techId'})
        
        const response = await Project.findOne({
            where: Sequelize.and({forSale: 1}, {id: linkShreds.id}),
            include: ["features", "techs"]
        })

        console.log("PPP:", slug, linkShreds, JSON.stringify(response))

        var pageLinkChecked = buildProductLink(response.name, response.id)
            
        
        if(linkShreds.slug != destroySlugLink(pageLinkChecked).slug) {console.log("G:::!", pageLinkChecked)
            redirect = pageLinkChecked

        }

        if(props.errorCode) {
            if(props.errorCode == STATUS_CODES.NOT_FOUND) return {notFound: true}
            return {
                redirect: {
                    destination: `/errors/${props.errorCode}`,
                    permanent: false,
                }
            }
    
        } else if(redirect) {
            return {
                redirect: {
                  destination: redirect,
                  permanent: true,
                }
            }
    
        } else {
            props = JSON.parse(JSON.stringify(
              {
                product: response,
                viewer: viewer
              }
            ))
            console.log("PROPSZ:PACKAGES", props)
            return {
                props: props
            }
        }

    } catch(e) {
        console.log("Projects", "SERVER_ERROR", e)
        return {
            redirect: {
                destination: `/errors/${STATUS_CODES.INTERNAL_SERVER_ERROR}`,
                permanent: false,
            }
        }
    }

}

export default SingleProduct