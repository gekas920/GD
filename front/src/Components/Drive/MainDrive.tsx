import React from "react";
import Requests from "../../Requests";
import MyDropzone from "./DropZone";
import { Document, Page} from 'react-pdf';
interface IProps {}
interface IState {
    numPages: number,
    pageNumber : number,
    data : string
}

class MainDrive extends React.Component<IProps,IState>{
    constructor(props) {
        super(props);
        this.state = {
            data:'',
            numPages:0,
            pageNumber:0
        }
    }
    componentDidMount(): void {
        Requests.get('/data')
            .then((response)=> {
                console.log(response.data);
                    this.setState({
                        data: response.data
                    })
                }
            )
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    render(){
        return(
            <div className='drive-main'>
                <MyDropzone/>
            </div>
        )
    }
}

export default MainDrive