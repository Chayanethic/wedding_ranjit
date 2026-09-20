
// Countdown to 27 Feb 2027, 11:00 AM IST
function updateCountdown(){const t=new Date('2027-02-27T11:00:00+05:30').getTime(),d=Math.max(0,t-Date.now());const vals=[Math.floor(d/86400000),Math.floor(d%86400000/3600000),Math.floor(d%3600000/60000),Math.floor(d%60000/1000)];['days','hours','mins','secs'].forEach((id,i)=>{const e=document.getElementById(id);if(e)e.textContent=String(vals[i]).padStart(2,'0')})}updateCountdown();setInterval(updateCountdown,1000);
// Love calculator
const calc=document.getElementById('calcLove');if(calc)calc.onclick=()=>{const n=document.getElementById('loveName').value.trim();if(!n){toast('Please enter a name. Even the algorithm needs something to judge.');return}let h=0;for(const c of (n.toLowerCase()+'ranjit'))h=((h<<5)-h)+c.charCodeAt(0)|0;const score=35+Math.abs(h)%66;document.getElementById('score').textContent=score+'%';document.getElementById('ring').style.background=`conic-gradient(#e0b45d ${score*3.6}deg,#eadfd4 0)`;const v=['Excellent. Ranjit has been informed. He is hiding.','Promising. The family WhatsApp group will investigate.','Chemistry detected. Report to the buffet for further testing.','Statistically suspicious. Someone call Srijita.','Compatibility acceptable. Wedding invitation privileges granted.','Very strong vibes. This calculator has absolutely no legal authority.'];document.getElementById('verdict').textContent=v[Math.abs(h)%v.length];confetti()};
// Inauguration
const openStage=document.getElementById('openStage');if(openStage)openStage.onclick=()=>{document.getElementById('stage').classList.add('open');document.getElementById('cuttext').textContent='✂️ RIBBON CUT! Badam & Moyna officially declare this wedding website OPEN.';toast('🎉 Badam & Moyna have inaugurated the website.');confetti()};
// SECTION-WISE WEDDING MUSIC — browser-safe single player
// The single HTML <audio> element is used for every song. We keep the media
// element alive and, after the user's ENTER gesture, reuse it for all section changes.
const tracks = [
  {file:'assets/01-sanai-intro.mp3', label:'Track 01 • Sanai — শুভ বিবাহ Intro'},
  {file:'assets/02-bengali-wedding.mp3', label:'Track 02 • Bengali Wedding'},
  {file:'assets/03-facts.mp3', label:'Track 03 • Wedding Facts'},
  {file:'assets/03-reception.mp3', label:'Track 04 • Reception'},
  {file:'assets/04-fun.mp3', label:'Track 05 • Fun'},
  {file:'assets/05-events.mp3', label:'Track 06 • Events'}
];
const audio=document.getElementById('weddingAudio');
audio.preload='auto'; audio.playsInline=true; audio.volume=.9;
let currentTrack=-1, musicEnabled=true, introRunning=false, introTimer=null;
let activeSection='__intro__', userHasScrolled=false, scrollRAF=0, switchSeq=0;
const INTRO_SECONDS=7;
const enter=document.getElementById('enter'), enterBtn=document.getElementById('enterBtn');
const progress=document.getElementById('introProgress'), introStatus=document.getElementById('introStatus');
const introCopy=document.getElementById('introCopy'), musicStage=document.getElementById('musicStage');
const musicButton=document.getElementById('musicBtn');
function setStageLabel(i){if(musicStage&&tracks[i])musicStage.textContent=tracks[i].label;}
function stopCurrent(){
  try{audio.pause();audio.currentTime=0;}catch(e){}
}
function playTrack(i){
  if(!musicEnabled || !tracks[i] || introRunning)return;
  const seq=++switchSeq;
  currentTrack=i;
  setStageLabel(i);
  // IMPORTANT: do not wait for canplay and do not create a second audio element.
  // The element has already been granted playback permission by ENTER.
  stopCurrent();
  audio.loop=true;
  audio.src=tracks[i].file;
  audio.load();
  audio.currentTime=0;
  const start=()=>{
    if(seq!==switchSeq || !musicEnabled || introRunning || currentTrack!==i)return;
    audio.currentTime=0;
    audio.play().catch(err=>console.warn('section audio play failed',err));
  };
  if(audio.readyState>=2) start();
  else audio.oncanplay=()=>{ audio.oncanplay=null; start(); };
}
function revealWebsite(){
  if(introTimer)clearTimeout(introTimer);
  introRunning=false;
  // Keep the exact same audio element active. This avoids losing the browser's
  // user-gesture media permission between the intro and the first section.
  if(progress)progress.style.width='100%';
  if(enter)enter.classList.add('hide');
  document.body.classList.remove('intro-lock');
  window.scrollTo(0,0);
  activeSection='story';
  userHasScrolled=false;
  // Switch the SAME element directly while it is already in an allowed playback session.
  playTrack(1);
}
function beginIntro(){
  if(introRunning)return;
  introRunning=true;
  switchSeq++;
  if(enterBtn){enterBtn.disabled=true;enterBtn.textContent='Sanai playing… ✦';}
  if(introStatus)introStatus.textContent='Playing Sanai • শুভ বিবাহ';
  if(introCopy)introCopy.textContent='A little Bengali wedding welcome… then the real chaos begins.';
  if(progress){progress.style.transition='none';progress.style.width='0%';requestAnimationFrame(()=>{progress.style.transition=`width ${INTRO_SECONDS}s linear`;progress.style.width='100%';});}
  currentTrack=0; setStageLabel(0);
  stopCurrent();
  audio.loop=false;
  audio.src=tracks[0].file;
  audio.load();
  const startedAt=performance.now();
  const finish=()=>{
    if(!introRunning)return;
    const remaining=Math.max(0,INTRO_SECONDS*1000-(performance.now()-startedAt));
    clearTimeout(introTimer);
    introTimer=setTimeout(revealWebsite,remaining);
  };
  const startSanai=()=>{
    audio.currentTime=0;
    audio.play().then(finish).catch(err=>{
      console.warn('Sanai play failed',err);
      if(enterBtn){enterBtn.disabled=false;enterBtn.textContent='ENTER THE WEDDING ✦';}
      introRunning=false;
      if(introStatus)introStatus.textContent='Tap ENTER again to allow the Sanai music.';
    });
  };
  if(audio.readyState>=2)startSanai();
  else audio.oncanplay=()=>{audio.oncanplay=null;startSanai();};
}
if(enterBtn)enterBtn.onclick=beginIntro;
audio.addEventListener('error',()=>{
  console.warn('Wedding audio error',audio.error);
  if(introRunning){
    introRunning=false;
    if(enterBtn){enterBtn.disabled=false;enterBtn.textContent='ENTER THE WEDDING ✦';}
    if(introStatus)introStatus.textContent='Sanai file could not be loaded.';
  }
});

// Exactly the six songs you have. Songs can be reused by different sections.
const sectionTrackIds=[
  ['story',1],
  ['facts',2],
  ['events',3],
  ['countdown',5],
  ['fun',4],
  ['inaug',4],
  ['love',1],
  ['rsvp',3]
];
function getSectionElements(){
  return sectionTrackIds.map(([id,idx])=>{
    const el=document.getElementById(id)||document.querySelector('.'+id);
    return el?{id,idx,el}:null;
  }).filter(Boolean);
}
function getSectionAtLine(){
  const line=innerHeight*.38;
  const sections=getSectionElements();
  if(!sections.length)return null;
  let chosen=null, best=-Infinity;
  for(const item of sections){
    const r=item.el.getBoundingClientRect();
    if(r.top<=line && r.top>best){chosen=item;best=r.top;}
  }
  return chosen || sections[0];
}
function updateSectionMusic(){
  if(scrollRAF)cancelAnimationFrame(scrollRAF);
  scrollRAF=requestAnimationFrame(()=>{
    scrollRAF=0;
    if(!musicEnabled || introRunning || (enter && !enter.classList.contains('hide')))return;
    if(!userHasScrolled)return;
    const section=getSectionAtLine();
    if(section && section.id!==activeSection){
      activeSection=section.id;
      playTrack(section.idx);
    }
  });
}
window.addEventListener('scroll',()=>{
  if(enter&&!enter.classList.contains('hide'))return;
  if(Math.abs(scrollY)>12)userHasScrolled=true;
  updateSectionMusic();
},{passive:true});
window.addEventListener('resize',updateSectionMusic,{passive:true});
if(musicButton)musicButton.onclick=()=>{
  musicEnabled=!musicEnabled;
  musicButton.textContent=musicEnabled?'♫ Music ON':'♫ Music OFF';
  if(!musicEnabled){switchSeq++;stopCurrent();}
  else if(!introRunning){
    const section=getSectionAtLine();
    if(section){activeSection=section.id;playTrack(section.idx);}
  }
};
