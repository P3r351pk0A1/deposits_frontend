import { FC } from 'react'
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import "../assets/css/miningServiceCard.css";

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
    return (
        <Link to={`${ROUTES.MINING_SERVICES}/${mining_service_id}`} className="MServiceCardLink" style={{ textDecoration: 'none' }}>
        <Card className='shadow shadow-bg serviceCard'>
            <Card.Img variant="top" src={url || '/src/assets/img/unknown.jpg'} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title>{name}</Card.Title>
                <Card.Title>{price} руб.</Card.Title>
            </Card.Body>
        </Card>
        </Link>
    )
}

export default MiningServiceCard