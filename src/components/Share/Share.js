import React, { Component } from 'react';
import {Button} from 'react';

import "./Share.css"



class Share extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shareOpen: "closeShare",
            toggleButtonText: "Share this"
        };
      
        this.shareOpenToggle = this.shareOpenToggle.bind(this);
    
      }
    
    shareOpenToggle() {
        if (this.state.shareOpen==="closeShare") {
            this.setState({
                shareOpen: "openShare",
                toggleButtonText: "Hide sharing options"
            });
        }else {
            this.setState({
                shareOpen: "closeShare",
                toggleButtonText: "Share this"
            });
        }   
    }
   

  render() {

  
    //URL from current page
    const url = "pic.twitter.com/IjKCI5TWLW";

    //URL patterns for Social media sites share functionalities
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twitterUrl = `https://twitter.com/home?status=${url}`;

    return (
        <div className="socialShareContainer">
            <div>
                <button className="socialShareButton" onClick={this.shareOpenToggle}>{this.state.toggleButtonText}</button>
            </div>
            <div className={this.state.shareOpen}>
                <a href={facebookUrl} target="_blank"><button href="#"> FB</button></a>
                <a href={twitterUrl} target="_blank"><button href="#"> TWITTER</button></a>
            </div>           
        </div>
    );
  }
}

export default Share;