const playButton = document.getElementById('play-button');
const audio = new Audio('./assets/songs/OMW-Samijazz.mp3');  // Ensure the audio file path is correct
const canvas = document.getElementById('audio-visualizer');
const ctx = canvas.getContext('2d');
let audioContext, analyser, dataArray, bufferLength, source;

// Add event listener to play/pause the audio
playButton.addEventListener('click', () => {
    console.log("Play button clicked");

    if (!audioContext) {
        console.log("Creating AudioContext...");
        audioContext = new AudioContext();

        // Create a media element source connected to the analyser
        source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;  // Size of the frequency data array
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        // Check if AudioContext is properly resumed
        audioContext.resume().then(() => {
            console.log('Audio Context Resumed');
        }).catch((err) => {
            console.log('Error resuming AudioContext:', err);
        });
    }

    // Check if audio is paused or playing, and toggle accordingly
    if (audio.paused) {
        console.log("Playing audio...");
        audio.play().catch((err) => {
            console.error('Audio play error:', err);
        });
        visualize();  // Start the visualizer
    } else {
        console.log("Pausing audio...");
        audio.pause();  // Pause the audio
    }
});


// Visualizer function to draw frequency bars on the canvas
function visualize() {
    if (!analyser) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas before drawing
    analyser.getByteFrequencyData(dataArray);  // Get frequency data

    ctx.fillStyle = '#6c63ff';
    dataArray.forEach((value, i) => {
        ctx.fillRect(i * 4, canvas.height - value, 3, value);  // Draw the frequency bars
    });

    // Continuously call visualize() if audio is playing
    if (!audio.paused) {
        requestAnimationFrame(visualize);
    }
}

// Debugging: Listen for audio readiness
audio.addEventListener('canplaythrough', () => {
    console.log('Audio is ready to play');
});

// Debugging: Listen for audio load error
audio.addEventListener('error', (err) => {
    console.error('Audio loading error:', err);
});




const trackImages = [
    "./assets/images/asake.jpeg", // Replace with actual track images
    "./assets/images/imole.jpeg",
    "./assets/images/burnaboy.jpeg",
  ];
  
  let currentAudio = null;
  
  function playTrack(index) {
    const audio = document.getElementById(`audio${index}`);
    const playButton = document.getElementById(`play${index}`);
  
    // Pause currently playing audio (if any)
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      document.querySelector(".play-btn").innerText = "▶";
    }
  
    // Play or Pause logic
    if (audio.paused) {
      audio.play();
      playButton.innerText = "⏸";
      currentAudio = audio;
      document.getElementById("track-image").src = trackImages[index];
    } else {
      audio.pause();
      playButton.innerText = "▶";
    }
  
    // Update progress bar
    audio.ontimeupdate = () => {
      const progressBar = document.getElementById(`progress${index}`);
      progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    };
  }
  



  //countdown

  // Countdown Timer Logic
function startCountdown(targetDate) {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
  
      if (distance <= 0) {
        clearInterval(timer);
        document.querySelector(".countdown-timer").innerHTML = "Event Started!";
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById("days").innerText = days;
      document.getElementById("hours").innerText = hours;
      document.getElementById("minutes").innerText = minutes;
      document.getElementById("seconds").innerText = seconds;
    }, 1000);
  }
  
  // Set target event date
  const eventDate = new Date("2024-12-15T00:00:00").getTime();
  startCountdown(eventDate);
  