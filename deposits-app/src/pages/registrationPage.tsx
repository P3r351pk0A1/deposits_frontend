import React, { useState } from 'react';
import NavbarComponent from '../components/NavBar';
import '../assets/css/userInt.css';
import {setErrorBoxTextAction, setErrorBoxStatusAction, useErrorBoxText, useErrorBoxStatus, setLoadingStatusAction, useLoadingStatus} from '../slices/slice'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { api } from '../api'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import LoadingWindow from '../components/LoadingWindow'

const RegistrationPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClick = async () => {
        if(formData.firstName == '' || formData.lastName == '' || formData.username == '' || formData.email == '' || formData.password == '' || formData.confirmPassword == ''){
            dispatch(setErrorBoxTextAction('Заполните все поля'));
            return dispatch(setErrorBoxStatusAction(true));   
        }
        if(formData.password != formData.confirmPassword){
            console.log(formData.password);
            dispatch(setErrorBoxTextAction('Пароли не совпадают'));
            console.log('Пароли не совпадают');
            return dispatch(setErrorBoxStatusAction(true));              
        }
        dispatch(setLoadingStatusAction(true))
            
        await api.user.userRegCreate({
            email: formData.email,
            password: formData.password,
            username: formData.username,
            first_name: formData.firstName,
            last_name: formData.lastName,
        }).then(() => {
            dispatch(setErrorBoxStatusAction(false))
            navigate(ROUTES.AUTHORISATION)
        }).catch((error)=>{
            dispatch(setErrorBoxStatusAction(true))
            if (error.response.data.error.email == 'custom user with this email адрес already exists.'){
                dispatch(setErrorBoxTextAction('Пользователь с такой почтой уже существует'))
            }
            if (error.response.data.error.username == 'custom user with this Имя пользователя already exists.'){
                dispatch(setErrorBoxTextAction('Пользователь с таким именем уже существует'))
            }
        }).finally(()=>{
            setTimeout(() => {  dispatch(setLoadingStatusAction(false)) }, 1000); //демо красивой анимации
            // dispatch(setLoadingStatusAction(false))
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleClick();
        console.log(formData);
    };

    const errorBoxStatus = useErrorBoxStatus();
    const errorBoxText = useErrorBoxText();

    return (
        <>
            <NavbarComponent/>
            <LoadingWindow show={useLoadingStatus()} onHide={() => {}}/>
            <form >
            {errorBoxStatus && (<div className="errorBox">{errorBoxText}</div>)}
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
                    <button className = 'sbmBtn' type="submit" onClick = {handleSubmit}>Зарегистрироваться</button>
                </div>
            </form>
        </>
    );
};

export default RegistrationPage;