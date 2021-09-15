import { STATUS_CODES } from "../../../next-data"
import Endpoint from "../../../next-data/utils/endpoint"

const REQUIRE_SESSION_ERROR = "common:AUTH_REQUIRED"
const REQUIRE_CAPTCHA_ERROR = "common:CAPTCHA_REQUIRED"

const endpoints = [
    //GET: http://dev.domain.com:2000/api/v1/projects?locale=en
    //GET: http://dev.domain.com:2000/api/v1/projects?locale=en&for_sale_only=1
    Endpoint.Get({
        id: "projects",
        requiredTables: ['Project'],
        expectedData: {
            for_sale_only: { 
                clean: data => {
                    return {value: isNaN(data) || parseInt(data) < 0? 2 : parseInt(data)}

                }
            }
        },
        respond: async ({tables, expectedData}) => {
            const { Project } = tables
            const { for_sale_only } = expectedData

            const response = await Project.findAll({
                where: for_sale_only? { forSale: 1 } : {},
                order: [
                    ['priority', 'ASC'],
                    ['title', 'DESC']
                ]
            })
            if (response) {
                // If status field is not provided, 200 will be returned
                return Promise.resolve({
                    data: response
                })
            } else {
    
                return Promise.resolve({
                    status: STATUS_CODES.BAD_REQUEST,
                    data: response
                })
            }
        }
        
    }),
    //GET: http://dev.domain.com:2000/api/v1/services?locale=en
    Endpoint.Get({
        id: "services",
        requiredTables: ['Service', 'Tech', 'TechUsed'],
        respond: async ({tables}) => {
            const { Service, Tech, TechUsed } = tables

            try {
                Service.belongsToMany(Tech, {through: TechUsed, foreignKey: 'serviceId', as: 'techs'})
                Tech.belongsToMany(Service, {through: TechUsed, foreignKey: 'techId', as: 'services'})

                TechUsed.belongsTo(Service, {foreignKey: 'serviceId'})
                TechUsed.belongsTo(Tech, {foreignKey: 'techId'})
                
                const response = await Service.findAll({
                    order: [
                        ['priority', 'ASC'],
                        ['title', 'DESC']
                    ],
                    include: ["techs"]
                })

                if(response) {
                    return Promise.resolve({
                        data: response
                    })

                } else {
                    return Promise.resolve({
                        data: []
                    })
                }

            } catch(e) {console.log("E:::", e)
                return Promise.resolve({
                    status: JSON.stringify(e),
                    data: []
                })
            }
        }
        
    }),
    Endpoint.UploadFileAndJson({
        id: "contact",
        cors: [],
        captchaRequired: REQUIRE_CAPTCHA_ERROR,/*
        expectedFiles: {
            fileOp: {
                rename: ({noExtFilename, filePath}) => {
                    var sizeOf = require('image-size');
                    var dimensions = sizeOf(filePath);
                    return `${noExtFilename}${IMAGE_FILENAME_AND_DIMENSIONS_SEPERATOR}${dimensions.width}${IMAGE_DIMENSIONS_SEPERATOR}${dimensions.height}`
                }
            },
            required: formRules[formRulesKeys.ProfileSettings].photos.required,
            min: [1, 'min-photos'],//the same as required: just here for reference purpose
            max: formRules[formRulesKeys.ProfileSettings].photos.maxLength,
            maxFileSize: [1024 * 1024 * 10, ERROR_KEYS.fileTooLarge],//size in bytes,//max od 10mb per file
            uploadDir: staticPath("uploads/profile"),
            mimes: formRules[formRulesKeys.ProfileSettings].photos.validTypes
        },
        requiredTables: ['Contact'],
        respond: async ({tables, expectedFiles}) => {
            const {User } = tables
            
            var userId = session?.user.id
        }*/
    }),
    //GET: http://dev.domain.com:2000/api/v1/packages?locale=en
    Endpoint.Get({
        id: "packages",
        requiredTables: ['Package', 'Project', 'Feature', 'PackageProject', 'PackageFeature'],
        respond: async ({tables}) => {
            const { Package, Project, Feature, PackageProject, PackageFeature } = tables

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

                console.log("PCK", response)

                if(response) {
                    return Promise.resolve({
                        data: response
                    })

                } else {
                    return Promise.resolve({
                        data: []
                    })
                }

            } catch(e) {console.log("E:::", e)
                return Promise.resolve({
                    status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                    data: JSON.stringify(e)
                })
            }
        }
        
    }),
]

export default endpoints