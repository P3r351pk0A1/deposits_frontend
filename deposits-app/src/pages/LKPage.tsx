import React, { useState } from 'react';
import NavbarComponent from '../components/NavBar';
import '../assets/css/userInt.css';
import LoadingWindow from '../components/LoadingWindow';
import { useLoadingStatus, setErrorBoxTextAction, setErrorBoxStatusAction, fetchLK, useUser } from '../slices/slice';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';

const LKPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: useUser().first_name,
        lastName: useUser().last_name,
        username: useUser().username,
        email: useUser().email,
        password: '',
        confirmPassword: '' 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const dispatch: AppDispatch = useDispatch();

    const handleClick = async () => {
        if(formData.password != formData.confirmPassword){
            dispatch(setErrorBoxTextAction('Пароли не совпадают'));
            return dispatch(setErrorBoxStatusAction(true));              
        }       
        if (formData.password == ''){
            dispatch(fetchLK({
                email: formData.email,
                password: '-1',             
                username: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName
            }))       
        }
        else    dispatch(fetchLK({
            email: formData.email,
            password: formData.password,
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName
        }))      
        console.log(useUser())    
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleClick();
    };

    return (
        <>
            <NavbarComponent/>
            <LoadingWindow show={useLoadingStatus()} onHide={() => {}}/>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '450px', margin: '6% auto 0 auto' }}>
                    <div className = 'inpBox'>
                        <label className='inpLabel'>Имя:</label>    
                        <input className = 'inputUsDataField' type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className = 'inpBox'>
                        <label className='inpLabel'>Фамилия:</label>
                        <input className = 'inputUsDataField' type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <div className = 'inpBox'>
                        <label className='inpLabel'>Логин:</label>
                        <input className = 'inputUsDataField' type="text" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className = 'inpBox'>
                        <label className='inpLabel'>Почта:</label>
                        <input className = 'inputUsDataField' type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className = 'inpBox'>
                        <label className='inpLabel'>Пароль:</label>
                        <input className = 'inputUsDataField' type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className = 'inpBox'>
                        <label className='inpLabel'>Подтверждение пароля:</label>
                        <input className = 'inputUsDataField' type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                    <button className = 'sbmBtn' type="submit" onClick={handleSubmit}>Изменить данные</button>
                </div>
            </form>
        </>
    );
};

export default LKPage;