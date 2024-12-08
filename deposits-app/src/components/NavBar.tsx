import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from '../modules/Routes';
import '../assets/css/NavBar.css';
import { Link} from 'react-router-dom';
import { FC } from 'react'
import { AppDispatch } from '../store'
import { useUser, fetchLogOut } from '../slices/slice'
import { useDispatch } from 'react-redux';



const NavbarComponent: FC = () => {
    const user = useUser()
    const username = user.username
    const dispatch: AppDispatch = useDispatch();

    const exitHandler = () => {
        dispatch(fetchLogOut())
    }   


  return (
      <Navbar expand="lg" className="bg-body-tertiary shadow shadow-bg nav">
          <Navbar.Brand as={Link} to={ROUTES.HOME} className='navbar-text-main'>Разведка месторождений</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <Nav.Link as={Link} to={ROUTES.MINING_SERVICES} className='nav-link navbar-text-main'>Виды услуг</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
              <Nav.Link as={Link} to={ROUTES.REGISTRATION} style = {username !== undefined ? {display:'none'} : {}} className='nav-link navbar-text-main'>Регистрация</Nav.Link>
              <Nav.Link as={Link} to={ROUTES.AUTHORISATION} style = {username !== undefined ? {display:'none'} : {}} className='nav-link navbar-text-main'>Вход</Nav.Link>
              <Nav.Link as={Link} to={ROUTES.LK} style = {username === undefined ? {display:'none'} : {}} className='nav-link navbar-text-main'>{user.username}</Nav.Link>
              <Nav.Link as={Link} to={ROUTES.HOME} onClick = {exitHandler} style = {username === undefined ? {display:'none'} : {}} className='nav-link navbar-text-main'>Выход</Nav.Link>            
          </Nav>
          </Navbar.Collapse>
      </Navbar>
  )
}


export default NavbarComponent;
