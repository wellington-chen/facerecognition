import React from 'react';
import './FaceRecognition.css';

const Boxes = ({top, bottom, right, left}) => {
    return(
            <div className='bounding-box' style={{top: top, bottom: bottom, right: right, left: left}}>
            </div>
    )
}

export default Boxes;


