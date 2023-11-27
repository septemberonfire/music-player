const playButton5 = document.querySelector("#playButton5");
const playButtonIcon5 = document.querySelector("#playButtonIcon5");
const waveform5 = document.querySelector("#waveform5");
const volumeIcon5 = document.querySelector("#volumeIcon5");
const volumeSlider5 = document.querySelector("#volumeSlider5");
const currentTime5 = document.querySelector("#currentTime5");
const totalDuration5 = document.querySelector("#totalDuration5");
// --------------------------------------------------------- //

const initializeWavesurfer = () => {
  return WaveSurfer.create({
    container: "#waveform5",
    responsive: true,
    height: 80,
    waveColor: "#ff5501",
    progressColor: "#d44700",
  });
};
// --------------------------------------------------------- //

const togglePlay = () => {
  wavesurfer.playPause();
  const isPlaying = wavesurfer.isPlaying();
  if (isPlaying) {
    playButtonIcon5.src = "assets/icons/pause.svg";
  } else {
    playButtonIcon5.src = "assets/icons/play.svg";
  }
};

const handleVolumeChange = (e) => {
  const volume5 = e.target.value / 100;
  wavesurfer.setVolume(volume5);
  localStorage.setItem("audio-player-volume5", volume5);
};

const setVolumeFromLocalStorage = () => {
  // Retrieves the volume from local storage, or falls back to default value of 50
  const volume5 = localStorage.getItem("audio-player-volume5") * 100 || 50;
  volumeSlider5.value = volume5;
};

const formatTimecode = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const toggleMute = () => {
  wavesurfer.toggleMute();
  const isMuted5 = wavesurfer.getMute();
  if (isMuted5) {
    volumeIcon5.src = "assets/icons/mute.svg";
    volumeSlider5.disabled = true;
  } else {
    volumeSlider5.disabled = false;
    volumeIcon5.src = "assets/icons/volume.svg";
  }
};

// --------------------------------------------------------- //

const wavesurfer = initializeWavesurfer();
wavesurfer.load("assets/audio/BringMeTheHorizon-ChelseaSmile.mp3");

window.addEventListener("load", setVolumeFromLocalStorage);
playButton5.addEventListener("click", togglePlay);
volumeIcon5.addEventListener("click", toggleMute);
volumeSlider5.addEventListener("input", handleVolumeChange);
// --------------------------------------------------------- //

wavesurfer.on("ready", () => {
  // Set wavesurfer volume
  wavesurfer.setVolume(volumeSlider5.value / 100);
  // Set audio track total duration
  const duration = wavesurfer.getDuration();
  totalDuration5.innerHTML = formatTimecode(duration);
});
// Sets the timecode current timestamp as audio plays
wavesurfer.on("audioprocess", () => {
  const time5 = wavesurfer.getCurrentTime();
  currentTime5.innerHTML = formatTimecode(time5);
});
// Resets the play button icon after audio ends
wavesurfer.on("finish", () => {
  playButtonIcon5.src = "assets/icons/play.svg";
});
