import { Container, Navbar, Nav } from 'react-bootstrap';

import { Link, NavLink } from 'react-router-dom';

export default function AppNavbar() {

	return(
		<Navbar bg="primary" expand="lg">
			<Container fluid>
			    <Navbar.Brand as={Link} to="/">Fitness Tracker</Navbar.Brand>
			    <Navbar.Toggle aria-controls="basic-navbar-nav" />
			    <Navbar.Collapse id="basic-navbar-nav">
				    <Nav className="ms-auto">
				        <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
						<Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
				    </Nav>
			    </Navbar.Collapse>
			</Container>
		</Navbar>
    )
}