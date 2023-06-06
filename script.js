console.log("Welcome to Spotify");

//Initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems= Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Unison Aperture", filePath: "songs/1.mp3", coverPath: `covers/1.jpg`},
    {songName: "Arrow", filePath: "songs/2.mp3", coverPath: `covers/2.jpg`},
    {songName: "Firely", filePath: "songs/3.mp3", coverPath: `covers/3.jpg`},
    {songName: "Lights", filePath: "songs/4.mp3", coverPath: `covers/4.jpg`},
    {songName: "Twisted", filePath: "songs/5.mp3", coverPath: `covers/5.jpg`},
    {songName: "Palm oblivion", filePath: "songs/6.mp3", coverPath: `covers/6.jpg`},
    {songName: "Electronomia Vitality", filePath: "songs/7.mp3", coverPath: `covers/7.jpg`}
]


songItems.forEach((element, i)=>{
    // console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;
               
    var audio = new Audio(`songs/${i+1}.mp3`);
    audio.addEventListener('loadedmetadata', function() {
    var duration = audio.duration;
    var durationString = formatDuration(duration);
    element.getElementsByClassName("timestamp")[0].innerText=durationString;
});

function formatDuration(duration) {
  var minutes = Math.floor(duration / 60);
  var seconds = Math.floor(duration % 60);
  return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

    })
   

//Handle play pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value= progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        console.log(e.target)
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `songs/${songIndex}.mp3`;
        audioElement.currentTime= 0;
        audioElement.play();
        var currentSong = document.getElementById("currentSong");
        currentSong.textContent="";
        currentSong.innerHTML += songs[`${songIndex-1}`].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        console.log(audioElement.duration);
    })
})

let masterPrevious= document.getElementById('masterPrevious');
masterPrevious.addEventListener('click',()=>{
        audioElement.src=`songs/${songIndex-1}.mp3`;
        songIndex=songIndex-1;
        audioElement.play();
})

let masterNext= document.getElementById('masterNext');
masterNext.addEventListener('click',()=>{
        audioElement.src=`songs/${songIndex+1}.mp3`;
        songIndex=songIndex+1;
        audioElement.play();
})