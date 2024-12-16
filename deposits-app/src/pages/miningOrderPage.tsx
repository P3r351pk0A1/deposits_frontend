import { FC, useEffect, useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from "react-router-dom"

import NavbarComponent from '../components/NavBar';

import { BreadCrumbs } from '../components/BreadCrumbs'
import { useDispatch } from 'react-redux'
import { useMServicesInCurOrder, fetchGetMiningOrder, useCurOrderId, useMiningOrder, fetchModifyMiningOrder, fetchFormMiningOrder, fetchDeleteMiningOrder, useErrorBoxStatus, useErrorBoxText    } from '../slices/slice'
import MiningServiceInOrderCard from '../components/MiningServiceInOrderCard'
import { AppDispatch } from '../store'

import '../assets/css/miningOrderPage.css'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes';

const MiningOrderPage: FC = () => {

    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    
    const [company_name_, set_company_name_] = useState('')
    const [location_, set_location_] = useState('')
    const [mining_start_date_, set_mining_start_date_] = useState('')

    const mining_order = useMiningOrder()
    const cur_mining_order_id = useCurOrderId()
    const MServicesInCurOrder = useMServicesInCurOrder()
    const navigate = useNavigate()

    const getMiningOrderData = async() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return
        dispatch(fetchGetMiningOrder(id_numeric))
    }

    useEffect(() => {
        getMiningOrderData()
    }, [MServicesInCurOrder])

    const getStatusTranslated = (status_eng:string) => {
        switch(status_eng){
            case 'draft': return 'Черновик'
            case 'deleted': return 'Удалена'
            case 'formed': return 'Сформирована'
            case 'accepted': return 'Принята'
            case 'denied': return 'Отклонена'
        }
    }

    const handleSaveMiningOrderFields = async () => {
        if (!id) return
        dispatch(fetchModifyMiningOrder({
                    id: parseInt(id),   
                    company_name: company_name_,
                    location: location_,
                    mining_start_date: mining_start_date_
                }))
    }

    const handleForm = async () => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return
        dispatch(fetchFormMiningOrder(id_numeric)).then((unwrapResult) => {
            if(unwrapResult.type.endsWith('fulfilled')){
                navigate(ROUTES.HOME)
            }
        })
    }

    const handleDelete = async () => {
        if (!id) return
        let id_numeric: number = parseInt(id)   
        if (isNaN(id_numeric)) return
        dispatch(fetchDeleteMiningOrder(id_numeric)).then((unwrapResult) => {
            if(unwrapResult.type.endsWith('fulfilled')){
                navigate(ROUTES.HOME)
            }
        })
    }

    const errorBoxStatus = useErrorBoxStatus();
    const errorBoxText = useErrorBoxText();

    return (
        <>
            <NavbarComponent/>
            {errorBoxStatus && (<div className="errorBox">{errorBoxText}</div>)}
            <BreadCrumbs crumbs={[
                {
                    label: ROUTE_LABELS.MINING_ORDER,
                    path: ROUTES.MINING_ORDER
                },
                {
                    label: `Заявка №${mining_order.mining_order_id}`
                }
            ]}></BreadCrumbs>
            <div className='d-flex flex-column ms-4 content-fluid'>
            <div className='container-fluid d-flex flex-column justify-content-center shadow-bg p-4 w-100 gap-3'>
                <h1 className='text-uppercase'>Заявка №{mining_order?.mining_order_id}</h1>
                <div hidden={cur_mining_order_id != mining_order?.mining_order_id}>
                    <div className='action-container d-flex flex-column gap-2'>
                        <Form className='shadow-bg'>
                            <Form.Group>
                                <Form.Label>Название компании</Form.Label>
                                <div className='d-flex gap-3'>
                                    <Form.Control value={company_name_ ?? ''} onChange={(event) => {set_company_name_(event.target.value)}} type='text'></Form.Control>
                                </div>
                                <Form.Label>Место проведения работ</Form.Label>
                                <div className='d-flex gap-3'>
                                    <Form.Control value={location_ ?? ''}  onChange={(event) => {set_location_(event.target.value)}}type='text'></Form.Control>
                                </div>
                                <Form.Label>Желаемая дата начала работ</Form.Label>
                                <div className='d-flex gap-3'>
                                    <Form.Control value={mining_start_date_ ?? ''}  onChange={(event) => {set_mining_start_date_(event.target.value)}}type='text'></Form.Control>
                                    <Button variant='outline-danger' onClick={handleSaveMiningOrderFields}>Сохранить изменения</Button>
                                </div>
                            </Form.Group>
                        </Form>
                        <Button variant='outline-danger' className='big-button' onClick={handleForm}>Оформить</Button>
                        <Button variant='outline-danger' className='big-button' onClick={handleDelete}>Отменить</Button>
                    </div>
                </div>
                <div hidden={cur_mining_order_id != mining_order?.mining_order_id}>
                    <div className='d-flex flex-column w-50' >
                        <h3>Дополнительная информация</h3>
                        <Table className='shadow shadow-bg border'>
                            <tbody style={{fontFamily: 'Oswald'}}>
                                <tr>
                                    <td>Создатель</td>
                                    <td>{mining_order?.creator}</td>
                                </tr>
                                <tr>
                                    <td>Оператор</td>
                                    <td>{mining_order?.moderator}</td>
                                </tr>
                                <tr>
                                    <td>Статус</td>
                                    <td>{mining_order != null && mining_order.status != null ? getStatusTranslated(mining_order.status) : 0}</td>
                                </tr>
                                <tr>
                                    <td>Дата создания</td>
                                    <td>{mining_order?.creation_date}</td>
                                </tr>
                                <tr>
                                    <td>Дата формирования</td>
                                    <td>{mining_order?.formation_date}</td>
                                </tr>
                                <tr>
                                    <td>Дата завершения</td>
                                    <td>{mining_order?.moderation_date}</td>
                                </tr>
                                <tr>
                                    <td>Сумма заказа</td>
                                    <td>{mining_order?.order_cost}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
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
            </div>
        </>
    )
}

export default MiningOrderPage