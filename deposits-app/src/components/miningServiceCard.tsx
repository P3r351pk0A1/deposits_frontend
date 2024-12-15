import { FC } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import "../assets/css/miningServiceCard.css";

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; 
import {useUser, fetchAddMiningServiceToOrder} from '../slices/slice'

interface miningServiceCardProps {
    mining_service_id: number
    name: string
    url: string
    price: number
    description: string
}

const MiningServiceCard: FC<miningServiceCardProps> = (
    { mining_service_id, name, url, price }
) => {

    const user = useUser()
    const dispatch: AppDispatch = useDispatch()

    const handleAdd = async () => {
        dispatch(fetchAddMiningServiceToOrder(mining_service_id))
    }   

    return (
        <Card className='shadow shadow-bg serviceCard'>
            <Link to={`${ROUTES.MINING_SERVICES}/${mining_service_id}`} className="characterCardLink" style={{ textDecoration: 'none' }}>
                <Card.Img variant="top" src={url || '/src/assets/img/unknown.jpg'} />
            </Link>
            <Card.Body className='d-flex flex-column'>
                <Card.Title>{name}</Card.Title>
                <Card.Title>{price} руб.</Card.Title>
            </Card.Body>
            <Button variant="outline-danger" className='add-button w-100' hidden={user == null} onClick={handleAdd}>Добавить</Button>
        </Card>
        
    )
}

export default MiningServiceCard