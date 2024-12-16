import { FC, useEffect } from 'react'
import { useParams } from "react-router-dom"

import NavbarComponent from '../components/NavBar';


import { BreadCrumbs } from '../components/BreadCrumbs'
import { useDispatch } from 'react-redux'
import { fetchGetMiningOrder, useMiningOrder } from '../slices/slice'
import MiningServiceInOrderCard from '../components/MiningServiceInOrderCard'
import { AppDispatch } from '../store'

const MiningOrderPage: FC = () => {

    const { id } = useParams()
    const dispatch: AppDispatch = useDispatch()
    
    const mining_order = useMiningOrder()

    const getMiningOrderData = async() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return
        dispatch(fetchGetMiningOrder(id_numeric))
    }

    useEffect(() => {
        console.log(111)
        getMiningOrderData()
    }, [])

    return (
        <>
            <NavbarComponent/>
            <BreadCrumbs crumbs={[
                {
                    label: 'Заявка',
                    path: '/mining_order'
                },
                {
                    label: '???????'
                }
            ]}></BreadCrumbs>
            <div className='d-flex flex-column ms-4 content-fluid'>
               {/* <h2 className='text-uppercase'>{mining_order?.}</h2> */}
               <div className='issue-details container-fluid mt-3'>
                    {/* <div className='p-0'>
                        <div className='appeal-img-bg'>
                            <img src={mining_order?.image} className='appeal-img' alt='appeal'></img>
                        </div>
                    </div>
                    <div className='issue-details-description mt-2'>
                        <p>{mining_order?.description}</p>
                    </div> */}
               </div>
               <div className='d-flex gap-5'>
                    <div className='d-flex flex-column gap-3 w-100 mt-3 me-4'>
                        <h3>Услуги по разработке месторождений</h3>
                        {mining_order?.mining_services_in_order?.map((MiningService, index) => {
                            if (MiningService.Mservice?.mining_service_id != null && MiningService.Mservice.url != null)
                                return <MiningServiceInOrderCard 
                                    key = {`${MiningService.Mservice.mining_service_id}-${index}`}
                                    m_order_id={mining_order.mining_order_id as number}
                                    ms_id={MiningService.Mservice?.mining_service_id} 
                                    ms_name={MiningService.Mservice.name as string} 
                                    ms_url={MiningService.Mservice.url } 
                                    ms_price={MiningService.Mservice.price as number} 
                                    ms_square={MiningService.square as number}>
                                </MiningServiceInOrderCard>
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiningOrderPage