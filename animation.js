const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
let animationFrameId;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#c8c8c8';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particlesArray = [];
    
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Adjust divisor based on device type to control particle count
    // Higher divisor = fewer particles
    const divisor = isMobile ? 15000 : 9000;
    
    // Calculate number of particles based on canvas size and device type
    let numParticles = Math.min((canvas.height * canvas.width) / divisor, 100);
    
    for (let i = 0; i < numParticles; i++) {
        let size = Math.random() * 4 + 2;
        // Use canvas dimensions instead of window dimensions for consistency
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = Math.random() * 2 - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = '#c8c8c8';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = (( particlesArray[a].x - particlesArray[b].x ) ** 2) + (( particlesArray[a].y - particlesArray[b].y ) ** 2);

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacity = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(200, 200, 200, ' + opacity + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener("resize", () => {
    // Cancel the previous animation frame to prevent multiple animations
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinitialize particles
    init();
    
    // Restart animation
    animate();
});

init();
animate();