const { getSession } = require('next-auth/client')
import { FaGalacticSenate } from "react-icons/fa"
import Feature from "../../database/models/Feature"
import Package from "../../database/models/Package"
import PackageFeature from "../../database/models/PackageFeature"
import PackageProject from "../../database/models/PackageProject"
import Project from "../../database/models/Project"
import ProjectFeature from "../../database/models/ProjectFeature"
import ProjectTech from "../../database/models/ProjectTech"
import Service from "../../database/models/Service"
import Tech from "../../database/models/Tech"
import TechUsed from "../../database/models/TechUsed"
import WorkProcess from "../../database/models/WorkProcess"
import NextData from "../../next-data"
import endpoints from "./endpoints/v1"

const dbCredentials = {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}

const tablesMap = {
    Project: Project,
    Service: Service,
    Tech: Tech,
    TechUsed: TechUsed,
    WorkProcess: WorkProcess,
    Feature: Feature,
    Package: Package,
    ProjectFeature: ProjectFeature,
    ProjectTech: ProjectTech,
    PackageFeature: PackageFeature,
    PackageProject: PackageProject
}

export const API_OPTIONS = {
    debug: false,
    dbInfo: {
        credentials: dbCredentials,
        API_OPTIONS: {},
        tablesMap: tablesMap
    },
    endpoints: endpoints,
    captchaProvider: {

    },
    onSessionRequest: req => {//return a promise that resolve to the user info
        return getSession({req})
    }
}

const Data = (req, res) => {
    if(process.env.NODE_ENV === 'production' || !API_OPTIONS.debug) {
        console.log = () => {}
    }

    NextData(req, res, API_OPTIONS)
}

export const config = {
    api: {
      bodyParser: false,
    },
}
  
export default Data

/**dependencies
 * const Sequelize = require("sequelize")
 * const multer = require('multer');
const mime = require('mime-types')
const uniqueFilename = require('unique-filename')
const  bodyParser = require('body-parser')

"mysql": "^2.18.1",
"mysql2": "^2.2.5",
 */