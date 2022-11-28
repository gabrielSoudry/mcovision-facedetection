import * as faceapi from 'face-api.js';
import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

function Dashboard() {

    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);

    const videoRef = React.useRef(null);
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models';
            const mtcnnParams = {
                // number of scaled versions of the input image passed through the CNN
                // of the first stage, lower numbers will result in lower inference time,
                // but will also be less accurate
                maxNumScales: 10,
                // scale factor used to calculate the scale steps of the image
                // pyramid used in stage 1
                scaleFactor: 0.709,
                // the score threshold values used to filter the bounding
                // boxes of stage 1, 2 and 3
                scoreThresholds: [0.6, 0.7, 0.7],
                // mininum face size to expect, the higher the faster processing will be,
                // but smaller faces won't be detected
                minFaceSize: 50
            }
            const options = new faceapi.MtcnnOptions(mtcnnParams)
            const labels = ['Barney', 'Lily', 'Marshall', 'Robin', 'Ted']

            console.log(MODEL_URL)
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                faceapi.nets.mtcnn.loadFromUri(MODEL_URL)
            ]).then(() => {
                setModelsLoaded(true)
            }
            );
        }
        loadModels();
    }, []);

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then(stream => {
                let video = videoRef.current;
                console.log(videoRef);
                (videoRef.current as any).srcObject = stream;
                (videoRef.current as any).play();
            })
            .catch(err => {
                console.error("error ici:", err);
            });
    }

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current && videoRef.current) {
                (canvasRef.current as any).innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight
                }

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef && canvasRef.current && (canvasRef.current as any).getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

            }
        }, 100)
    }

    const closeWebcam = () => {
        (videoRef.current as any).pause();
        (videoRef.current as any).srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    }

    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ textAlign: 'center', padding: '10px' }}>
                {
                    captureVideo && modelsLoaded ?
                        <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            Close Webcam
                        </button>
                        :
                        <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            Open Webcam
                        </button>
                }
            </div>
            {
                captureVideo ?
                    modelsLoaded ?
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                            </div>
                        </div>
                        :
                        <div>loading...</div>
                    :
                    <>
                    </>
            }
        </div>
    );
}

export default Dashboard;
