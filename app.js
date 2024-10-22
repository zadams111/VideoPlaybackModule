// Get the document elements
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const playPauseButton = document.querySelector(".play-pause-btn");
const contentView = document.getElementById("content-container");
const timeline = document.getElementById("videoTimeline");
let video; // Declare video variable

// Play the video
function togglePlay() {
    if (video) { // Use the video variable
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
            contentView.innerHTML = ""; // Clear the previous content

            // Check if the file is an image or a video
            if (file.type.startsWith("image/")) {
                // Create an img element for image files
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "100%"; // Optional styling
                contentView.appendChild(img);
            } else if (file.type.startsWith("video/")) {
                // Create a video element for video files
                video = document.createElement("video"); // Assign to the global variable
                video.src = e.target.result;
                video.controls = true; // Add controls for playback
                video.style.maxWidth = "100%"; // Optional styling
                contentView.appendChild(video);

                // Update timeline when the video's metadata is loaded
                video.addEventListener('loadedmetadata', function() {
                    timeline.max = video.duration; // Set the max value of the timeline to video duration
                });

                // Update the timeline as the video plays
                video.addEventListener('timeupdate', updateTimeline);
            }
        };

        // Read the file as a Data URL (suitable for both images and videos)
        reader.readAsDataURL(file);
    }
}

function updateTimeline() {
    if (video) {
        timeline.value = video.currentTime; // Update timeline value to current time
    }
}

// Move the frame by a selected frame count
function moveFrame(frameCount) {
    const frameRate = 60; // Adjust frame rate if needed
    const secondsPerFrame = 1 / frameRate;

    if (video) {
        const newTime = video.currentTime + (frameCount * secondsPerFrame);
        video.currentTime = Math.max(0, Math.min(video.duration, newTime));
    }
}

// Add event listener for the play/pause button
playPauseButton.addEventListener('click', togglePlay);

// Seek video to slider value when input changes
timeline.addEventListener('input', function() {
    if (video) {
        video.currentTime = this.value; // Seek video to slider value
    }
});

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
