import React, { Component } from 'react';
import Welcome from '../../Welcome/Welcome';
import logo from '../../../img/emu.png';
import ImageCard from '../../ImageCard/ImageCard';

import "./About.css";

class About extends Component {
    state = {}
    render() {
        return (
                <div className="About">
                    <h3 className="primary-title">About eMuse</h3>
                    <div className="container">
                        <p>
                            Welcome to eMuse! Our web application aims to present you a shareable and thought-provoking image based on the lyrics of your favorite songs! We use a subroutine of the Turing Test certified AI, IBM’s Watson, to analyze the lyrics of a given song. We then put that analysis through our own algorithm and present you with a savable or shareable png of the color that best characterizes the lyrics. 
                        </p>
                          <p>
Our goal is to not get mixed up with the noise. We don’t look at the tempo or the mood of the music notes – we focus on the words. We want to know what the artist is really saying. Sometimes you get caught up in a tune and completely miss the meaning of the lyrics, paying no mind to what you are singing. We hope our little application here helps you see the other side of that tune. 

                        </p>
                    </div>
                    <div>
                    <h3 className="primary-title">The Primary Colors</h3>
                    <ImageCard className="cards"/>
                    </div>
                </div>
        );
    }
}

export default About;