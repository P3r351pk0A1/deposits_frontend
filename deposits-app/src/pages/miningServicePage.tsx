import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { useParams } from "react-router-dom"

import { useMiningServiceWithAttr, fetchGetMiningService, useUser, useLoadingStatus, useErrorBoxStatus, useErrorBoxText } from '../slices/slice'
import { BreadCrumbs } from '../components/BreadCrumbs'
import NavbarComponent  from '../components/NavBar'
import '../assets/css/miningServicePage.css'
import AttributeCard from '../components/AttributeCard'
import LoadingWindow from '../components/LoadingWindow'

const MiningServicePage: FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const M_service = useMiningServiceWithAttr()
    const user = useUser()

    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return

        const getDetails = async (id: number) => {
            dispatch(fetchGetMiningService(id))
        }

        getDetails(id_numeric)
    }, [])

    useEffect(() => {
    }, [M_service])

    const errorBoxStatus = useErrorBoxStatus();
    const errorBoxText = useErrorBoxText();

    return (
        <>
        <NavbarComponent/>
        <LoadingWindow show={useLoadingStatus()} onHide={() => {}}/>
        {errorBoxStatus && (<div className="errorBox">{errorBoxText}</div>)}
            <BreadCrumbs crumbs={[
                {
                    label: 'Виды услуг',
                    path: '/miningServices'
                },
                {
                    label: M_service?.mining_service?.name || ''
                }
            ]}></BreadCrumbs>

            <div className='d-flex flex-column ms-4 content-fluid'>
                <h2 className='text-uppercase'>{M_service?.mining_service?.name}</h2>
                <div className='service-details container-fluid mt-3'>
                    <div className='service-img-box '>
                        <img src={M_service?.mining_service?.url || ''} className='service-img' alt='service'></img>
                    </div>
                    <div className='mservice-long-descr mt-2'>
                        <p>{M_service?.mining_service?.long_description}</p>
                    </div>
                </div>
                <div className='mt-5'>
                    {M_service?.attributes?.map((attr, index) => (
                        <div key={`${attr.attribute_name}-${index}`} className="flex-shrink-0" style={{ height: '70px', minWidth: '250px', maxWidth: '800px', margin: '0 10px' }}>
                            <AttributeCard 
                                attribute_name={attr.attribute_name as string}
                                value={attr.value as string}
                                is_last={false}
                                serviceId = {M_service?.mining_service?.mining_service_id as number}
                            />
                        </div>
                    ))}
                    <div className="flex-shrink-0" hidden = {user.is_staff !== false} style={{ height: '70px', minWidth: '250px', maxWidth: '800px', margin: '0 10px' }}>
                        <AttributeCard 
                            attribute_name={''}
                            value={''}
                            is_last={true}
                            serviceId = {M_service?.mining_service?.mining_service_id as number}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default MiningServicePage