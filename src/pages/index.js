import { useEffect, useState } from "react"
import HomePage from "../components/pages/home/"
import { STATUS_CODES } from "../next-data"
import getTables from "../next-data/get-tables"
import { API_OPTIONS } from "./api/[...v1]"


const Home = ({projectsList}) => {

    const [projects, setProjects] = useState(projectsList || [])

    useEffect(() => {
        setProjects(projectsList || [])
    }, projectsList)
    return <HomePage projectsList={projects} />
}

export default Home

export const getServerSideProps = async ({ params, req, locale, query, forSaleOnly }) => {
    
    var props = {}
    var redirect = null

    var viewer = {}
    
    const { Project } = getTables(API_OPTIONS.dbInfo, ["Project"], locale)
    
    try {

        console.log("QQQ:", query)

        const response = await Project.findAll({
            where: forSaleOnly? { forSale: 1 } : {},
            order: [
                ['priority', 'ASC'],
                ['title', 'DESC']
            ]
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
                projectsList: response,
                viewer: viewer
              }
            ))
            console.log("PROPSZ:", props)
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