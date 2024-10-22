// Get the document elements
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const playPauseButton = document.querySelector(".play-pause-btn");
const contentView = document.getElementById("content-container");


// Play the video
function togglePlay() {
    const video = document.querySelector('video'); // Always get the latest video element
    if (video) {
        video.paused ? video.play() : video.pause();
    }
}

// Properly attach the 'upload' function to the 'onchange' event
fileInput.onchange = upload;

// Upload content
function upload(event) {
    event.preventDefault(); // Prevent default behavior

    // Get the selected file
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        // Read the file as a data URL
        reader.onload = function (e) {
            const resultDiv = document.getElementById("content-container");
            resultDiv.innerHTML = ""; // Clear the previous content

            // Check if the file is an image or a video
            if (file.type.startsWith("image/")) {
                // Create an img element for image files
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "100%"; // Optional styling
                resultDiv.appendChild(img);
            } else if (file.type.startsWith("video/")) {
                // Create a video element for video files
                const video = document.createElement("video");
                video.src = e.target.result;
                video.controls = true; // Add controls for playback
                video.style.maxWidth = "100%"; // Optional styling
                resultDiv.appendChild(video);
            }
        };

        // Read the file as a Data URL (suitable for both images and videos)
        reader.readAsDataURL(file);
    }
}

//move the frame by a selected frame count
function moveFrame(frameCount) {
    const frameRate = 60; // Adjust frame rate if needed
    const secondsPerFrame = 1 / frameRate;
    const video = document.querySelector('video'); // Always get the latest video element

    if (video) {
        const newTime = video.currentTime + (frameCount * secondsPerFrame);
        video.currentTime = Math.max(0, Math.min(video.duration, newTime));
    }
}

// Add event listener for the play/pause button
playPauseButton.addEventListener('click', togglePlay);

// Keyboard shortcuts
document.addEventListener("keydown", e => {
    switch (e.key.toLowerCase()) {
        case 'k':
        case ' ':
            togglePlay();
            break;
        case ',':
            moveFrame(-1);
            break;
        case '.':
            moveFrame(1);
            break;
        case 'j':
            moveFrame(-10);
            break;
        case 'l':
            moveFrame(10);
            break;
    }
});
