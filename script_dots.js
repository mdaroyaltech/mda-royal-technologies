/* ===== ANTIGRAVITY PARTICLE BACKGROUND (EXTRA DENSE) ===== */

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* 🔥 MORE DOTS HERE */
const particleCount = window.innerWidth < 768 ? 120 : 260;

const particles = [];
const mouse = { x: null, y: null };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor(){
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.r = Math.random() * 2.2 + 1;
    this.dx = (Math.random() - 0.5) * 1.0;
    this.dy = (Math.random() - 0.5) * 1.0;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(90,130,180,0.75)";
    ctx.fill();
  }

  update(){
    this.x += this.dx;
    this.y += this.dy;

    if (this.x <= 0 || this.x >= w) this.dx *= -1;
    if (this.y <= 0 || this.y >= h) this.dy *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 180) {
        this.x -= dx / 18;
        this.y -= dy / 18;
      }
    }
  }
}

/* Create particles */
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

/* Connect particles with subtle lines */
function connectParticles(){
  for(let i = 0; i < particles.length; i++){
    for(let j = i + 1; j < particles.length; j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < 140){
        ctx.beginPath();
        ctx.strokeStyle = "rgba(120,150,180,0.18)";
        ctx.lineWidth = 0.7;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

/* Animation loop */
function animate(){
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}
animate();

/* MAGNETIC BUTTON EFFECT */
document.querySelectorAll(".magnetic-btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});
