import React, { Component } from 'react';
import Welcome from '../../Welcome/Welcome';
import Share from '../../Share/Share';
import { Card, CardDeck } from 'react-bootstrap';

import emus from '../../../img/actualEmu.jpg';
import "./Contact.css";



class Contact extends Component {
    state = {}
    render() {
        return (
            <div className="Contact">
                <h3 className="page-heading">Contact us!</h3>
                
                    <address>
                    <a href ="mailto:emuseconnect@gmail.com"> Email us for any comments/concerns! </a> 
                                </address>
                <h3 className="page-heading">Meet the devs!</h3>
                <div className="container">
                    <CardDeck className="info-card">
                        <Card>
                            <Card.Img variant="top" src={emus} />
                            <Card.Body>
                            <Card.Title>Paige Raun </Card.Title>
                            <Card.Text>
                            Senior CSCE major at Texas A&M
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small>
                            <address>
                                Email: <a href ="mailto:praun@tamu.edu "> praun@tamu.edu </a> 
                                </address>
                                
                            </small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={emus} />
                            <Card.Body>
                            <Card.Title>Zackary Ramirez</Card.Title>
                            <Card.Text>
                                Senior CSCE major at Texas A&M
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small>
                            <address>
                                Email: <a href ="mailto:zackaryramirez96@tamu.edu"> zackaryramirez96@tamu.edu</a> 
                            </address>
                                
                            </small>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <CardDeck className="info-card">
                        <Card>
                            <Card.Img variant="top" src={emus} />
                            <Card.Body>
                            <Card.Title>Joey Whitmore</Card.Title>
                            <Card.Text>
                            Senior CSCE major at Texas A&M
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small> 
                                <address>
                                Email: <a href ="mailto:joey-whitmore1997@tamu.edu"> joey-whitmore1997@tamu.edu</a> 
                                </address>
                            </small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={emus} />
                            <Card.Body>
                            <Card.Title>Omar Santos</Card.Title>
                            <Card.Text>
                            Senior CSCE major at Texas A&M
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small>
                            <address>
                                Email: <a href ="mailto:omars98@tamu.edu "> omars98@tamu.edu </a> 
                                </address>
                                
                            </small>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                </div>
            </div>
        );
    }
}
export default Contact;