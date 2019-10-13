import React from 'react';
import './FaceRecognition.css';
import Boxes from './Boxes';

const FaceRecognition = ({imageURL, coordinates}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='image' alt='' src={imageURL} width='500px' height='auto' />
                {coordinates.map((coord, i)=> {
                    return <Boxes key={i} top={coord.topRow} bottom={coord.bottomRow} right={coord.rightCol} left={coord.leftCol} />
                })
            }
            </div>
        </div>
    )
}

export default FaceRecognition;