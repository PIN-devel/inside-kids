var webcamElement = document.getElementById("webcam");
var webcam = new Webcam(webcamElement, "user");
var canvasPerson = document.getElementById("canvasPerson");
var multiplier = 0.75;
var outputStride = 16;
var segmentationThreshold = 0.5;
var backgrounds = [
  "greatwall",
  "pyramid",
  "Colosseum",
  "monchu",
  "ayers-rock",
  "taj",
  "easter-island",
  "moon",
];
var backgroundImagesPath = "../src/assets/images/";
var snapSound = new Audio("audio/snap.wav");

var contextPerson = canvasPerson.getContext("2d");
var net;
var cameraFrame;
var currentBGIndex = 0;
var screenMode;
$("#webcam-start").ready(function() {
  cameraStarted();
  contextPerson.clearRect(0, 0, canvasPerson.width, canvasPerson.height);
  screenMode = window.innerWidth > window.innerHeight ? "l" : "p";
  cameraFrame = startDetectBody();
});

function detectBody() {
  net
    .segmentPerson(webcamElement, {
      flipHorizontal: false,
      internalResolution: "medium",
      segmentationThreshold: segmentationThreshold,
    })
    .catch(() => {})
    .then((personSegmentation) => {
      if (personSegmentation != null) {
        drawBody(personSegmentation);
      }
    });
  cameraFrame = requestAnimFrame(detectBody);
}

function startDetectBody() {
  webcam
    .stream()
    .then((result) => {
      if (net == null) {
        $(".spinner-border").removeClass("d-none");
        bodyPix
          .load({
            architecture: "MobileNetV1",
            outputStride: outputStride,
            multiplier: multiplier,
            quantBytes: 2,
          })
          .catch(() => {})
          .then((objNet) => {
            $(".spinner-border").addClass("d-none");
            net = objNet;
            $("#canvasPerson").removeClass("d-none");
            cameraFrame = detectBody();
          });
      } else {
        $("#canvasPerson").removeClass("d-none");
      }
    })
    .catch((err) => {
      displayError();
    });
}

function drawBody(personSegmentation) {
  if (screenMode == "l") {
    var canvas = document.createElement("canvas");
    canvas.width = webcamElement.width;
    canvas.height = webcamElement.height;
    var context = canvas.getContext("2d");
    context.drawImage(webcamElement, 0, 0);
    var imageData = context.getImageData(
      0,
      0,
      webcamElement.width,
      webcamElement.height
    );

    var pixel = imageData.data;
    for (var p = 0; p < pixel.length; p += 4) {
      if (personSegmentation.data[p / 4] == 0) {
        pixel[p + 3] = 0;
      }
    }
    context.imageSmoothingEnabled = true;
    context.putImageData(imageData, 0, 0);

    var imageObject = new Image();
    imageObject.onload = function() {
      contextPerson.clearRect(0, 0, canvasPerson.width, canvasPerson.height);
      contextPerson.imageSmoothingEnabled = true;
      contextPerson.drawImage(
        imageObject,
        0,
        0,
        canvasPerson.width,
        canvasPerson.height
      );
    };
    imageObject.src = canvas.toDataURL();
  } else {
    contextPerson.drawImage(
      webcamElement,
      0,
      0,
      webcamElement.width,
      webcamElement.height
    );
    var imageData = contextPerson.getImageData(
      0,
      0,
      webcamElement.width,
      webcamElement.height
    );
    var pixel = imageData.data;
    for (var p = 0; p < pixel.length; p += 4) {
      if (personSegmentation.data[p / 4] == 0) {
        pixel[p + 3] = 0;
      }
    }
    contextPerson.imageSmoothingEnabled = true;
    contextPerson.putImageData(imageData, 0, 0);
  }
}

$("#take-photo").click(function() {
  beforeTakePhoto();
  var captureElement = document.getElementById("selfie-container");
  var appendElement = document.getElementById("webcam-container");
  html2canvas(captureElement).then(function(canvas) {
    canvas.id = "captureCanvas";
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    appendElement.appendChild(canvas);
    document.querySelector("#download-photo").href = canvas.toDataURL(
      "image/png"
    );
    webcam.stop();
    cancelAnimationFrame(cameraFrame);
    afterTakePhoto();
  });
});

$("#resume-camera").click(function() {
  webcam.stream().then((facingMode) => {
    removeCapture();
    contextPerson.clearRect(0, 0, canvasPerson.width, canvasPerson.height);
  });
});

$("#exit-app").click(function() {
  removeCapture();
  $("#webcam-switch")
    .prop("checked", false)
    .change();
});

$(window).resize(function() {
  screenModeChange();
});

function screenModeChange() {
  screenMode = window.innerWidth > window.innerHeight ? "l" : "p";
  if (screenMode == "l") {
    canvasPerson.style.width = "100vw";
    canvasPerson.style.height = "auto";
  } else {
    canvasPerson.style.width = window.innerWidth + "px";
    canvasPerson.style.height = "100vh";
  }
}
