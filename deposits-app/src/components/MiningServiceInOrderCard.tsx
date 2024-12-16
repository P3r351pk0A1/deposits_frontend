import { FC, useState } from 'react'

import Button from 'react-bootstrap/Button';

import {useCurOrderId, fetchChangeMServiceSquare, fetchDeleteMService } from '../slices/slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

import '../assets/css/miningOrderPage.css'

interface MiningServiceCardProps {
    m_order_id: number
    ms_id: number
    ms_name: string
    ms_url: string
    ms_price: number
    ms_square: number
}

const MiningServiceInOrderCard: FC<MiningServiceCardProps> = (
    { m_order_id, ms_id, ms_name, ms_url, ms_price, ms_square }
) => {

    const [square, setSquare] = useState(ms_square)

    const curOrderId = useCurOrderId()
    const dispatch: AppDispatch = useDispatch()


    const editHandler = async () => {
        dispatch(fetchChangeMServiceSquare({pkMorder: m_order_id, pkMservice: ms_id, square: square}))
    }

    const deleteHandler = async () => {
        console.log(m_order_id, ms_id, ms_name, ms_url, ms_price, ms_square )
        dispatch(fetchDeleteMService({pkMorder: m_order_id, pkMservice: ms_id   }))
    }

    return (
        <div className='d-flex gap-4 shadow shadow-bg border border-light rounded-left rounded-right bg-white' style={{ height: '200px' }}  >
            <div className='appeal-issue-card-image w-100 h-100'>
                <img src={ms_url}></img>
            </div>
            <div className='d-flex w-75 justify-content-center align-items-center text-center text-uppercase'>
                <h3>{ms_name}</h3>
            </div>
            <div className='d-flex w-75 justify-content-center align-items-center text-center text-uppercase'>
                <h3>{ms_price} рублей</h3>
            </div>

                <div className='d-flex flex-column justify-content-center align-items-center gap-2 me-4'>
                    <div className='d-flex gap-2 changeSquareBox'>
                        <input style={{width: '5em', textAlign: 'center'}} type='number' value={square} onChange={(event) => {setSquare(Number.parseInt(event.target.value))}} disabled={curOrderId != m_order_id}></input>
                        <Button style={{width: '10.5em'}} variant="outline-danger" className='details-button' disabled={curOrderId != m_order_id} onClick={editHandler}>Изменить</Button>
                    </div>
                    <Button style={{width: '16em'}} variant="outline-danger" className='details-button' disabled={curOrderId != m_order_id} onClick={deleteHandler}>Удалить</Button>
                </div>
            </div>
    )
}

export default MiningServiceInOrderCard