const replay_btn=$(".replay-btn")
const play_pause_btn=$(".play-pause")
const next_btn=$(".next")
const prev_btn=$(".prev")
const volume_btn=$(".volume-btn")
const progress=$(".progress")
const progress_bar=$(".progress-bar")
const pointer=$(".pointer")

const shuffle_play_btn=$(".shuffle-play>#play")

let songs=[ "./songs/Bye Pewdiepie Carryminati.mp3",
            "./songs/JUNGLE HAI AADHI RAAT X GRIND.mp3",
            "./songs/Mumbai Indians Anthem.mp3",
            "./songs/Aankhon Mein Teri Lofi Remix.mp3",
            "./songs/ANIMAL SATRANGA.mp3",
            "./songs/TU HAI KAHAN.mp3",
            "./songs/Mockingbird.mp3",
            "./songs/PEHLE BHI MAIN.mp3",
            "./songs/Suzonn - Farq hai.mp3",
            "./songs/Tere Bin.mp3",
            "./songs/The Breakup Song.mp3",
            "./songs/Until I Found You.mp3",
            "./songs/Ye Mausam Ki Baarish.mp3"]
songs.sort(() => Math.random() - 0.5)


function getSongName(path){
  let a=path.lastIndexOf("/")
  let b=path.lastIndexOf(".")
  return path.slice(a+1,b)
}
songs.forEach(function(song){
    let option = $('<option>', { value: getSongName(song) })
    $('#searchList').append(option)
});
$("input").on('keyup', function(event) {
  if (event.key === 'Enter'){
    let songNum=songs.map((x)=>getSongName(x)).indexOf(this.value)
    if (songNum!==-1) songPlaybackControl(null,songNum)
    this.value=""
  }
});
$('#search-nav-btn').on('click', ()=>{
  $('input').focus()
});

//Global variables
let songNumber=0
let audio=new Audio(songs[songNumber])

//Global functions
function volume(state){
  if(typeof state==='boolean')  audio.muted=state
  else audio.muted=!audio.muted

  let path=["./playback/mute.svg","./playback/volume.svg"]
  volume_btn.attr("src",path[Number(!audio.muted)])
}

function play_pause(state){
  if(typeof state==='boolean'){
    if(state) audio.play()
    else  audio.pause()
  }
  else{
    if(audio.paused){
      audio.play()
    }
    else  audio.pause()
  }
  let path=["./playback/pause.svg","./playback/play.svg"]
  play_pause_btn.attr("src",path[Number(audio.paused)])
}

function songPlaybackControl(element,songNum){
  if(typeof songNum==='number') songNumber=songNum
  else{
    songNumber=songNumber+Number(element.attr("data-songIncrement"))
    songNumber%=songs.length;
    songNumber=(songNumber===-1)?songs.length-1:songNumber
    }

  audio.pause()
  clearInterval(id)
  audio.src=songs[songNumber]
  play_pause(true)
}

//Adding EventListeners
volume_btn.click(volume)
play_pause_btn.click(play_pause)
replay_btn.click(()=>songPlaybackControl(replay_btn))
prev_btn.click(()=>songPlaybackControl(prev_btn))
next_btn.click(()=>songPlaybackControl(next_btn))

shuffle_play_btn.click(()=>{
  play_pause()
})
progress_bar.click(function(event){
  let xPosition = event.pageX - progress_bar.offset().left;
  audio.currentTime=(audio.duration/progress_bar.width())*xPosition;
})

//Continous status updating
let id;
$(audio).on('canplay', function(){
  updateStatus()
});
$(audio).on('pause', function(){
  clearInterval(id)
});
$(audio).on('play', function(){
  id=setInterval(updateStatus,500)
});
$(audio).on('ended', function(){
  clearInterval(id)
  songPlaybackControl(next_btn)
});

function updateStatus(){
  let timeElapsed=((progress_bar.width())/audio.duration)*audio.currentTime;
  progress.width(timeElapsed)
  pointer.css('transform', `translate(${timeElapsed-4.5}px, 0)`)

  let currentTime=formatTime(parseInt(parseInt(audio.currentTime)/60),parseInt(parseInt(audio.currentTime))%60)
  let totalDuration=formatTime(parseInt(parseInt(audio.duration)/60),parseInt(parseInt(audio.duration))%60)
  $(".currentTime").text(currentTime)
  $(".totalDuration").text(totalDuration)

  $(".now-playing h2").text(getSongName(songs[songNumber]))
}

function formatTime(min,sec){
  let formatNumber=(x)=> (parseInt(x/10))===0?"0"+x:""+x

  return formatNumber(min)+":"+formatNumber(sec)
}

// Responsive
$(".hamburger").on("click", () => $(".menu-bar").animate({ width:"100vw",opacity:1}))
// $("#search-nav-btn").on("click", () => $(".menu-bar").animate({ width:"0",opacity:0}))
$(".cross").on("click", () => $(".menu-bar").animate({ width:"0",opacity:0}))