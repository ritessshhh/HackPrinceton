import { FileUpload } from 'primereact/fileupload';
import React from 'react';
export default function uploadFile({setMode}) {
    var uploadButton = document.querySelector('.p-button[aria-label="Upload"]');

    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            if (!uploadButton.classList.contains('p-disabled')) {
                setMode(1);
            }
        });
    }


    return (
        <div className="card">
            <div className='mainUpload'></div>
            <h4 className='headingUpload'>Upload an audio file of at least 1 minute in length featuring the <br></br>voice
                you wish to replicate.</h4>
            <FileUpload className='uploadFileHere' name="demo[]" url={'http://127.0.0.1:5000/api/upload'} multiple
                        accept="audio/*" maxFileSize={10000000000}
                        emptyTemplate={<p className="m-0">Drag and drop the mp3 file to here to upload.</p>}
                        onUpload={() => {setTimeout(() => {
                            setMode(2)
                        }, 1500);}}/>
        </div>
    );
}