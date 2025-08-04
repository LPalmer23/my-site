const text = "Welcome to my personal site.";
const speed = 70;
let i = 0;
const typeEl = document.getElementById("typewriter");

const basePinks = [
  '#ff69b4', '#ff74b9', '#ff80bf', '#ff8cc5', '#ff99cc',
  '#ffa6d2', '#ffb3d9', '#ffc0df', '#ffccE5', '#ffd9eb', '#ffe4f0', '#fff0f5'
];

const pinkGradient = basePinks.concat([...basePinks].reverse().slice(1));



// Create one <span> per letter with a color from the gradient
const spans = text.split('').map((char, index) => {
  const span = document.createElement('span');
  span.textContent = char;
  span.style.color = pinkGradient[index % pinkGradient.length];
  return span;
});



let typingFinished = false;
let navShown = false;



function showNavbar() {
  if (!navShown) {
    document.getElementById("navbar").classList.add("visible");
    navShown = true;
  }
}

function typeWriter() {
  if (i < spans.length ) {
    typeEl.appendChild(spans[i]);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    typingFinished = true;

    setTimeout(() => {
      showNavbar();
    }, 1000);
   
  }
}



window.onload = typeWriter;

window.addEventListener("scroll", () => {
  
  if ( !navShown) {
    showNavbar();
  }

  const flowerPaths = document.querySelectorAll("#flower-svg path");

  const scrollPosition = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollRatio = scrollPosition / maxScroll;
  
  flowerPaths.forEach(path => {
    const totalLength = path.getTotalLength();
    const drawLength = totalLength * scrollRatio;
    path.style.strokeDashoffset = totalLength - drawLength;
  });
  


});


window.addEventListener("DOMContentLoaded", () => {
  const flowerPaths = document.querySelectorAll("#flower-svg path");


  flowerPaths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });
});


