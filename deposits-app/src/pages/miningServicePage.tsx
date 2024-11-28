import { FC, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import { MiningServicesInfo, getMiningServiceById } from '../modules/miningServiceApi'
import { MINING_SERVICES_MOCK } from '../modules/mock'

import { BreadCrumbs } from '../components/BreadCrumbs'

const MiningServicePage: FC = () => {

    const [mining_service, setMiningService] = useState<MiningServicesInfo>({
        mining_service_id: 0,
        name: '',
        description: '',
        long_description: '',
        url: '',
        price: 0,
        id: 0
    })

    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return

        getMiningServiceById(id_numeric).then((response) => {
            setMiningService(response)
        }).catch(() => {
            let found = false;
                MINING_SERVICES_MOCK.Services.forEach((m_service) => {
                    if (m_service.mining_service_id === id_numeric)
                        found = true;
                        return setMiningService(m_service)
                })
                if (!found)
                    setMiningService(MINING_SERVICES_MOCK.Services[0])
            })
    }, [])

    return (
        <>
            <BreadCrumbs crumbs={[
                {
                    label: 'Виды услуг',
                    path: '/miningServices'
                },
                {
                    label: mining_service?.name
                }
            ]}></BreadCrumbs>
            <div className='d-flex flex-column ms-4 content-fluid'>
               <h2 className='text-uppercase'>{mining_service?.name}</h2>
               <div className='container-fluid mt-3'>
                    <div className='row'>
                        <div className='col-3 p-0 shadow shadow-bg'>
                            <div className='appeal-img-bg'>
                                <img src={mining_service?.url} className='appeal-img' alt='appeal'></img>
                            </div>
                        </div>
                        <div className='ps-5 col-5 mt-2'>
                            <p>{mining_service?.long_description}</p>
                        </div>
                    </div>
               </div>
            </div>
        </>
    )
}

export default MiningServicePage