// get the canvas element from the DOM
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// set the canvas size based on the device window size
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

    // draw the particle on the canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);  // draws circle
        ctx.fillStyle = '#c8c8c8';
        ctx.fill();
    }

    // reverse the particle's moving direction when it collides with then edge of the canvas
    // directionX and directionY denote the particle's current direction
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // update the particles new position
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

// initialize and draw each of the particles on the canvas
function init() {
    particlesArray = [];

    let numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
        let size = Math.random() * 4 + 2;   // Draw randomly sized particles between size 2 and 6
        // Draw particles in random places. Uses canvas dimensions instead of window dimensions for consistency
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;

        // randomly set the particle's speed and direction
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;
        let color = '#c8c8c8';

        // create the new particle and push it to the array
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// connects the line between particles
function connect() {
    let opacity = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            // calculate straight line distance between particles
            let distance = (( particlesArray[a].x - particlesArray[b].x ) ** 2) + (( particlesArray[a].y - particlesArray[b].y ) ** 2);
            
            // connect particles with a line if the distance is less than the calculated amount (trial and error)
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacity = 1 - (distance / 20000);   // dynamic line opacity based on distance (trial and error)
                ctx.strokeStyle = 'rgba(200, 200, 200, ' + opacity + ')';
                ctx.lineWidth = 1;

                // draw the line
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    // create the animation loop
    animationFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update each particle's direction and position
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();  // connect the lines between particles
}

// listen for a window size change event to reinitialize the animation for that size window
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
