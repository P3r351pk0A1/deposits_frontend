import { FC, useState } from 'react'

import Button from 'react-bootstrap/Button';

import {useCurOrderId } from '../slices/slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

interface MiningServiceCardProps {
    m_order_id: number
    ms_id: number
    ms_name: string
    ms_url: string
    ms_price: number
    ms_square: number
}

const AppealIssueCard: FC<MiningServiceCardProps> = (
    { m_order_id, ms_id, ms_name, ms_url, ms_price, ms_square }
) => {

    const [square_, setSquare] = useState(ms_square)

    const curOrderId = useCurOrderId()
    const dispatch: AppDispatch = useDispatch()


    const editHandler = async () => {
        // dispatch(fetchChangeIssueCount({id: id, count: _count}))
    }

    const deleteHandler = async () => {
        // dispatch(fetchDeleteAppealIssue(id))
    }

    return (
        <div className='d-flex gap-4 shadow shadow-bg border border-light rounded-left rounded-right bg-white'>
            <div className='appeal-issue-card-image w-50'>
                <img src={ms_url}></img>
            </div>
            <div className='d-flex w-75 justify-content-center align-items-center text-center text-uppercase'>
                <h3>{ms_name}</h3>
            </div>
            <div className='separator'></div>
            <div className='d-flex flex-column p-2 justify-content-center align-items-center'>
                <div className='d-flex flex-column gap-2'>
                    <div className='d-flex gap-2'>
                        <input style={{width: '5em', textAlign: 'center'}} type='number' value={ms_square} onChange={(event) => {setSquare(Number.parseInt(event.target.value))}} disabled={curOrderId != m_order_id}></input>
                        <Button style={{width: '10.5em'}} variant="outline-danger" className='details-button' disabled={curOrderId != m_order_id} onClick={editHandler}>Изменить</Button>
                    </div>
                    <Button style={{width: '16em'}} variant="outline-danger" className='details-button' disabled={curOrderId != m_order_id} onClick={deleteHandler}>Удалить</Button>
                </div>
            </div>
        </div>
    )
}

export default AppealIssueCard