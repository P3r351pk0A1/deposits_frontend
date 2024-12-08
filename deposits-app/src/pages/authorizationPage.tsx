import React, { useState } from 'react';
import NavbarComponent from '../components/NavBar';
import '../assets/css/userInt.css';
import {setErrorBoxTextAction, setErrorBoxStatusAction, useErrorBoxText, useErrorBoxStatus, setLoadingStatusAction, useLoadingStatus, fetchAuth} from '../slices/slice'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import LoadingWindow from '../components/LoadingWindow'
import { AppDispatch } from '../store';

const AuthorizationPage: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        
        if(formData.username == '' || formData.password == ''){
            dispatch(setErrorBoxTextAction('Заполните оба поля'));
            return dispatch(setErrorBoxStatusAction(true));   
        }
        dispatch(setLoadingStatusAction(true))
            
        dispatch(fetchAuth({
            password: formData.password,
            username: formData.username
        }))
        .then((unwrapResult) => {
            if (unwrapResult.type.endsWith('fulfilled')){
                navigate(ROUTES.HOME);
            }
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleClick();
    };

    const errorBoxStatus = useErrorBoxStatus();
    const errorBoxText = useErrorBoxText();

    return (
        <>
            <NavbarComponent/>
            <LoadingWindow show={useLoadingStatus()} onHide={() => {}}/>
            <form>
                {errorBoxStatus && (<div className="errorBox">{errorBoxText}</div>)}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '450px', margin: '6% auto 0 auto' }}>
                    <div className = 'inpBox'>                          
                        <label className='inpLabel'>Имя пользователя:</label>
                        <input className = 'inputUsDataField' type="username" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className = 'inpBox'>
                        <label className='inpLabel'>Пароль:</label>
                        <input className = 'inputUsDataField' type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button className = 'sbmBtn' type="submit" onClick={handleSubmit}>Войти</button>
                </div>
            </form>
        </>
    );
};

export default AuthorizationPage;