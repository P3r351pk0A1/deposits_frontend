import { FC, useEffect, useState} from 'react'

import { MiningServicesInfo, getMiningServicesByName } from '../modules/miningServiceApi'
import { MINING_SERVICES_MOCK } from '../modules/mock'

import MiningServiceCard from '../components/miningServiceCard'
import { Container} from 'react-bootstrap'

import '../assets/css/miningServicesPage.css'
import InputField from '../components/inputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS } from '../modules/Routes'
import NavbarComponent  from '../components/NavBar'
const MiningServicesPage: FC = () => {

    const [loading, setLoading] = useState(false)
    const [mining_services, setMiningServices] = useState<MiningServicesInfo[]>([])
    const [searchMiningService, setSearchMiningService] = useState('')

    const updateMiningServices = () => {
        setLoading(true)
        getMiningServicesByName(searchMiningService).then((response) => {
            setMiningServices(response.Services)
            setLoading(false)
        }).catch(() => {
            let mining_servicess: MiningServicesInfo[] = []
            MINING_SERVICES_MOCK.Services.forEach((m_service) => {
                if (m_service.name.includes(searchMiningService))
                    mining_servicess.push(m_service)
            })
            setMiningServices(mining_servicess)
            setLoading(false)
        })
    }

    useEffect(() => {
        updateMiningServices()
        return () => {
        }
    }, [searchMiningService])

    const handleSearch = (value: string) => {
        setSearchMiningService(value)  
    }

    return (
        <>
        <NavbarComponent/>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.MINING_SERVICES}]}></BreadCrumbs>
                    <InputField 
                        value={searchMiningService} 
                        setValue={setSearchMiningService} 
                        onSubmit={handleSearch} 
                        loading={loading} 
                        placeholder="Поиск горных работ" 
                    />
                            <Container className="d-flex flex-wrap container-fluid g-4 justify-content-center w-100 gap-4 mt-5" >
                                    {mining_services.map((service, index) => (
                                        <div key={`${service.id}-${index}`} className="flex-shrink-0" style={{ height: '400px', minWidth: '250px', maxWidth: '250px', margin: '0 10px' }}>
                                            <MiningServiceCard {...service} />
                                        </div>
                                    ))}
                                <div style={{ width: '100%', height: '50px', backgroundColor: 'white', marginTop: '-50px' }}></div>
                            </Container>
        </>
    )
}

export default MiningServicesPage