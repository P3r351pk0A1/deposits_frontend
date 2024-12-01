import { FC, useEffect, useState } from 'react'
import { useRef } from 'react'

import { MiningServicesInfo, getMiningServicesByName } from '../modules/miningServiceApi'
import { MINING_SERVICES_MOCK } from '../modules/mock'

import MiningServiceCard from '../components/miningServiceCard'
import { Container} from 'react-bootstrap'

import '../assets/css/miningServicesPage.css'
import InputField from '../components/inputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS } from '../modules/Routes'

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

    const carouselRef = useRef<HTMLDivElement>(null)

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -260, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 260, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        updateMiningServices()
        return () => {
        }
    }, [])

    const handleSearch = () => {
        updateMiningServices()
        console.log(4)
    }

    return (
        <>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.MINING_SERVICES}]}></BreadCrumbs>
                   
                        <InputField
                            value={searchMiningService} 
                            setValue={setSearchMiningService} 
                            onSubmit={handleSearch} 
                            loading={loading} 
                            placeholder='Поиск по названию работ'>
                        </InputField>

                            <Container className="d-flex flex-wrap container-fluid g-4 justify-content-center w-100 gap-4 mt-5" style={{ maxWidth: '770px' }}>
                                <button onClick={scrollLeft} className="carousel-control-prev">‹</button>
                                <div ref={carouselRef} className="d-flex overflow-auto" style={{ maxWidth: '100%' }}>
                                    {mining_services.map((service, index) => (
                                        <div key={`${service.id}-${index}`} className="flex-shrink-0" style={{ height: '400px', minWidth: '250px', maxWidth: '250px', margin: '0 10px' }}>
                                            <MiningServiceCard {...service} />
                                        </div>
                                    ))}

                                </div>
                                <button onClick={scrollRight} className="carousel-control-next">›</button>
                                <div style={{ width: '100%', height: '50px', backgroundColor: 'white', marginTop: '-50px' }}></div>
                            </Container>
                            


            
        </>
    )
}

export default MiningServicesPage