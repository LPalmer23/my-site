const text = "Salutations! Thanks for stopping by Lydia Palmer’s little florilegium.\nScroll carefully! Things are blooming...";
const speed = 70;
let i = 0;
const typeEl = document.getElementById("typewriter");

const basePinks = [
  '#ff69b4', '#ff74b9', '#ff80bf', '#ff8cc5', '#ff99cc',
  '#ffa6d2', '#ffb3d9', '#ffc0df', '#ffccE5', '#ffd9eb', '#ffe4f0', '#fff0f5'
];

const pinkGradient = basePinks.concat([...basePinks].reverse().slice(1));


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

let cursorSpan = null;

function suspenseBlinkThenType() {
  if (!cursorSpan) {
    cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.textContent = '|';
    typeEl.appendChild(cursorSpan);
  }
  setTimeout(typeWriter, 600); // small pause before typing
}


function typeWriter() {
  if (i < spans.length) {
    // Ensure a single persistent cursor exists
    if (!cursorSpan) {
      cursorSpan = document.createElement('span');
      cursorSpan.className = 'cursor';
      cursorSpan.textContent = '|';
      typeEl.appendChild(cursorSpan);
    }

    // Insert the next letter *before* the cursor (no cursor recreation)
    typeEl.insertBefore(spans[i], cursorSpan);

    i++;
    setTimeout(typeWriter, speed);
  } else {
    // Finished typing — keep the same blinking cursor at the end
    typingFinished = true;
    setTimeout(showNavbar, 1000);
  }
}


window.onload = suspenseBlinkThenType;


// =============================
// SVG prep (run once)
// =============================
document.addEventListener("DOMContentLoaded", () => {
  // Main title flower (use the CLASS, not #flower-svg)
  document.querySelectorAll(".title-flower path").forEach(path => {
    const L = path.getTotalLength();
    path.style.strokeDasharray = L;
    path.style.strokeDashoffset = L;
  });

  // Side vines (left & right)
  document.querySelectorAll(".side-flower .st0").forEach(path => {
    const L = path.getTotalLength();
    path.style.strokeDasharray = L;
    path.style.strokeDashoffset = L;
  });

    // Project title SVG
  document.querySelectorAll("#projects-svg path").forEach(path => {
    const L = path.getTotalLength();
    path.style.strokeDasharray = L;
    path.style.strokeDashoffset = L;
  });

    // Car SVG (CollegeCarpool)
    document.querySelectorAll("#car-svg path").forEach(path => {
      const L = path.getTotalLength();
      path.style.strokeDasharray = L;
      path.style.strokeDashoffset = L;
    });

    // Quantum SVG
  document.querySelectorAll("#quantum-svg path").forEach(path => {
    const L = path.getTotalLength();
    path.style.strokeDasharray = L;
    path.style.strokeDashoffset = L;
  });

    // Prep Work Experience SVG (same draw-on-scroll style as the others)
    document.querySelectorAll("#workex-svg path").forEach(path => {
      const L = path.getTotalLength();
      path.style.strokeDasharray = L;
      path.style.strokeDashoffset = L;
    });

    // Prep Volunteering SVG
    document.querySelectorAll("#volunteering-svg .st0").forEach(path => {
      const L = path.getTotalLength();
      path.style.strokeDasharray = L;
      path.style.strokeDashoffset = L;
    });



  


  


  // Reveal-on-scroll setup
  const faders = document.querySelectorAll('.fade-in-left, .fade-in-right');
  const appearOnScroll = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  faders.forEach(f => appearOnScroll.observe(f));
});

// =============================
// Scroll animation
// =============================
// =============================
// Scroll animation
// =============================


// Utility: compute a sensible draw window for an element based on where it sits in the page.
// This keeps new SVGs consistent without hand-tuning start/end numbers.
function autoDrawWindowFor(el, span = 0.08) {
  const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollMax <= 0) return { start: 0, end: 1 };

  const top = el.getBoundingClientRect().top + window.scrollY;

  // Start when the element is approaching the viewport
  let start = (top - window.innerHeight * 0.8) / scrollMax;
  start = Math.max(0, Math.min(1, start));

  let end = start + span;
  end = Math.max(0, Math.min(1, end));

  return { start, end };
}



window.addEventListener("scroll", () => {
  if (!navShown) showNavbar();

  const scrollTop  = window.scrollY;
  const maxScroll  = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const scrollRatio = scrollTop / maxScroll; // 0–1

  // --- Main title flower draw ---
  document.querySelectorAll(".title-flower path").forEach(path => {
    const total = path.getTotalLength();
    const start = parseFloat(path.dataset.drawStart || "0"); // optional
    const end   = parseFloat(path.dataset.drawEnd   || "1");

    let offset = total;
    if (scrollRatio <= start) {
      offset = total;
    } else if (scrollRatio >= end) {
      offset = 0;
    } else {
      const local = (scrollRatio - start) / (end - start);
      offset = total * (1 - local);
    }
    path.style.strokeDashoffset = offset;
  });

  // --- Side vines draw (finish around ~60% scroll) ---
  const p = Math.max(0, Math.min(1, scrollRatio / 0.6));
  document.querySelectorAll(".side-flower .st0").forEach(path => {
    const L = path.getTotalLength();
    path.style.strokeDashoffset = Math.round((1 - p) * L);
  });

    // --- Projects title SVG draw ---
  document.querySelectorAll("#projects-svg path").forEach(path => {
    const total = path.getTotalLength();
    const start = parseFloat(path.dataset.drawStart || "0.06");
    const end   = parseFloat(path.dataset.drawEnd || "0.095");

    let offset = total;
    if (scrollRatio <= start) {
      offset = total;
    } else if (scrollRatio >= end) {
      offset = 0;
    } else {
      const local = (scrollRatio - start) / (end - start);
      offset = total * (1 - local);
    }
    path.style.strokeDashoffset = offset;
  });

    // --- Car SVG draw (CollegeCarpool) ---
    document.querySelectorAll("#car-svg path").forEach(path => {
      const total = path.getTotalLength();
  
      // You can give different timing if you want:
      const start = parseFloat(path.dataset.drawStart || "0.14");
      const end   = parseFloat(path.dataset.drawEnd   || "0.24");
  
      let offset = total;
      if (scrollRatio <= start) {
        offset = total;
      } else if (scrollRatio >= end) {
        offset = 0;
      } else {
        const local = (scrollRatio - start) / (end - start);
        offset = total * (1 - local);
      }
      path.style.strokeDashoffset = offset;
    });

    // --- Quantum SVG draw ---
document.querySelectorAll("#quantum-svg path").forEach(path => {
  const total = path.getTotalLength();

  // slightly later than car so it feels intentional
  const start = parseFloat(path.dataset.drawStart || "0.22");
  const end   = parseFloat(path.dataset.drawEnd   || "0.25");

  let offset;
  if (scrollRatio <= start) {
    offset = total;
  } else if (scrollRatio >= end) {
    offset = 0;
  } else {
    const local = (scrollRatio - start) / (end - start);
    offset = total * (1 - local);
  }

  path.style.strokeDashoffset = offset;
});

  // --- Work Experience SVG draw ---
document.querySelectorAll("#workex-svg path").forEach(path => {
  const total = path.getTotalLength();

  // timing: slightly after quantum so it feels sequential
  const start = parseFloat(path.dataset.drawStart || "0.497");
  const end   = parseFloat(path.dataset.drawEnd   || "0.517");

  let offset;
  if (scrollRatio <= start) {
    offset = total;
  } else if (scrollRatio >= end) {
    offset = 0;
  } else {
    const local = (scrollRatio - start) / (end - start);
    offset = total * (1 - local);
  }

  path.style.strokeDashoffset = offset;
});

// --- Volunteering SVG draw ---
document.querySelectorAll("#volunteering-svg .st0").forEach(path => {
  const total = path.getTotalLength();

  // guessed timing window (same approach as others)
  const start = parseFloat(path.dataset.drawStart || "0.76");
  const end   = parseFloat(path.dataset.drawEnd   || "0.79");

  let offset;
  if (scrollRatio <= start) {
    offset = total;
  } else if (scrollRatio >= end) {
    offset = 0;
  } else {
    const local = (scrollRatio - start) / (end - start);
    offset = total * (1 - local);
  }

  path.style.strokeDashoffset = offset;
});




});
