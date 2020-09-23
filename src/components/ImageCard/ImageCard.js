import React, { Component } from 'react';

import './ImageCard.css';

// References:
//     https://www.w3schools.com/css/tryit.asp?filename=trycss_ex_images_card

//Primary colors: 
//  red, orange, yellow, green, blue, indigo, violet

//Main Use:
//  used for the about page to give descriptions of what each color represents
//  in regards to the lyrics

class ImageCard extends Component {
    render() {
        return (
            <div className="About">
                <div className="container">
                    <div className="row image-row">
                        <div className="col">
                            <div className="polaroid">
                                <img className="card-img-top color-images" src="https://dummyimage.com/600x400/FF4500/0x&text=+" alt="red"/>
                                <div className="polaroid-container">
                                    <p> A red output denotes a majority reading of anger. Red, the color of fire or blood, is commonly associated with strong, passionate, angry emotions. People moved to rage are sometimes described as red in the face, or when overcome by sudden anger can be said to be seeing red. If your song outputs a red or orangish hue that means the tone analyzer has detected anger. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="polaroid">
                                <img className="card-img-top color-images" src="https://dummyimage.com/600x400/FF69B4/0x&text=+" alt="orange"/>
                                <div className="polaroid-container">
                                    <p> Pink, the color of spring, new-borns and rose, is used to convey joy. Pink can be used in such phrases as ‘in the pink’ or ‘tickled pink’ which are used for positive or cheerful situations. It universally conveys sweet and playful emotions which is why it is used as output when a song’s lyrics register for joy. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="polaroid">
                                <img className="card-img-top color-images" src="https://dummyimage.com/600x400/BDB76B/0x&text=+" alt="yellow"/>
                                <div className="polaroid-container">
                                    <p> A pale yellow or calming tan is returned when a song has particularly tentative lyrics. The tentative style of writing conveys being unsure or not confident in what you are saying. A shy yellow to tan speaks of this same unsureness.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row image-row">
                        <div className="col">
                            <div className="polaroid">
                                <img className="card-img-top color-images" src="https://dummyimage.com/600x400/8FBC8F/0x&text=+" alt="green"/>
                                <div className="polaroid-container">
                                    <p> No light could be spookier than a greenish- yellow glow. Highly fearful lyrics will register a green to yellow image. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="polaroid">
                                <img className="card-img-top color-images" src="https://dummyimage.com/600x400/6495ED/0x&text=+" alt="blue"/>
                                <div className="polaroid-container">
                                    <p>If your song receives a mostly blue output the tone analyzer has registered a strong amount of sadness. Blue, like the vast ocean, tears, or rain, has long been associated with sad or melancholy emotions. There is no color more fit to represent sadness than the color blue.  </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="polaroid">
                                <img className="card-img-top color-images" src="https://dummyimage.com/600x400/8B008B/0x&text=+" alt="indigo"/>
                                <div className="polaroid-container">
                                    <p> Strong, bold and resilient, a purple output signifies a confident tone reading. Confidence is a powerful style of lyrics that is registered when the words convey the assuredness behind the sentences of a writer. Songs that register mostly confident are those with concrete and forceful writing. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row image-row">
                        <div className="col"></div>
                        <div className="col">
                            <div className="polaroid">
                                <img className="card-img-top color-images" src="https://dummyimage.com/600x400/BA55D3/0x&text=+" alt="violet"/>
                                <div className="polaroid-container">
                                    <p>Purple can be seen as calculating, powerful or ambitious. A returned color of a purple shade means the song your queried registered strongly analytical. Analytical is a style of writing that conveys critical thinking and decision making on the part of the author – it can be seen with thoughtful and dissecting songs. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageCard;