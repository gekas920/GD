import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './Drive.sass'
import Requests from "../../Requests";

function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        acceptedFiles.forEach(elem=>{
            formData.append(elem.name,elem)
        });
        Requests.create('/upload',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res)=>{
                console.log(res)
            })
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div {...getRootProps()} className='drag-files'>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default MyDropzone