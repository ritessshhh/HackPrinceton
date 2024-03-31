import './App.css';
import Home from './Pages/Home'
import UploadFile from "./Pages/uploadFile";
import Loading from "./Pages/Loading";
import SpeechToText from "./Pages/speechToText";
import Voices from "./Pages/Voices";
import CreatePlaylist from "./Pages/CreatingPlaylist"
import Spotify from "./Pages/Spotify";
import Loading2 from "./Pages/Loading2";
import CustomMusic from "./Pages/customMusic";

import {useState} from "react";
function App() {
  const [mode, setMode] = useState(0);
  const [playList, setPlaylist] = useState("");

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
                        case 5:
                            return <CreatePlaylist setMode={setMode} playList={playList} setPlaylist={setPlaylist}/>
                        case 6:
                            return <Spotify setMode={setMode} playList={playList} setPlaylist={setPlaylist}/>
                        case 7:
                            return <Loading2 setMode={setMode}/>
                        case 8:
                            return <CustomMusic setMode={setMode}/>
                        // default:
                        //     return null; // Handle default case if needed
                    }
                })()
            }
        </div>
    );
}

export default App;
