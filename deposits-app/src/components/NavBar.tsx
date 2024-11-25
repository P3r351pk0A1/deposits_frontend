import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from '../modules/Routes';
import '../assets/css/NavBar.css';

function NavbarComponent() {
  return (
    <Navbar className="navbar" expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand href={ROUTES.HOME} className="homebtn">
            Разведка месторождений
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={ROUTES.MINING_SERVICES} className="service_btn">Виды услуг</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
