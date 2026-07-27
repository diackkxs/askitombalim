const scenes = [...document.querySelectorAll(".scene")];
function showScene(id){
  scenes.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({top:0, behavior:"instant"});
}
const bgMusic = document.getElementById("bgMusic");
const duckSound = document.getElementById("duckSound");

function startBackgroundMusic(){
  bgMusic.volume = 0.35;
  bgMusic.play().catch(()=>{});
}

function playDuckSound(){
  duckSound.currentTime = 0;
  duckSound.volume = 0.85;
  duckSound.play().catch(()=>{});
}

document.querySelectorAll("[data-go]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(btn.classList.contains("yes")) startBackgroundMusic();
    if(btn.classList.contains("no")) playDuckSound();
    showScene(btn.dataset.go);
  });
});

/* PIN */
const correctPin = "0906";
let pin = "";
const dots = [...document.querySelectorAll(".pin-dots i")];
const message = document.getElementById("pinMessage");
const phone = document.getElementById("phone");

function updateDots(){ dots.forEach((dot,i)=>dot.classList.toggle("on",i<pin.length)); }
function clearPin(){ pin=""; updateDots(); }
function checkPin(){
  if(pin === correctPin){
    message.textContent = "Doğru şifre ♡";
    miniBurst();
    setTimeout(()=>showScene("memories"),650);
  }else{
    message.textContent = "Bu şifre olmadı sevgilim.";
    phone.classList.add("shake");
    setTimeout(()=>{
      phone.classList.remove("shake");
      clearPin();
      message.textContent = "";
    },650);
  }
}
document.querySelectorAll("[data-key]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(pin.length < 4){
      pin += btn.dataset.key;
      updateDots();
      if(pin.length === 4) setTimeout(checkPin,180);
    }
  });
});
document.getElementById("deletePin").addEventListener("click",()=>{
  pin = pin.slice(0,-1);
  updateDots();
  message.textContent="";
});
document.getElementById("submitPin").addEventListener("click",checkPin);

/* Envelope */
document.getElementById("envelope").addEventListener("click",function(){
  this.classList.add("open");
  setTimeout(()=>showScene("openLetter"),1050);
});

/* Jar heart eruption */
document.getElementById("jarButton").addEventListener("click",()=>{
  const layer = document.getElementById("burst");
  for(let i=0;i<120;i++){
    const heart = document.createElement("i");
    heart.className = "burst-heart";
    heart.style.setProperty("--x", `${(Math.random()-.5)*1300}px`);
    heart.style.setProperty("--y", `${-120-Math.random()*900}px`);
    heart.style.setProperty("--s", `${.35+Math.random()*1.8}`);
    heart.style.animationDelay = `${Math.random()*.35}s`;
    layer.appendChild(heart);
    setTimeout(()=>heart.remove(),2300);
  }
  setTimeout(()=>showScene("final"),1650);
});
function miniBurst(){
  const layer = document.getElementById("burst");
  for(let i=0;i<24;i++){
    const heart = document.createElement("i");
    heart.className = "burst-heart";
    heart.style.setProperty("--x", `${(Math.random()-.5)*520}px`);
    heart.style.setProperty("--y", `${(Math.random()-.65)*500}px`);
    heart.style.setProperty("--s", `${.25+Math.random()*.9}`);
    layer.appendChild(heart);
    setTimeout(()=>heart.remove(),1900);
  }
}
document.getElementById("restart").addEventListener("click",()=>{
  pin="";
  updateDots();
  message.textContent="";
  document.getElementById("envelope").classList.remove("open");
  showScene("welcome");
});
