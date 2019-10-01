const btnCancelar = document.querySelector('#btnAlertaCancelar');
const btnComenzar = document.querySelector('#btnAlertaComenzar');
const alerta = document.querySelector('.alertaContainer');
const misGifos = document.querySelector('#misGifosSection');
const btnCaptura1 = document.querySelector('#btnCaptura1');
const btnCaptura2 = document.querySelector('#btnCaptura2')
const btnCapturaGrabacion1 = document.querySelector('#btnCapturaGrabacion1');
const btnCapturaGrabacion2 = document.querySelector('#btnCapturaGrabacion2');
const btnRepetirCaptura = document.querySelector('#btnRepetirCaptura');
const btnSubirGifo = document.querySelector('#btnSubirGifo');
const capturaContainer = document.querySelector('#captura');
const canvas = document.querySelector('#canvas');


btnCancelar.addEventListener('click', () => alerta.style.display = "none");
btnComenzar.addEventListener('click', () => {
    alerta.style.display = "none";
    misGifos.style.display = "none";
    capturaContainer.style.display = "block";
    canvas.src = gifURL;
})

btnCaptura2.addEventListener('click', () => {
    btnCaptura1.style.display = "none";
    btnCaptura2.style.display = "none";
    btnCapturaGrabacion1.style.display = "inline-block";
    btnCapturaGrabacion2.style.display = "inline-block";
    //? RecordRTC
    captureCamera(function (camera) {
        recorder = RecordRTC(camera, {
            type: "gif",
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifPreview: function (gifURL) {
                canvas.src = gifURL;
            }
        });

        recorder.startRecording();

        // release camera on stopRecording
        recorder.camera = camera;
    });
})

const captura = () => {
    btnCapturaGrabacion1.style.display = "none";
    btnCapturaGrabacion2.style.display = "none";
    btnRepetirCaptura.style.display = "inline-block"
    btnSubirGifo.style.display = "inline-block"

    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
}

btnCapturaGrabacion2.addEventListener('click', captura);
btnRepetirCaptura.addEventListener('click', () => {
    btnRepetirCaptura.style.display = "none";
    btnSubirGifo.style.display = "none";
    btnCaptura1.style.display = "inline-block";
    btnCaptura2.style.display = "inline-block";
    canvas.src = camera;
});

//? recordRTC 
function captureCamera(callback) {
    navigator.mediaDevices
        .getUserMedia({
            video: true
        })
        .then(function (camera) {
            callback(camera);
        })
        .catch(function (error) {
            alert("Unable to capture your camera. Please check console logs.");
            console.error(error);
        });
}

function stopRecordingCallback() {
    canvas.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

var recorder; // globally accessible

// document.getElementById("btn-start-recording").onclick = function () {
//     this.disabled = true;
//     captureCamera(function (camera) {
//         recorder = RecordRTC(camera, {
//             type: "gif",
//             frameRate: 1,
//             quality: 10,
//             width: 360,
//             hidden: 240,
//             onGifRecordingStarted: function () {
//                 document.querySelector("h1").innerHTML = "Gif recording started.";
//             },
//             onGifPreview: function (gifURL) {
//                 image.src = gifURL;
//             }
//         });

//         recorder.startRecording();

//         // release camera on stopRecording
//         recorder.camera = camera;

//         document.getElementById("btn-stop-recording").disabled = false;
//     });
// };

// document.getElementById("btn-stop-recording").onclick = function () {
//     this.disabled = true;
//     recorder.stopRecording(stopRecordingCallback);
// };