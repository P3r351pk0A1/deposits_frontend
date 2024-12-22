import { FC, useEffect } from 'react'

import '../assets/css/miningOrdersPage.css'
import NavbarComponent from '../components/NavBar';
import { useDispatch } from 'react-redux'
import { fetchGetminingOrdersList, useMiningOrdersList, useUser } from '../slices/slice'
import { ROUTE_LABELS } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { AppDispatch } from '../store'
import MiningOrderCard from '../components/miningOrderCard'
import Row from "react-bootstrap/Row"

const MiningOrdersPage: FC = () => {

    const dispatch: AppDispatch = useDispatch()

    const user = useUser()
    const miningOrders = useMiningOrdersList()

    const getData = async () => {
        dispatch(fetchGetminingOrdersList())

    }

    useEffect(() => {        
        getData()
    }, [])
    
    const getStatusTranslated = (status_eng:string) => {
        switch(status_eng){
            case 'draft': return 'Черновик'
            case 'deleted': return 'Удалена'
            case 'formed': return 'Сформирована'
            case 'accepted': return 'Принята'
            case 'denied': return 'Отклонена'
            default: return 'Ошибка. Неизвестный статус'
        }
    }

    return (
        <>
            <NavbarComponent/>
            <BreadCrumbs crumbs={[
                    {
                        label: ROUTE_LABELS.MINING_ORDER
                    }
            ]}></BreadCrumbs>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Row xs={1} className="g-4 justify-content-center" style={{ width: '90%' }}>
                    {Array.isArray(miningOrders) && miningOrders.length === 0 ? <h5>Заявки не найдены</h5> : Array.isArray(miningOrders) && miningOrders.map((miningOrder, index) => {
                        if (miningOrder.creator != user?.username)
                            return
                        return (
                            <MiningOrderCard 
                                key={index}
                                id={miningOrder.mining_order_id as number} 
                                status={getStatusTranslated(miningOrder.status)} 
                                order_cost={miningOrder.order_cost as number} 
                                creation_date={miningOrder.creation_date as string} 
                                formation_date={miningOrder.formation_date as string} 
                                moderation_date={miningOrder.moderation_date as string}
                                creator={miningOrder.creator as string}
                                moderator={miningOrder.moderator as string}>
                            </MiningOrderCard>
                        )
                    })}
                </Row>
            </div>
            {/* </div> */}
        </>
    )
}

export default MiningOrdersPage