import React from "react";

// Bootstrap
import Button from 'react-bootstrap/Button';


function tags(props) {



    return (

        
        <div>
            <Button className="ButtonText" variant="info" size="sm" >{props.tags}</Button>
        </div>
    )
}

export default tags;