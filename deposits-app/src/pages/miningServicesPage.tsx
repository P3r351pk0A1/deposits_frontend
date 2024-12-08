import { FC, useEffect, useState} from 'react'
import { useRef } from 'react'

import { MiningServicesInfo, getMiningServicesByName } from '../modules/miningServiceApi'
import { MINING_SERVICES_MOCK } from '../modules/mock'

import MiningServiceCard from '../components/miningServiceCard'
import { Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../assets/css/miningServicesPage.css'
import InputField from '../components/inputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS } from '../modules/Routes'
import NavbarComponent  from '../components/NavBar'
import { useMiningServisesInCurOrder, useCurOrderId , useSearchValue, fetchMiningServicesList, setSearchValueAction} from '../slices/slice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; 
import {ROUTES} from '../modules/Routes'



const MiningServicesPage: FC = () => {

    const [loading, setLoading] = useState(false)
    const [mining_services, setMiningServices] = useState<MiningServicesInfo[]>([])
    const [searchMiningService, setSearchMiningService] = useState('')
    const miningServisesInCurOrder = useMiningServisesInCurOrder()
    const curOrderId = useCurOrderId()
    const searchValue = useSearchValue()

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

    const dispatch: AppDispatch = useDispatch(); 

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
    }, [searchMiningService])

    // const handleSearch = (value: string) => {
    //     setSearchMiningService(value)  
    // }

    const handleSearch = async () => {
        dispatch(fetchMiningServicesList(searchValue))  
        console.log(searchValue)
    }

    return (
        <>
        <NavbarComponent/>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.MINING_SERVICES}]}></BreadCrumbs>
                    <InputField 
                        value={searchValue} 
                        setValue={(value:string) => {   
                            dispatch(setSearchValueAction(value))
                            console.log(111)
                        }} 
                        onSubmit={handleSearch} 
                        loading={loading} 
                        placeholder="Поиск горных работ" 
                    />
                        <div hidden={miningServisesInCurOrder.length != 0}>
                            <img src='/deposits_frontend/empty_basket.png' className='basket-img-sm'></img>
                        </div>
                        <Link hidden={miningServisesInCurOrder.length == 0} to={`${ROUTES.MINING_ORDER}/${curOrderId}`}>
                            <div className='position-relative'>
                                <img src='/deposits_frontend/full_basket.png' className='basket-img-sm'></img>
                                <div className='MservicesCount'>{miningServisesInCurOrder.length}</div>
                            </div>
                        </Link>                    
                            <Container className="d-flex flex-wrap container-fluid g-4 justify-content-center w-100 gap-4 mt-5" >
                                <div ref={carouselRef} className="d-flex overflow-auto" style={{ maxWidth: '100%' }}>
                                    {mining_services.map((service, index) => (
                                        <div key={`${service.id}-${index}`} className="flex-shrink-0" style={{ height: '400px', minWidth: '250px', maxWidth: '250px', margin: '0 10px' }}>
                                            <MiningServiceCard {...service} />
                                        </div>
                                    ))}
                                </div>
                                <button onClick={scrollLeft} className="carousel-control-prev">‹</button>
                                <button onClick={scrollRight} className="carousel-control-next">›</button>
                                <div style={{ width: '100%', height: '50px', backgroundColor: 'white', marginTop: '-50px' }}></div>
                            </Container>
        </>
    )
}

export default MiningServicesPage