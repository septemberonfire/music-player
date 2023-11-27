const playButton2 = document.querySelector("#playButton2");
const playButtonIcon2 = document.querySelector("#playButtonIcon2");
const waveform2 = document.querySelector("#waveform2");
const volumeIcon2 = document.querySelector("#volumeIcon2");
const volumeSlider2 = document.querySelector("#volumeSlider2");
const currentTime2 = document.querySelector("#currentTime2");
const totalDuration2 = document.querySelector("#totalDuration2");
// --------------------------------------------------------- //

const initializeWavesurfer = () => {
  return WaveSurfer.create({
    container: "#waveform2",
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
    playButtonIcon2.src = "assets/icons/pause.svg";
  } else {
    playButtonIcon2.src = "assets/icons/play.svg";
  }
};

const handleVolumeChange = (e) => {
  const volume2 = e.target.value / 100;
  wavesurfer.setVolume(volume2);
  localStorage.setItem("audio-player-volume2", volume2);
};

const setVolumeFromLocalStorage = () => {
  // Retrieves the volume from local storage, or falls back to default value of 50
  const volume2 = localStorage.getItem("audio-player-volume2") * 100 || 50;
  volumeSlider2.value = volume2;
};

const formatTimecode = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const toggleMute = () => {
  wavesurfer.toggleMute();
  const isMuted2 = wavesurfer.getMute();
  if (isMuted2) {
    volumeIcon2.src = "assets/icons/mute.svg";
    volumeSlider2.disabled = true;
  } else {
    volumeSlider2.disabled = false;
    volumeIcon2.src = "assets/icons/volume.svg";
  }
};

// --------------------------------------------------------- //

const wavesurfer = initializeWavesurfer();
wavesurfer.load("assets/audio/WithinDestruction-Void.mp3");

window.addEventListener("load", setVolumeFromLocalStorage);
playButton2.addEventListener("click", togglePlay);
volumeIcon2.addEventListener("click", toggleMute);
volumeSlider2.addEventListener("input", handleVolumeChange);
// --------------------------------------------------------- //

wavesurfer.on("ready", () => {
  // Set wavesurfer volume
  wavesurfer.setVolume(volumeSlider2.value / 100);
  // Set audio track total duration
  const duration = wavesurfer.getDuration();
  totalDuration2.innerHTML = formatTimecode(duration);
});
// Sets the timecode current timestamp as audio plays
wavesurfer.on("audioprocess", () => {
  const time2 = wavesurfer.getCurrentTime();
  currentTime2.innerHTML = formatTimecode(time2);
});
// Resets the play button icon after audio ends
wavesurfer.on("finish", () => {
  playButtonIcon2.src = "assets/icons/play.svg";
});
