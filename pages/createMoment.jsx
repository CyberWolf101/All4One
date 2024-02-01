import { Camera, RadioButtonChecked, RadioButtonUnchecked, Send } from '@mui/icons-material';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useCreateMoment } from '../hook/useMoments';
import { userContext } from '../contexts/userContext';
import MildSpiner from '../components/partials/mildSpiner';

const CreateMoment = () => {
  const [content, setContent] = useState('');
  const { loading, createMomentForUser, } = useCreateMoment()
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false)
  const [showSendButton, setShowSendButton] = useState(false)
  const [userDetails] = useContext(userContext)
  const [file, setFile] = useState(null)

  useEffect(() => {
    startCamera();

    // Add event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function
    return () => {
      stopCamera();
      // Remove the event listener when the component is unmounted
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true, // Add audio constraint
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.onstop = handleStop;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  const handleStop = () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const dataUrl = URL.createObjectURL(blob);

    // Save the recorded content to state
    setContent({ type: 'video', dataUrl });

    chunksRef.current = [];
  };


  const startRecording = () => {
    chunksRef.current = []; // Reset chunks
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false)
    setShowSendButton(true)

  };

  const stopCamera = () => {
    const videoElement = videoRef.current;

    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject;

      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  const handleCapture1 = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
        // Access the video element and capture a frame
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Convert the canvas content to a data URL (base64)
        const dataUrl = canvas.toDataURL('video/webm');  // Adjust the MIME type if necessary

        // Save the captured content to state
        setContent({ type: 'video', dataUrl });
        setShowSendButton(true);
    }
};

  const handleCapture = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Access the video element and capture a frame
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a data URL (base64)
      const dataUrl = canvas.toDataURL('image/jpeg');

      // Save the captured content to state
      setContent({ type: 'image', dataUrl }); // Make sure 'type' is set to 'image'
      setShowSendButton(true);
    }
  };

  const handleCreateMoment = () => {
    // Send the captured content to the backend (you may need to modify your API)
    createMomentForUser('test', userDetails._id, userDetails.userName, content);
    // createMomentForUser('test', userDetails._id, userDetails.userName, file);
    console.log(content);
    setContent('');
  };

  const handleBeforeUnload = (event) => {
    // This is called when the user is navigating away from the page
    // You can stop the camera or show a confirmation message here
    stopCamera();
    // You can also return a message to show a confirmation dialog
    event.returnValue = 'Are you sure you want to leave?';
  };


  const handleRetake = () => {
    setShowSendButton(false);
    setContent(''); // Clear the content state

    // Start the camera again
    startCamera();
  };

  return (
    <div>
      <center>
        {content.type === 'image' && <img src={content.dataUrl} alt="Captured Moment" />}
        {content.type === 'video' && <video src={content.dataUrl} controls alt="Recorded Moment" />}
      </center>


      {
        showSendButton &&

        <div>
          <center>
            <button
              onClick={handleRetake}
              className='btn btn-outline-success mx-2 my-2 no-hover text-success'
              style={{ width: '110px' }}
            >
              RETAKE
            </button>
            <button
              onClick={handleCreateMoment} className='btn btn-success mx-2 my-2'
              style={{ width: '110px' }}
              disabled={loading}
            >
              {loading ? <MildSpiner size='sm' /> : 'POST'}
            </button>

          </center>
        </div>
      }


      {/* Video element to display the camera stream */}

      {
        content === '' && (
          <div className='position-relative'>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: 'auto' }} />

            <div className='camera-actions'>
              {
                recording ?
                  <button onClick={stopRecording} className='btn btn-outline-danger mx-2 my-2 btn-sm'>
                    <RadioButtonChecked fontSize='small' />
                  </button>
                  :
                  <button onClick={startRecording} className='btn btn-success mx-2 my-2 btn-sm'>
                    <RadioButtonUnchecked fontSize='small' />
                  </button>
              }

              <button onClick={handleCapture} className='btn btn-success mx-2 my-2 btn-sm'>
                <Camera fontSize='small' />
              </button>

            </div>
          </div>
        )
      }

      {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
    </div>
  );
};

export default CreateMoment;
