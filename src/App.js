import './App.css';
import Home from './Pages/Home'
import UploadFile from "./Pages/uploadFile";
import Loading from "./Pages/Loading";
import SpeechToText from "./Pages/speechToText";
import Voices from "./Pages/Voices";

import {useState} from "react";
function App() {
  const [mode, setMode] = useState(0);

    return (
        <div id="Pages">
            {
                (() => {
                    switch (mode) {
                        case 0:
                            return <Home setMode={setMode}/>;
                        case 1:
                            return <UploadFile setMode={setMode}/>;
                        case 2:
                            return <Loading setMode={setMode}/>;
                        case 3:
                            return <SpeechToText setMode={setMode}/>
                        case 4:
                            return <Voices setMode={setMode}/>
                        // default:
                        //     return null; // Handle default case if needed
                    }
                })()
            }
        </div>
    );
}

export default App;
