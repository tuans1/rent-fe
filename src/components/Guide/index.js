import { React } from 'react';
import YouTube from 'react-youtube';

function Guide() {
    const opts = {
        height: '600',
        width: '1296',

    };
    const onReadyVideo = (e) => {
        e.target.pauseVideo();
    }
    return (
        <div>
            <h1 style={{color:"white"}}>HƯỚNG DẪN THUÊ ACC</h1>
            <YouTube videoId="z2T2EPqDkXg" opts={opts} onReady={(e) => onReadyVideo(e)} />;
        </div>
    )
}

export default Guide;