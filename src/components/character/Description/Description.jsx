import React from 'react'

const Description = props => 
    <div className="description__group">
        {props.description.map((desc, index) => <span className="description__line" key={index}>{desc}</span> )} 
    </div>

export default Description