import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

export default function DiaryArea({ setMode, playList, setPlaylist }) {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [audioUrl, setAudioUrl] = useState(''); // Added state to store the audio URL
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (event) => {
        const xhr = event.xhr; // XMLHttpRequest object
        console.log('Response from server:', xhr);
        try {
            const response = JSON.parse(xhr.responseText);
            const audioUrl = response.audio_url;
            setAudioUrl(audioUrl); // Set the audio URL in the state
            toast.current.show({ severity: 'info', summary: 'Upload Successful', detail: 'Audio file is ready to play.', life: 3000 });
        } catch (error) {
            console.error('Error parsing response from server:', error);
            toast.current.show({ severity: 'error', summary: 'Upload Error', detail: 'Could not parse response.', life: 3000 });
        }
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setAudioUrl(''); // Clear the audio URL as well
    };

    const renderAudioPlayer = () => {
        return audioUrl ? (
            <div className="audio-player">
                <audio controls src={audioUrl}>
                    Your browser does not support the audio element.
                </audio>
            </div>
        ) : null;
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <>
                <div className="flex align-items-center flex-column">

                    <textarea name="" id="" cols="80" rows="20"></textarea>
                </div>
                <div className="card flex justify-content-center">
                    <Button label="Submit"/>
                </div>
                {renderAudioPlayer()}
            </>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined diaryChose' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined diaryChose' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined diaryChose' };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} name="demo[]" url="http://127.0.0.1:5000/heal" multiple accept="text/*" maxFileSize={1000000}
                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />


        </div>
    )
}
