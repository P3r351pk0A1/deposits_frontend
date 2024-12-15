import { FC, useEffect} from 'react'

import MiningServiceCard from '../components/miningServiceCard'
import { Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../assets/css/miningServicesPage.css'
import InputField from '../components/inputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS } from '../modules/Routes'
import NavbarComponent  from '../components/NavBar'
import {useMiningServices, useminingServisesInCurOrderCount, useCurOrderId , useSearchValue, fetchMiningServicesList, setSearchValueAction} from '../slices/slice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; 
import {ROUTES} from '../modules/Routes'



const MiningServicesPage: FC = () => {

    const miningServisesInCurOrderCount = useminingServisesInCurOrderCount()
    const curOrderId = useCurOrderId()
    const searchValue = useSearchValue()
    const mining_services = useMiningServices()

    const updateMiningServices = () => {
        dispatch(fetchMiningServicesList(searchValue))
    }

    useEffect(() => {
        updateMiningServices()
        return () => {
        }
    }, [miningServisesInCurOrderCount])

    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = async () => {
        dispatch(fetchMiningServicesList(searchValue))
    }

    return (
        <>
        <NavbarComponent/>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.MINING_SERVICES}]}></BreadCrumbs>
            <div className="box1">
                <InputField 
                    value={searchValue} 
                    setValue={(value:string) => {   
                        dispatch(setSearchValueAction(value))
                    }} 
                    onSubmit={handleSearch} 
                    placeholder="Поиск горных работ" 
                />
                <div>
                    <div className = "GoToOrderBtn" hidden={miningServisesInCurOrderCount != 0}>
                        <img src='/deposits_frontend/empty_basket.png' className='basket-img-sm'></img>
                    </div>
                    <Link  className = "GoToOrderBtn" hidden={miningServisesInCurOrderCount == 0} to={`${ROUTES.MINING_ORDER}/${curOrderId}`}>
                        <div className='position-relative'>
                            <img src='/deposits_frontend/full_basket.png' className='basket-img-sm'></img>
                            <div className='MservicesCount'>{miningServisesInCurOrderCount}</div>
                        </div>
                    </Link>  
                </div>     
            </div>             
            <Container className="d-flex flex-wrap container-fluid g-4 justify-content-center w-100 gap-4 mt-5" >
                {mining_services.map((service, index) => (
                    <div key={`${service.mining_service_id}-${index}`} className="flex-shrink-0" style={{ height: '400px', minWidth: '250px', maxWidth: '250px', margin: '0 10px' }}>
                        <MiningServiceCard 
                            mining_service_id={service.mining_service_id as number}
                            name={service.name as string}
                            url={service.url as string}
                            price={service.price as number}
                            description={service.description as string}
                        />
                    </div>
                ))}
                <div style={{ width: '100%', height: '50px', backgroundColor: 'white', marginTop: '-50px' }}></div>
            </Container>
        </>
    )
}

export default MiningServicesPage