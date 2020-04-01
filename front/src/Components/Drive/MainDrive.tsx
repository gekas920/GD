import React from "react";
import Requests from "../../Requests";
import MyDropzone from "./DropZone";

class MainDrive extends React.Component{
    componentDidMount(): void {
        Requests.get('/data')
            .then((response)=>[
            ])
    }

    render(){
        return(
            <div className='drive-main'>
                <MyDropzone/>
            </div>
        )
    }
}

export default MainDrive