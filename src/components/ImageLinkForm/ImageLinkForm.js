import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit, eraseBoxes }) => {
    return (
        <div>
            <p className='f3'>
                {'I will detect your face'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input id='searchField' className='f4 pa2 w-60 center' type='text' onChange={onInputChange}/>
                    <button id='detect' className='w-25 dim pointer f4 link ph3 pv2 dib white' onClick={onSubmit}>Detect</button>
                    <button className='w-15 dim pointer f4 link ph3 pv2 dib white' onClick={eraseBoxes}>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;