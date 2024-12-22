import { FC } from 'react'

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';

interface MiningOrderCardProps {
    id: number
    status: string
    creation_date: string
    formation_date: string
    moderation_date: string
    order_cost: number
    creator: string
    moderator: string
}

const MiningOrderCard: FC<MiningOrderCardProps> = (
    { id, status, creation_date, formation_date, moderation_date, order_cost, creator, moderator }
) => {

    return (
        <Link to={`${ROUTES.MINING_ORDER}/${id}`}>
            <Card className='shadow shadow-bg w-100' >
                <Card.Body className='cardWrapper'>
                    <div className="idField">#{id}</div>
                <div className="fieldStat field">
                    <div className="fieldName">Статус: </div>
                    <div className="fieldValue">{status || '-'}</div>
                </div>
                <div className="fieldClient field" >
                    <div className="fieldName">Клиент: </div>
                    <div className="fieldValue">{creator}</div>
                </div>
                <div className="fieldOp field">
                    <div className="fieldName">Оператор: </div>
                    <div className="fieldValue">{moderator || '-'}</div>
                </div>
                <div className="fieldDateC field">
                    <div className="fieldName">Создание: </div>
                    <div className="fieldValue">{creation_date && !isNaN(Date.parse(creation_date)) ? new Date(creation_date).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }) : '-'}</div>
                </div>
                <div className="fieldDateF field">
                    <div className="fieldName">Формирование: </div>
                    <div className="fieldValue">{formation_date && !isNaN(Date.parse(formation_date)) ? new Date(formation_date).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }) : '-'}</div>
                </div>
                <div className="fieldDateE field">
                    <div className="fieldName">Завершение: </div>
                    <div className="fieldValue">{moderation_date && !isNaN(Date.parse(moderation_date)) ? new Date(moderation_date).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }) : '-'}</div>
                </div>
                <div className="fieldOC field">
                    <div className="fieldName">Сумма заказа: </div>
                    <div className="fieldValue">{order_cost || '-'}</div>
                </div>
                </Card.Body>
            </Card>
        </Link>




        // <Link to={`${ROUTES.MINING_ORDER}/${id}`}>
        //     <Card className='shadow shadow-bg w-100' >
        //         <Card.Body className='d-flex flex-column'>
        //             <Card.Title style={{fontSize: '2em'}}>{`Заявка №${id}`}</Card.Title>
        //             <div className='d-flex flex-column w-100 h-100 flex-grow justify-content-end'>
        //                 <Card.Text className='mining-order-text'>{`Статус: ${status}`}</Card.Text>
        //                 <Card.Text className='mining-order-text'>{`Время создания: ${creation_date && !isNaN(Date.parse(creation_date)) ? new Date(creation_date).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }) : '-'}`}</Card.Text>
        //                 <Card.Text className='mining-order-text'>{`Время формирования: ${formation_date && !isNaN(Date.parse(formation_date)) ? new Date(formation_date).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }) : '-'}`}</Card.Text>
        //                 <Card.Text className='mining-order-text'>{`Время завершения: ${moderation_date && !isNaN(Date.parse(moderation_date)) ? new Date(moderation_date).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }) : '-'}`}</Card.Text>
        //                 <Card.Text className='mining-order-text'>{`Сумма заказа: ${order_cost!= null ? moderation_date : '-'}`}</Card.Text>
        //             </div>
        //         </Card.Body>
        //     </Card>
        // </Link>
    )
}

export default MiningOrderCard