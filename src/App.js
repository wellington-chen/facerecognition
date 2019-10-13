import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const clari = new Clarifai.App({
 apiKey: 'e21c651a5c2749c5aafb9e3108643851'
});

const particlesOpt = {
    "particles": {
        "number": {
            "value": 25,
            "density": {
                "enable": true,
                "value_area": 400
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "polygon",
            "stroke": {
                "width": 2,
                "color": "#ffffff"
            },
            "polygon": {
                "nb_sides": 6
            },
        },
        "opacity": {
            "value": 0.6,
            "random": true
        },
        "size": {
            "value": 10,
            "random": true
        },
        "line_linked": {
            "enable": false,
        },
        "move": {
            "enable": true,
            "speed": 4,
            "direction": "random",
            "random": true,
            "out_mode": "out",
            "bounce": true,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
}

class App extends Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imageURL: '',
            boundingBoxes: [],
            route: 'Signout',
            isSignedIn: false
        }
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onSubmit = () => {
        this.setState({ imageURL: this.state.input })

        clari.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then((response)=> {
            this.displayFace(this.calculateFace(response));
        }).catch(err => console.log(err));
            // .then(response => this.displayFace(this.calculateFace(response)))
            // .catch(err => console.log(err));
    }

    calculateFace = (data) => {
        const image = document.getElementById('image');
        const imageWidth = Number(image.width);
        const imageHeight = Number(image.height);

        // const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
        const arrBounding = data.outputs[0].data.regions.map((val)=> {
            return val.region_info.bounding_box;
        });

        const faceCoords = arrBounding.map((coords)=> {
            return {
                leftCol: coords.left_col * imageWidth,
                topRow: coords.top_row * imageHeight,
                rightCol: imageWidth - (coords.right_col * imageWidth),
                bottomRow: imageHeight - (coords.bottom_row * imageHeight)
            }
        });
        return faceCoords;
    }

    displayFace = (boxes) => {
        this.setState({
            boundingBoxes: boxes
        });
    }

    eraseBoxes = () => {
        this.setState({
            boundingBoxes: [],
            imageURL: '',
            input: ''
        });
        document.getElementById("searchField").value='';
    }

    routeChange = (route) => {
        if (route === 'Signout'){
            this.setState({isSignedIn: false})
        } else if (route === 'Home') {
            this.setState({isSignedIn: true})
        }
        this.setState({
            route: route
        });
    }

    render() {
        const { isSignedIn, route, boundingBoxes, imageURL } = this.state;
        const { routeChange, onInputChange, onSubmit, eraseBoxes } = this;
        return (
            <div className='App'>
                <Particles className='particles' params={particlesOpt} />
                <Navigation isSignedIn={isSignedIn} routeChange={routeChange}/>
                {
                    route === 'Signout'
                    ? <Signin routeChange={routeChange} />
                    : route === 'Register'
                    ? <Register routeChange={routeChange} />
                    : <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm onInputChange={onInputChange} onSubmit = {onSubmit} eraseBoxes={eraseBoxes}/>
                        <FaceRecognition coordinates={boundingBoxes} imageURL={imageURL}/>
                    </div>
                }
            </div>
        )
    }
}

export default App;
