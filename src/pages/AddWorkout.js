import { useState } from 'react';
import { Button, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ADD_WORKOUT_URL = 'https://fitness-tracker-oahg.onrender.com/workouts/addWorkout'

export default function AddWorkout() {

    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");

    function addWorkout(e) {
        e.preventDefault();
        fetch(ADD_WORKOUT_URL,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ localStorage.getItem('token') }`
            },
            body: JSON.stringify({
                name,
                duration,
            })
        }).then(res => res.json()).then((data) => {
            if (data) {
                setName("");
                setDuration("");

                Swal.fire({
                    title: "Workout Added Successfully",
                    icon: "success"
                });
            }                
        })
    }

	return (
		<>
        <Row>
            <Col className="p-4">
                <Card>
                    <Card.Header className='bg-purple text-center'>Add Workout</Card.Header>
                    <Form onSubmit={(e) => addWorkout(e)}>
                        <Card.Body>
                            <Form.Group controlId="name">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter a workout name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="duration" className='mt-3'>
                                <Form.Label>Duration</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter duration"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer className='text-center'><Button type='submit'>Add</Button></Card.Footer>
                    </Form>
                </Card>
            </Col>
        </Row>
		</>
	)
}