import { FC } from 'react'
import NavbarComponent from '../components/NavBar';

const MainPage: FC = () => {
    return (
        <>
        <NavbarComponent/>
            <div className="container mt-5">
                <h3>Разведка месторождений</h3>
                <p>
                    Мы предоставляем услуги по поиску, оценке, геологической разведке месторождений полезных ископаемых. Выполняем разработку и сопровождение согласования проектной документации для добычи рудных и нерудных полезных ископаемых.
                </p>
            </div>
        </>
    );
};


export default MainPage