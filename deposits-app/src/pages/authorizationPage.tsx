import React, { useState } from 'react';
import NavbarComponent from '../components/NavBar';
import '../assets/css/userInt.css';

const AuthorizationPage: React.FC = () => {
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
                        <label className='inpLabel'>Почта:</label>
                        <input className = 'inputUsDataField' type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className = 'inpBox'>
                        <label className='inpLabel'>Пароль:</label>
                        <input className = 'inputUsDataField' type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button className = 'sbmBtn' type="submit">Войти</button>
                </div>
            </form>
        </>
    );
};

export default AuthorizationPage;