import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { RecordButton, useRecordWebcam } from 'react-media-recorder';

function Post(props) {
  const webcamRef = useRef(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const { status, startRecording, stopRecording } = useRecordWebcam({
    video: true,
    audio: true,
    onStop: (blobUrl) => {
      setRecordedBlob(blobUrl);
    },
  });

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('Captured Image:', imageSrc);
    // You can handle the captured image source as needed
  };

  return (
    <div>
      POST
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'user', // or 'environment' for rear camera
        }}
      />
      <br />
      <button
        onClick={capture}
        className='btn btn-outline-success btn-sm mx-1'
      >
        Capture Photo
      </button>
      <RecordButton
        onStart={startRecording}
        onStop={stopRecording}
        isRecording={status === 'recording'}
      >
        {status === 'recording' ? 'Stop Recording' : 'Start Recording'}
      </RecordButton>
      {recordedBlob && (
        <div>
          <video controls src={recordedBlob} width={400} height={300} />
        </div>
      )}
    </div>
  );
}

export default Post;
