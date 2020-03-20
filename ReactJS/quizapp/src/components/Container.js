import React from 'react';
import '../App.css'

const Container = props =>
    <div className="fluid">
        <div className="container">
            {props.children}
        </div>
    </div>

export default Container;