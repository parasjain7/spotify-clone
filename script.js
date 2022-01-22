console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Bachpan Ka Pyar - Badshah", filePath: "songs/1.mp3", coverPath: "covers/Bachpan Ka Pyar.jpg"},
    {songName: "Bijlee Bijlee - Harrdy Sandhu", filePath: "songs/2.mp3", coverPath: "covers/Bijlee Bijlee.jpg"},
    {songName: "Infinity", filePath: "songs/3.mp3", coverPath: "covers/Infinity.jpg"},
    {songName: "Jugnu - Badshah", filePath: "songs/4.mp3", coverPath: "covers/Jugnu.jpg"},
    {songName: "Param Sundari - Shreya Ghosal", filePath: "songs/5.mp3", coverPath: "covers/Param Sundari.jpg"},
    {songName: "Sajna - Badshah", filePath: "songs/6.mp3", coverPath: "covers/Sajna.jpg"},
    {songName: "Srivalli - Javed Ali", filePath: "songs/7.mp3", coverPath: "covers/Srivalli.jpg"},
    {songName: "The Good Part", filePath: "songs/8.mp3", coverPath: "covers/The Good Part.jpg"},
    {songName: "Tip Tip Barsa Pani 2.0", filePath: "songs/9.mp3", coverPath: "covers/Tip Tip Barsa Pani.jpg"},
    {songName: "Tu Aake Dekh Le", filePath: "songs/10.mp3", coverPath: "covers/Tu Aake Dekh Le.jpg"}
]

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        makeAllPlay();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update SeekBar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('forward').addEventListener('click', ()=>{
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('backward').addEventListener('click', (e)=>{
    makeAllPlay();
    e.target.classList.remove('fa-pause-circle');
    e.target.classList.add('fa-play-circle');
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});