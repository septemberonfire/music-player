const playButton3 = document.querySelector("#playButton3");
const playButtonIcon3 = document.querySelector("#playButtonIcon3");
const waveform3 = document.querySelector("#waveform3");
const volumeIcon3 = document.querySelector("#volumeIcon3");
const volumeSlider3 = document.querySelector("#volumeSlider3");
const currentTime3 = document.querySelector("#currentTime3");
const totalDuration3 = document.querySelector("#totalDuration3");
// --------------------------------------------------------- //

const initializeWavesurfer = () => {
  return WaveSurfer.create({
    container: "#waveform3",
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
    playButtonIcon3.src = "assets/icons/pause.svg";
  } else {
    playButtonIcon3.src = "assets/icons/play.svg";
  }
};

const handleVolumeChange = (e) => {
  const volume3 = e.target.value / 100;
  wavesurfer.setVolume(volume3);
  localStorage.setItem("audio-player-volume3", volume3);
};

const setVolumeFromLocalStorage = () => {
  // Retrieves the volume from local storage, or falls back to default value of 50
  const volume3 = localStorage.getItem("audio-player-volume3") * 100 || 50;
  volumeSlider3.value = volume3;
};

const formatTimecode = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const toggleMute = () => {
  wavesurfer.toggleMute();
  const isMuted3 = wavesurfer.getMute();
  if (isMuted3) {
    volumeIcon3.src = "assets/icons/mute.svg";
    volumeSlider3.disabled = true;
  } else {
    volumeSlider3.disabled = false;
    volumeIcon3.src = "assets/icons/volume.svg";
  }
};

// --------------------------------------------------------- //

const wavesurfer = initializeWavesurfer();
wavesurfer.load("assets/audio/ThirtySecondsToMars-ABeautifulLie.mp3");

window.addEventListener("load", setVolumeFromLocalStorage);
playButton3.addEventListener("click", togglePlay);
volumeIcon3.addEventListener("click", toggleMute);
volumeSlider3.addEventListener("input", handleVolumeChange);
// --------------------------------------------------------- //

wavesurfer.on("ready", () => {
  // Set wavesurfer volume
  wavesurfer.setVolume(volumeSlider3.value / 100);
  // Set audio track total duration
  const duration = wavesurfer.getDuration();
  totalDuration3.innerHTML = formatTimecode(duration);
});
// Sets the timecode current timestamp as audio plays
wavesurfer.on("audioprocess", () => {
  const time3 = wavesurfer.getCurrentTime();
  currentTime3.innerHTML = formatTimecode(time3);
});
// Resets the play button icon after audio ends
wavesurfer.on("finish", () => {
  playButtonIcon3.src = "assets/icons/play.svg";
});
