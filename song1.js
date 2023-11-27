const playButton1 = document.querySelector("#playButton1");
const playButtonIcon1 = document.querySelector("#playButtonIcon1");
const waveform1 = document.querySelector("#waveform1");
const volumeIcon1 = document.querySelector("#volumeIcon1");
const volumeSlider1 = document.querySelector("#volumeSlider1");
const currentTime1 = document.querySelector("#currentTime1");
const totalDuration1 = document.querySelector("#totalDuration1");
// --------------------------------------------------------- //

const initializeWavesurfer = () => {
  return WaveSurfer.create({
    container: "#waveform1",
    responsive: true,
    height: 80,
    waveColor: "#ff5501",
    progressColor: "#d44700",
  });
};
// --------------------------------------------------------- //
// Functions
/*
 * Toggle play button
 */

const togglePlay = () => {
  wavesurfer.playPause();
  const isPlaying = wavesurfer.isPlaying();
  if (isPlaying) {
    playButtonIcon1.src = "assets/icons/pause.svg";
  } else {
    playButtonIcon1.src = "assets/icons/play.svg";
  }
};

/*
 * Handles changing the volume slider input
 * @param {event} e
 */

const handleVolumeChange = (e) => {
  const volume1 = e.target.value / 100;
  wavesurfer.setVolume(volume1);
  localStorage.setItem("audio-player-volume1", volume1);
};

/*
 * Retrieves the volume value from local storage and sets the volume slider
 */

const setVolumeFromLocalStorage = () => {
  // Retrieves the volume from local storage, or falls back to default value of 50
  const volume1 = localStorage.getItem("audio-player-volume1") * 100 || 50;
  volumeSlider1.value = volume1;
};

/*
 * Formats time as HH:MM:SS
 * @param {number} seconds
 * @returns time as HH:MM:SS
 */

const formatTimecode = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

/**
 * Toggles mute/unmute of the Wavesurfer volume
 * Also changes the volume icon and disables the volume slider
 */

const toggleMute = () => {
  wavesurfer.toggleMute();
  const isMuted1 = wavesurfer.getMute();
  if (isMuted1) {
    volumeIcon1.src = "assets/icons/mute.svg";
    volumeSlider1.disabled = true;
  } else {
    volumeSlider1.disabled = false;
    volumeIcon1.src = "assets/icons/volume.svg";
  }
};

// --------------------------------------------------------- //
// Create a new instance and load the wavesurfer
const wavesurfer = initializeWavesurfer();
wavesurfer.load("assets/audio/DanceGavinDance-MidnightCrusade.mp3");
// --------------------------------------------------------- //
// Javascript Event listeners
window.addEventListener("load", setVolumeFromLocalStorage);
playButton1.addEventListener("click", togglePlay);
volumeIcon1.addEventListener("click", toggleMute);
volumeSlider1.addEventListener("input", handleVolumeChange);
// --------------------------------------------------------- //
// Wavesurfer event listeners
wavesurfer.on("ready", () => {
  // Set wavesurfer volume
  wavesurfer.setVolume(volumeSlider1.value / 100);
  // Set audio track total duration
  const duration = wavesurfer.getDuration();
  totalDuration1.innerHTML = formatTimecode(duration);
});
// Sets the timecode current timestamp as audio plays
wavesurfer.on("audioprocess", () => {
  const time1 = wavesurfer.getCurrentTime();
  currentTime1.innerHTML = formatTimecode(time1);
});
// Resets the play button icon after audio ends
wavesurfer.on("finish", () => {
  playButtonIcon1.src = "assets/icons/play.svg";
});
