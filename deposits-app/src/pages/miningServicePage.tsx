import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { useParams } from "react-router-dom"

import { useMiningService, fetchGetMiningService } from '../slices/slice'
import { BreadCrumbs } from '../components/BreadCrumbs'
import NavbarComponent  from '../components/NavBar'
import '../assets/css/miningServicePage.css'

const MiningServicePage: FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const mining_service = useMiningService()

    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return
        dispatch(fetchGetMiningService(id_numeric))
    }, [])

    return (
        <>
        <NavbarComponent/>
            <BreadCrumbs crumbs={[
                {
                    label: 'Виды услуг',
                    path: '/miningServices'
                },
                {
                    label: mining_service?.name || ''
                }
            ]}></BreadCrumbs>

            <div className='d-flex flex-column ms-4 content-fluid'>
               <h2 className='text-uppercase'>{mining_service?.name}</h2>
               <div className='service-details container-fluid mt-3'>
                    <div className='service-img-box '>
                        <img src={mining_service?.url || ''} className='service-img' alt='service'></img>
                    </div>
                    <div className='mservice-long-descr mt-2'>
                        <p>{mining_service?.long_description}</p>
                    </div>
               </div>
            </div>
        </>
    )
}

export default MiningServicePage