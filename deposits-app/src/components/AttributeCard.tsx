import { FC, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import "../assets/css/miningServiceCard.css";
import LoadingWindow from '../components/LoadingWindow'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useUser, fetchAddAtribute, useMServicesInCurOrder, fetchChangeAtribute, fetchDeleteAtribute, useMiningServiceWithAttr } from '../slices/slice'

interface AttributeCardProps {
    attribute_name: string
    value: string
    serviceId: number
    is_last: boolean
}

const AttributeCard: FC<AttributeCardProps> = (
    { attribute_name, value, is_last, serviceId}
) => {
    const dispatch: AppDispatch = useDispatch()
    const user = useUser()
    const [attr_name, set_attr_name] = useState(attribute_name)
    const [attr_value, set_attr_value] = useState(value)

    const handleDel = async () => {
        dispatch(fetchDeleteAtribute({
            name: attr_name,
            value: attr_value,
            service_id: serviceId
        }))
        set_attr_value('')
    }

    const handleChange = async () => {
        dispatch(fetchChangeAtribute({
            name: attr_name,
            value: attr_value,
            service_id: serviceId
        }))
    }

    const handleAdd = async () => {
        dispatch(fetchAddAtribute({
            name: attr_name,
            value: attr_value,
            service_id: serviceId
        }))
    }


    useEffect(() => {
    }, [])


    return (
        <Card className='shadow shadow-bg '>
            <Card.Body className='d-flex flex-column'>
                <div className="d-flex justify-content ">
                    <input 
                        type="text" 
                        id="attr_name" 
                        value={attr_name} 
                        readOnly={user.is_staff !== false || is_last !== true} 
                        className="form-control mb-2 me-2" 
                        onChange={(event) => {
                            set_attr_name(event.target.value);
                        }}
                    />
                    <input 
                        type="text" 
                        id="value" 
                        value={attr_value}  
                        readOnly={user.is_staff !== false} 
                        hidden={is_last === true} 
                        className="form-control mb-2 me-2" 
                        onChange={(event) => set_attr_value(event.target.value)}
                    />
                    <div className="d-flex justify-content-between" style = {user.is_staff !== false? {maxWidth: '1px'}: {minWidth: '200px'}}>
                    <Button 
                        variant="outline-danger" 
                        className='add-button w-100 mb-2 me-2' 
                        hidden={user.is_staff !== false || is_last === true} 
                        onClick={handleDel}

                    >
                        Удалить
                    </Button>
                    <Button 
                        variant="outline-danger" 
                        className='add-button w-100 mb-2 me-2' 
                        hidden={user.is_staff !== false || is_last === true} 
                        onClick={handleChange}
                    >
                        Изменить
                    </Button>
                    <Button 
                        variant="outline-danger" 
                        className='add-button w-100 mb-2' 
                        hidden={user.is_staff !== false || is_last !== true} 
                        onClick={handleAdd}
                    >
                        Добавить
                    </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>

    )
}

export default AttributeCard