import React from 'react'
import PropTypes from "prop-types";

const card = ({title,description,amount}) => {

    return (
        <div style={{border: "1px solid #FFC674", width:"500px", padding:"20px",margin: "20px", borderRadius: "10px"}}>
            <div>
                <div>{title}</div>
                <div>{description}</div>
                <div style={{display:"flex", justifyContent:"flex-end"}}>{amount}</div>   
            </div>
        </div>
    )
}

card.propsType = {
    title: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.string,
}

export default card
