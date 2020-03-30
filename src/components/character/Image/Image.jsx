import React from 'react'
import './Image.css'

const Image = props => 
    <div alt="" className="identity__image" 
        style={ { background: `url(${props.image}) center center / cover` } }> </div>

export default Image