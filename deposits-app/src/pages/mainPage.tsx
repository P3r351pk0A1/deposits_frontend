import { FC, useEffect, useState } from 'react';
import NavbarComponent from '../components/NavBar';
import Carousel from 'react-bootstrap/Carousel';
import '../assets/css/MainPage.css'

const importAll = async (r: any) => {
    const importPromises = Object.values(r).map((importFn: any) => importFn());
    const modules = await Promise.all(importPromises);
    return modules.map((module: any) => module.default);
};

const MainPage: FC = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const loadImages = async () => {
            const importedImages = await importAll(import.meta.glob('/dist/imgs/MPCarousel/*.{png,jpg,jpeg,svg}'));
            setImages(importedImages);
        };
        loadImages();
    }, []);

    return (
        <>
            <NavbarComponent />
            <div className="container mt-5">
                <h3>Разведка месторождений</h3>
                <p>
                    Мы предоставляем услуги по поиску, оценке, геологической разведке месторождений полезных ископаемых. Выполняем разработку и сопровождение согласования проектной документации для добычи рудных и нерудных полезных ископаемых.
                </p>
                
                <Carousel>
                    {images.map((image: string, index: number) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt={`Slide ${index}`}
                                style={{ height: '500px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default MainPage;