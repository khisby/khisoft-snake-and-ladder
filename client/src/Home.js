import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Button, Nav, Navbar, Jumbotron, Container, Row, Col, FormControl, Form} from 'react-bootstrap';
import Background from './background.jpg'

const Home = () => {
    const [teks, setText] = useState('')
    
    const isNumberKey = (evt) => {
        var e = evt || window.event; //window.event is safer, thanks @ThiefMaster
        var charCode = e.which || e.keyCode;                        
        if (charCode > 31 && (charCode < 47 || charCode > 57))
            return false;
        if (e.shiftKey) return false;
            return true;
    }

    const handleChange = (e)=>{
        const re = /^[0-9\b]+$/

        if (e.target.value === '' || re.test(e.target.value)) {
            setText(e.target.value)
        }
    }

    // const handleNewRoom = ()=>{
    //     window.location.href="/create"
    // }
    return (<div>

        <Navbar bg="light" variant="light" className="justify-content-between">
            <Navbar.Brand>
                Khisoft
            </Navbar.Brand>
            <Nav>
                <Nav.Link href="http://khisoft.id/">Home</Nav.Link>
                <Nav.Link href="https://khisoft.id/blog/">Blog</Nav.Link>
                <Nav.Link href="https://profile.khisoft.id/index.html">About Me</Nav.Link>
                <Nav.Link href="https://github.com/khisby">Github</Nav.Link>
            </Nav>
        </Navbar>
        
        <Jumbotron fluid>
            <Container>
                <h1>Snake and Ladder</h1>
                <p>
                    Hallo, ini adalah game ular tangga sederhana. Ayoo buat room dan ajak temanmu main bareng
                </p>
                
                    <img src={Background} width={200}/>
            </Container>
        </Jumbotron>
        
        <Container fluid>
            <Row>
                <Col></Col>
                <Col xs={8} >
                    <Row noGutters className="text-center">
                        <Col xs={2}></Col>
                        <Col xs={6} className="m-0">
                            <FormControl type="text" value={teks} onChange={handleChange} placeholder="id room" className="mr-2" />
                        </Col>
                        <Col xs={2}>
                            <Button as={Link} size="md" block to={ `/room/${teks}` } className='ml-3' variant="primary">Join</Button>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
            <Row className='mt-3'>
                <Col></Col>
                <Col xs={8} className="text-center">
                    <Button as={Link} variant="secondary" to="/create" className='mr-3'>Buat Room Baru</Button>
                </Col>
                <Col></Col>
            </Row>
            
            
        </Container>
    </div>);
}
 
export default Home