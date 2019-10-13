import React from 'react';

const Navigation = ({routeChange, isSignedIn}) => {
    if (isSignedIn) {
        return (<nav style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
            <p className='f3 link dim black underline pa3 pointer' onClick={() => routeChange('Signout')}>Sign Out</p>
        </nav>);
    } else if (!isSignedIn) {
        return (<nav style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
            <p className='f3 link dim black underline pa3 pointer' onClick={() => routeChange('Signout')}>Sign In</p>
            <p className='f3 link dim black underline pa3 pointer' onClick={() => routeChange('Register')}>Register</p>
        </nav>)
    }
}

export default Navigation;