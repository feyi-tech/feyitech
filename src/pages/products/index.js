import { useEffect, useState } from "react"
import { getServerSideProps as getProps } from "../"
import ProductsPage from "../../components/pages/products/"
import getTables from "../../next-data/get-tables"
import { API_OPTIONS } from "../api/[...v1]"


const Products = ({productsList, servicesList}) => {
    const [products, setProducts] = useState(productsList || [])
    useEffect(() => {
        setProducts(productsList || [])
    }, productsList)

    const [services, setServices] = useState(servicesList || [])
    useEffect(() => {
        setServices(servicesList || [])
    }, servicesList)

    return <ProductsPage products={products} services={services} />
}

export default Products

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
    var props = await getProps({...context, forSaleOnly: true})
    var svs = await getServices(context)
    if(props && props.props) {
        props.props.productsList = JSON.parse(JSON.stringify(props.props.projectsList || []))
        delete props.props.projectsList
        props.props.servicesList = JSON.parse(JSON.stringify(svs || []))
    }

    console.log("PROPZ:Prod", props)
    return props
}