import React, { useState } from 'react';
import NavbarComponent from '../components/NavBar';
import '../assets/css/userInt.css';

const RegistrationPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic here
        console.log(formData);
    };

    return (
        <>
            <NavbarComponent/>
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
                    <button className = 'sbmBtn' type="submit">Зарегистрироваться</button>
                </div>
            </form>
        </>
    );
};

export default RegistrationPage;