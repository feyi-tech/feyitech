import { useEffect, useState } from "react"
import PackagesPage from "../components/pages/packages/"
import { STATUS_CODES } from "../next-data"
//import { getServices } from "./products"
import getTables from "../next-data/get-tables"
import { API_OPTIONS } from "./api/[...v1]"


const Packages = ({packagesList, servicesList}) => {
    const [packages, setPackages] = useState(packagesList || [])
    useEffect(() => {
        setPackages(packagesList || [])
    }, packagesList)

    const [services, setServices] = useState(servicesList || [])
    useEffect(() => {
        setServices(servicesList || [])
    }, servicesList)

    return <PackagesPage packages={packages} services={services} />
}

export default Packages


const getServices = async ({ params, req, locale, query }) => {
    const { Service } = getTables(API_OPTIONS.dbInfo, ["Service"], locale)
    
    try {
        
        const svs = await Service.findAll({
            order: [
                ['priority', 'ASC'],
                ['title', 'DESC']
            ],
        })

        return svs

    } catch(e) {
        return null
    }
}

export const getServerSideProps = async ({ params, req, locale, query, ...propz }) => {
    
    var props = {}
    var redirect = null

    var viewer = {}
    
    const { Package, Project, Feature, PackageProject, PackageFeature } = getTables(API_OPTIONS.dbInfo, ["Package", "Project", "Feature", "PackageProject", "PackageFeature"], locale)
    
    try {

        //features
        Package.belongsToMany(Feature, {through: PackageFeature, foreignKey: 'packageId', as: 'features'})
        //Feature.belongsToMany(Package, {through: PackageFeature, foreignKey: 'featureId', as: 'packages'})
        PackageFeature.belongsTo(Package, {foreignKey: 'packageId'})
        PackageFeature.belongsTo(Feature, {foreignKey: 'featureId'})
        //projects as products
        Package.belongsToMany(Project, {through: PackageProject, foreignKey: 'packageId', as: 'products'})
        //Project.belongsToMany(Package, {through: PackageProject, foreignKey: 'projectId', as: 'packages'})
        PackageProject.belongsTo(Package, {foreignKey: 'packageId'})
        PackageProject.belongsTo(Project, {foreignKey: 'projectId'})
        
        const response = await Package.findAll({
            order: [/*
                ["priority", 'ASC'],*/
                ['price', 'ASC'],
                ['name', 'DESC']
            ],
            include: ["features", "products"]
        })

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
                packagesList: response,
                servicesList: await getServices({ params, req, locale, query, ...propz }) || [],
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