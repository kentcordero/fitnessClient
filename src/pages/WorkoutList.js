import { useEffect, useState } from 'react';
import { Button, Row, Col, Table, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const GET_MY_WORKOUTS_URL = 'https://fitness-tracker-oahg.onrender.com/workouts/getMyWorkouts';
const COMPLETE_WORKOUT_URL = 'https://fitness-tracker-oahg.onrender.com/workouts/completeWorkoutStatus';
const UPDATE_WORKOUT_URL = 'https://fitness-tracker-oahg.onrender.com/workouts/updateWorkout';
const DELETE_WORKOUT_URL = 'https://fitness-tracker-oahg.onrender.com/workouts/deleteWorkout';

export default function WorkoutList() {
    const [ workouts, setWorkouts ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedWorkoutId, setSelectedWorkoutId ] = useState("");
    const [ selectedWorkoutName, setSelectedWorkoutName ] = useState("");
    const [ selectedWorkoutDuration, setSelectedWorkoutDuration ] = useState("");

    function setOpenModal(workout) {
        setShowModal(true);
        setSelectedWorkoutId(workout._id);
        setSelectedWorkoutName(workout.name);
        setSelectedWorkoutDuration(workout.duration);
    }

    function setCloseModal() {
        setShowModal(false);
        setSelectedWorkoutId("");
        setSelectedWorkoutName("");
        setSelectedWorkoutDuration("");
    }

    function getMyWorkoutList() {
        fetch(GET_MY_WORKOUTS_URL, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
        }).then(res => res.json()).then((data) => {
            console.log({ data });
            setWorkouts(data.workouts);
        });
    }

    function updateWorkout(e) {
        e.preventDefault();
        const workoutId = selectedWorkoutId;
        const name = selectedWorkoutName;
        const duration = selectedWorkoutDuration;

        fetch(UPDATE_WORKOUT_URL + `/${workoutId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            },
            body: JSON.stringify({
                name: name,
                duration: duration,
            })
        }).then(res => res.json()).then((data) => {
            console.log({ updatedWorkout: data });
            setCloseModal();

            if (data.message === 'Workout updated successfully') {
                Swal.fire({
                    title: "Update Workout Details Successful",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Update Workout Details Failed",
                    icon: "error",
                });
            }
            
            getMyWorkoutList();
        });
    }

    function deleteWorkout(workoutId) {
        fetch(DELETE_WORKOUT_URL + `/${workoutId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            },
        }).then(res => res.json()).then((data) => {
            if (data.message === 'Workout deleted successfully') {
                Swal.fire({
                    title: "Workout Deletion Successful",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Workout Deletion Failed",
                    icon: "error",
                });
            }

            getMyWorkoutList();
        });
    }

    function setWorkoutToComplete(workoutId) {
        fetch(COMPLETE_WORKOUT_URL + `/${workoutId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
        }).then(res => res.json()).then((data) => {
            if (data.message === 'Workout status updated successfully') {
                Swal.fire({
                    title: "Update Workout Status Successful",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Update Workout Status Failed",
                    icon: "error",
                });
            }

            getMyWorkoutList();
        });
    }

    function generateWorkoutTable() {
        return (
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { workouts?.map((workout) => {
                        const { _id: workoutId, name, duration, status } = workout;
                        return (
                            <tr className='align-middle' key={workoutId}>
                                <td>{name}</td>
                                <td>{duration}</td>
                                <td>
                                    {status === 'pending' ? 
                                        <Button variant='success' onClick={(e) => setWorkoutToComplete(workoutId)}>Complete</Button>
                                        :
                                        <>Completed</>
                                    }
                                </td>
                                <td><Button onClick={(e) => setOpenModal(workout)}>Update</Button></td>
                                <td><Button variant='danger' onClick={(e) => deleteWorkout(workoutId)}>Delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    useEffect(() => {
        getMyWorkoutList();
    }, []);

	return (
		<>
        <Row className='mt-3'>
            <Col>
                <Link className='btn btn-primary' to='/addWorkout'>Add Workout</Link>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col>
                {workouts.length ?
                    <>{generateWorkoutTable()}</>
                    :
                    <h5>No workouts created yet.</h5>
                }
            </Col>
        </Row>
        <Modal show={showModal} onHide={setCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Update Workout Details</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => updateWorkout(e)}>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Workout Name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter a workout name"
                        value={selectedWorkoutName}
                        onChange={(e) => setSelectedWorkoutName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="duration" className='mt-3'>
                    <Form.Label>Duration</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter duration"
                        value={selectedWorkoutDuration}
                        onChange={(e) => setSelectedWorkoutDuration(e.target.value)}
                        required
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={(e) => setCloseModal()}>
                Close
            </Button>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
            </Modal.Footer>
            </Form>
        </Modal>
		</>
	)
}