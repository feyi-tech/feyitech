import { Flex, Text, VStack } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import Container from "../../widgets/Container"
import FooterContactForm from "../../widgets/FooterContactForm"
import PageBody from "../../widgets/PageBody"
import HomePage from "../home"

//https://www.rascasone.com/en/projects
const ProjectsPage = ({projectsList, servicesList}) => {
    const { t } = useTranslation("projects")

    const [projects, setProjects] = useState(projectsList || [])
    useEffect(() => {
        setProjects(projectsList || [])
    }, projectsList)

    const [services, setServices] = useState(servicesList || [])
    useEffect(() => {
        setServices(servicesList || [])
    }, servicesList)


    return (
        <PageBody link="/projects" title={t('title')} description={t('desc')}>
            <Container>
                <VStack w={{base: "100%", md: "50%"}} justifyContent="flex-start" alignItems="flex-start" mb="95px">
                    <Text as="h2" fontSize="2.2rem" textTransform="uppercase" 
                    color="#3929c5" lineHeight="1.1" fontWeight="bold" mb="2rem">
                        {t('title')}
                    </Text>
                    <Text as="p" mb="9rem" fontSize="1.08rem">
                        {t("desc")}
                    </Text>
                </VStack>
                <Flex w="100%" flexWrap="wrap">
                    {
                        projects.map((v, index) => {
                            return (
                                <HomePage.Project key={`project-${index}`} {...v} />
                            )
                        })
                    }
                </Flex>
            </Container>
            <FooterContactForm services={services} />
        </PageBody>
    )
}

export default ProjectsPage