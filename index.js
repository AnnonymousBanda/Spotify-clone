const musicPath=["./songs/Mumbai Indians Anthem.mp3",
                "./songs/JUNGLE HAI AADHI RAAT X GRIND.mp3",
                "./songs/Bye Pewdiepie Carryminati.mp3"];

let musicNumber=0;
let music = new Audio(musicPath[0]);
let intervalId;

music.addEventListener("ended",()=>{
  clearInterval(intervalId);
  play_pause_btn.setAttribute("src", "./playback/play.svg")
});

const play_pause_btn=document.querySelector(".play-pause");
play_pause_btn.addEventListener("click", play_pause=function () {
    
    if (music.paused) {
        play_pause_btn.setAttribute("src", "./playback/pause.svg")
        music.play();     
        
        intervalId = setInterval(progress, 500);
    } 
    else {
        play_pause_btn.setAttribute("src", "./playback/play.svg")
        music.pause();

        clearInterval(intervalId);
    }
});

document.querySelector(".replay-btn").addEventListener("click",()=>{
  
  document.querySelector(".progress").style.width = 0 +"px";
  document.querySelector(".pointer").style.transform = `translateX(0px)`;

  music.pause();
  clearInterval(intervalId);    

  play_pause_btn.setAttribute("src", "./playback/pause.svg");

  music=new Audio(musicPath[musicNumber]);
  
  intervalId = setInterval(progress, 500);

  music.play();
});

const volumne_btn=document.querySelector(".volume-btn").addEventListener("click",function () {
    music.muted=!music.muted
    let path=["./playback/volume.svg","./playback/mute.svg"];    
    document.querySelector(".volume-btn").setAttribute("src",path[(music.muted)+0]);
});

const prev=document.querySelector(".prev");
const next=document.querySelector(".next");

next.addEventListener("click", ()=>{  
  document.querySelector(".progress").style.width = 0 +"px";
  document.querySelector(".pointer").style.transform = `translateX(-6px)`;

  music.pause();
  
  clearInterval(intervalId);  

  play_pause_btn.setAttribute("src", "./playback/pause.svg");
  musicNumber=(musicNumber+1)%musicPath.length;

  intervalId = setInterval(progress, 500);
  
  music=new Audio(musicPath[musicNumber]);
  music.play();
});

prev.addEventListener("click", ()=>{
  document.querySelector(".progress").style.width = 0 +"px";
  document.querySelector(".pointer").style.transform = `translateX(-6px)`;

  music.pause();

  clearInterval(intervalId);  

  play_pause_btn.setAttribute("src", "./playback/pause.svg");
  musicNumber=(musicNumber-1)===-1?musicPath.length-1:musicNumber-1;
  music=new Audio(musicPath[musicNumber]);

  intervalId = setInterval(progress, 500);

  music.play();
});


const duration=()=>{
  return music.duration};

const currentTime=()=>{
    return music.currentTime};

const progress=function() {
  let totalDuration=duration();
  let movement=(parseFloat(document.querySelector(".progress-bar").offsetWidth)/Math.ceil(totalDuration))*Math.ceil(currentTime());

  document.querySelector(".progress").style.width = movement - 6 +"px";
  document.querySelector(".pointer").style.transform = `translateX(${movement-10}px)`;
  // console.log("Here");

  let a=Math.floor(duration()/60);
  a=Math.floor(a/10)===0?"0"+a:a;
  let b=Math.floor(duration()%60);
  b=Math.floor(b/10)===0?"0"+b:b;
  document.querySelector(".totalDuration").textContent=a+":"+b;

  a=Math.floor(currentTime()/60);
  a=Math.floor(a/10)===0?"0"+a:a;
  b=Math.floor(currentTime()%60);
  b=Math.floor(b/10)===0?"0"+b:b;
  document.querySelector(".currentTime").textContent=a+":"+b;
}