import ServicesPage from "../components/pages/services/"
import getTables from "../next-data/get-tables"
import { useEffect, useState } from "react"
import { STATUS_CODES } from "../next-data"
import { API_OPTIONS } from "./api/[...v1]"


const Services = ({servicesList, workProcessesList}) => {


    const [services, setServices] = useState(servicesList || [])
    useEffect(() => {
        console.log("SVC:1", servicesList)
        setServices(servicesList || [])
    }, servicesList)

    const [workProcesses, setWorkProcesses] = useState(workProcessesList || [])
    useEffect(() => {
        console.log("WRK:1", workProcessesList)
        setWorkProcesses(workProcessesList || [])
    }, workProcessesList)

    return <ServicesPage servicesList={services} workProcessesList={workProcesses} />
}

export default Services


export const getServerSideProps = async ({ params, req, locale, query }) => {
    
    var props = {}
    var redirect = null

    var viewer = {}
    
    const { Service, Tech, TechUsed, WorkProcess } = getTables(API_OPTIONS.dbInfo, ["Service", "Tech", "TechUsed", "WorkProcess"], locale)
    
    try {

        Service.belongsToMany(Tech, {through: TechUsed, foreignKey: 'serviceId', as: 'techs'})
        Tech.belongsToMany(Service, {through: TechUsed, foreignKey: 'techId', as: 'services'})

        TechUsed.belongsTo(Service, {foreignKey: 'serviceId'})
        TechUsed.belongsTo(Tech, {foreignKey: 'techId'})
        
        const svs = await Service.findAll({
            order: [
                ['priority', 'ASC'],
                ['title', 'DESC']
            ],
            include: ["techs"]
        })

        const wrk = await WorkProcess.findAll({
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
                workProcessesList: wrk,
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