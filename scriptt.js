

var pieces, radius, fft, analyzer, mapMouseX, mapMouseY, audio, toggleBtn, uploadBtn, uploadedAudio, uploadAnim;
var colorPalette = ["#2b2b2b", "#86dba7", "#fcf917", "#d363ff", "#fcf917"];
var uploadLoading = false;
// random color generator when refreshed
var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
var randomColorTwo = '#'+Math.floor(Math.random()*16777217).toString(16);


function preload() {
    audio = loadSound("Crumb - Plants.mp3"); 
}

function uploaded(file) {
    uploadLoading = true;
    uploadedAudio = loadSound(file.data, uploadedAudioPlay);
    
}


function uploadedAudioPlay(audioFile) {

    uploadLoading = false;

    if (audio.isPlaying()) {
        audio.pause();
    }

    audio = audioFile;
    audio.loop();
}

function setup() {

    uploadAnim = select('#uploading-animation');

    createCanvas(windowWidth, windowHeight);

    toggleBtn = createButton("Play / Pause");

    uploadBtn = createFileInput(uploaded);

    uploadBtn.addClass("upload-btn");
    uploadBtn.style.display = "none";
    
    toggleBtn.addClass("pause-btn");

    toggleBtn.mousePressed(toggleAudio);

    // analyze audio for frequency
    analyzer = new p5.Amplitude();
    fft = new p5.FFT();
    audio.loop();

}




function draw() {



    background("#000000");
    translate(windowWidth / 2, windowHeight / 2);

    level = analyzer.getLevel();
    fft.analyze();

    var bass = fft.getEnergy("bass");
    var mid = fft.getEnergy(50, 250);

    // animation when paused
    if (!audio.isPlaying()) {
        var mapBassX = map(mouseX, 0, width, 400, 1200);

        for (var b = 0; b < 100; b++) {

            push();
            noFill();
            // fill(colorPalette[3]);
            // stroke(colorPalette[3]);
            stroke(randomColor);
            // stroke is purple (3)
            rotate(b);
            ellipse(80, 40, 80, 50);
            // applyMatrix(1 / step, 0, 0, 1 / step, 0, 0);
            strokeWeight(_mapScale * 2);
            bezier(_mapBassX - b, 10, 1700, 2, 2000, 1, 300, 10);
            pop();

        }
    } else {

        // bass/frequency
        var _mapBassX = map(mouseX, 0, width, 400, 1200);
        for (var b = 0; b < bass; b++) {
            var _mapScale = map(b, 0, bass, 0, 1);
            push();
            noFill();
            // fill(colorPalette[3]);
            // stroke(colorPalette[3]);
            stroke(randomColor);
            // stroke is purple (3)
            rotate(b);
            ellipse(80, 40, 80, 50);
            // applyMatrix(1 / step, 0, 0, 1 / step, 0, 0);
            strokeWeight(_mapScale * 2);
            bezier(_mapBassX - b, 1700, 10, 1, 2, 2000, 1, 300, 10);
            pop();
        }

       
    }


}


function toggleAudio() {
    if (audio.isPlaying()) {
        audio.pause();
    } else {
        audio.play();
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
