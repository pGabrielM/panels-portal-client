import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function PortalBody() {

  const LinkPainelGerencial = 'https://app.powerbi.com/reportEmbed?reportId=43a78633-af71-44eb-9f37-b0519ff5357f&autoAuth=true&ctid=08ecf063-40ad-47e9-a6af-e7325fc56dd8'

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="http://intranet.hpp.br">Home</Nav.Link>
            <NavDropdown title="DTI" id="basic-nav-dropdown">
              <NavDropdown.Item href={LinkPainelGerencial} target='blank'>Gerenciais</NavDropdown.Item>
              <NavDropdown.Item>Gestores</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tele Saúde" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" target='blank'>Perfil Descritivo/Demográfico</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}