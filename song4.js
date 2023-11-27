const playButton4 = document.querySelector("#playButton4");
const playButtonIcon4 = document.querySelector("#playButtonIcon4");
const waveform4 = document.querySelector("#waveform4");
const volumeIcon4 = document.querySelector("#volumeIcon4");
const volumeSlider4 = document.querySelector("#volumeSlider4");
const currentTime4 = document.querySelector("#currentTime4");
const totalDuration4 = document.querySelector("#totalDuration4");
// --------------------------------------------------------- //

const initializeWavesurfer = () => {
  return WaveSurfer.create({
    container: "#waveform4",
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
    playButtonIcon4.src = "assets/icons/pause.svg";
  } else {
    playButtonIcon4.src = "assets/icons/play.svg";
  }
};

const handleVolumeChange = (e) => {
  const volume4 = e.target.value / 100;
  wavesurfer.setVolume(volume4);
  localStorage.setItem("audio-player-volume4", volume4);
};

const setVolumeFromLocalStorage = () => {
  // Retrieves the volume from local storage, or falls back to default value of 50
  const volume4 = localStorage.getItem("audio-player-volume4") * 100 || 50;
  volumeSlider4.value = volume4;
};

const formatTimecode = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const toggleMute = () => {
  wavesurfer.toggleMute();
  const isMuted4 = wavesurfer.getMute();
  if (isMuted4) {
    volumeIcon4.src = "assets/icons/mute.svg";
    volumeSlider4.disabled = true;
  } else {
    volumeSlider4.disabled = false;
    volumeIcon4.src = "assets/icons/volume.svg";
  }
};

// --------------------------------------------------------- //

const wavesurfer = initializeWavesurfer();
wavesurfer.load("assets/audio/ADayToRemember-AShotInTheDark.mp3");

window.addEventListener("load", setVolumeFromLocalStorage);
playButton4.addEventListener("click", togglePlay);
volumeIcon4.addEventListener("click", toggleMute);
volumeSlider4.addEventListener("input", handleVolumeChange);
// --------------------------------------------------------- //

wavesurfer.on("ready", () => {
  // Set wavesurfer volume
  wavesurfer.setVolume(volumeSlider4.value / 100);
  // Set audio track total duration
  const duration = wavesurfer.getDuration();
  totalDuration4.innerHTML = formatTimecode(duration);
});
// Sets the timecode current timestamp as audio plays
wavesurfer.on("audioprocess", () => {
  const time4 = wavesurfer.getCurrentTime();
  currentTime4.innerHTML = formatTimecode(time4);
});
// Resets the play button icon after audio ends
wavesurfer.on("finish", () => {
  playButtonIcon4.src = "assets/icons/play.svg";
});
