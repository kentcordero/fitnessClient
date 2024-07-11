import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

	return (
		<>
        <Row>
            <Col className="p-4 text-center">
                <h1>Welcome To our Fitness Tracker</h1>
                <p>Create, Update, Delete and View Workouts</p>
                <Link className="btn btn-primary" to={'/workouts'}>Check Your Workouts</Link>
            </Col>
        </Row>
		</>
	)
}