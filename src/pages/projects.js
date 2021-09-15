import { useEffect, useState } from "react"
import { getServerSideProps as getProps } from "."
import ProjectsPage from "../components/pages/projects/"
import getTables from "../next-data/get-tables"
import { API_OPTIONS } from "./api/[...v1]"
//import { getServices } from "./products"


const Projects = ({projectsList, servicesList}) => {
    const [projects, setProjects] = useState(projectsList || [])
    useEffect(() => {
        setProjects(projectsList || [])
    }, projectsList)

    const [services, setServices] = useState(servicesList || [])
    useEffect(() => {
        setServices(servicesList || [])
    }, servicesList)

    return <ProjectsPage projectsList={projects} servicesList={services} />
}

export default Projects


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

export const getServerSideProps = async (context) => {
    var props = await getProps(context)
    var svs = await getServices(context)
    if(props && props.props) {
        props.props.servicesList = JSON.parse(JSON.stringify(svs || []))
    }

    console.log("PROPZ:", props)
    return props
}