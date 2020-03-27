import React from "react";
import Requests from "../../Requests";

class MainDrive extends React.Component{
    componentDidMount(): void {
        Requests.get('/data')
            .then((response)=>[
                console.log(response)
            ])
    }

    render(){
        return(
            <div>
                2323
            </div>
        )
    }
}

export default MainDrive