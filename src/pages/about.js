import AboutPage from "../components/pages/about/"
import getTables from "../next-data/get-tables"
import { useEffect, useState } from "react"
import { STATUS_CODES } from "../next-data"
import { API_OPTIONS } from "./api/[...v1]"


const About = ({siteInfo, customersList}) => {

    const [projectsCounts, setProjectsCounts] = useState(0)
    const [citiesCounts, setCitiesCounts] = useState(0)

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        setProjectsCounts(siteInfo.totalProjects || 0)
        setCitiesCounts(siteInfo.totalCities || 0)
    }, [siteInfo])
    useEffect(() => {
        setCustomers(customersList || [])
    }, [customersList])

    return <AboutPage projectsCounts={projectsCounts} citiesCounts={citiesCounts} customers={customers} />
}

export default About

export const getServerSideProps = async ({ params, req, locale, query }) => {
    
    var props = {}
    var redirect = null

    var viewer = {}
    
    const { Project } = getTables(API_OPTIONS.dbInfo, ["Project"], locale)
    
    try {
        
        const totalProjects = await Project.count()

        const totalCities = await Project.count({
            distinct: true,
            col: "cityId"
        })

        const customersList = await Project.findAll({
            order: [
                ['priority', 'ASC'],
                ['title', 'DESC']
            ],
            limit: 7,
            attributes: ["lightBgLogo", "darkBgLogo"]
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
                siteInfo: {
                    totalProjects: totalProjects,
                    totalCities: totalCities
                },
                customersList: customersList,
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