import gsap from 'gsap';

// ==========================================
// 1. Custom Cursor
// ==========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  // Dot follows instantly
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Outline follows with slight delay using GSAP
  gsap.to(cursorOutline, {
    x: posX - 20, // offset half the width
    y: posY - 20,
    duration: 0.15,
    ease: "power2.out"
  });
});

// Magnetic Buttons Hover Effect
const magneticElements = document.querySelectorAll('.magnetic-btn, .project-card, .view-link');
magneticElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorOutline, { scale: 1.5, opacity: 0.5, duration: 0.2 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorOutline, { scale: 1, opacity: 1, duration: 0.2 });
  });
});


// ==========================================
// 2. Theme Toggle
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const iconDark = document.querySelector('.icon-dark');
const iconLight = document.querySelector('.icon-light');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme');
  
  if (body.classList.contains('light-theme')) {
    iconDark.classList.add('hidden');
    iconLight.classList.remove('hidden');
    // Animate canvas color transition slightly
    targetLineColor = 'rgba(0, 0, 0, 0.1)';
  } else {
    iconLight.classList.add('hidden');
    iconDark.classList.remove('hidden');
    targetLineColor = 'rgba(255, 255, 255, 0.1)';
  }
});


// ==========================================
// 3. GSAP Intro Animations
// ==========================================
// Animate Hero text
gsap.fromTo('.stagger-text', 
  { y: 100, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
);

gsap.fromTo('.fade-up-text',
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.8 }
);

// Parallax/Reveal for project cards (basic scroll emulation in GSAP)
// In a full build, we'd use ScrollTrigger, but let's do a simple intersection observer for lightweight code
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to(entry.target, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach((card, index) => {
  // Set initial state
  gsap.set(card, { y: 100, opacity: 0 });
  observer.observe(card);
});


// ==========================================
// 4. Interactive Wavy Canvas Background
// ==========================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let lines = [];
let targetLineColor = 'rgba(255, 255, 255, 0.05)';
let mouse = { x: 0, y: 0 };
let currentLineColor = targetLineColor;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initLines();
}

window.addEventListener('resize', resize);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function initLines() {
  lines = [];
  const numLines = height / 40; // spacing
  for (let i = 0; i < numLines; i++) {
    lines.push({
      y: i * 40,
      baseY: i * 40,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Smooth color transition
  ctx.strokeStyle = targetLineColor;
  ctx.lineWidth = 1;
  ctx.beginPath();

  const time = Date.now() * 0.001;

  lines.forEach(line => {
    ctx.moveTo(0, line.y);
    
    // Create wave built from points
    for (let x = 0; x <= width; x += 30) {
      // Base wave
      const dx = x * 0.005;
      const wave = Math.sin(dx + time + line.phase) * 20;
      let targetY = line.baseY + wave;
      
      // Mouse interaction (repel)
      const dist = Math.hypot(x - mouse.x, targetY - mouse.y);
      if (dist < 200) {
        const force = (200 - dist) / 200;
        targetY += force * 50; 
      }

      ctx.lineTo(x, targetY);
    }
  });
  
  ctx.stroke();
  requestAnimationFrame(animate);
}

resize();
animate();
