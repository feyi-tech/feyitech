import ContactPage from "../components/pages/contact/"
import getTables from "../next-data/get-tables"
import { useEffect, useState } from "react"
import { STATUS_CODES } from "../next-data"
import { API_OPTIONS } from "./api/[...v1]"

const Contact = ({servicesList}) => {


    const [services, setServices] = useState(servicesList || [])
    useEffect(() => {
        console.log("SVC:1", servicesList)
        setServices(servicesList || [])
    }, servicesList)
    
    return <ContactPage servicesList={services} />
}

export default Contact

export const getServerSideProps = async ({ params, req, locale, query }) => {
    
    var props = {}
    var redirect = null

    var viewer = {}
    
    const { Service } = getTables(API_OPTIONS.dbInfo, ["Service"], locale)
    
    try {
        
        const svs = await Service.findAll({
            order: [
                ['priority', 'ASC'],
                ['title', 'DESC']
            ],
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
                servicesList: svs,
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