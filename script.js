const dice = document.getElementById('dice');
const rollBtn = document.getElementById('rollBtn');
const taskText = document.getElementById('taskText');

const tasks = {
    1: "Do 10 Pushups! 💪",
    2: "Drink a glass of water! 💧",
    3: "Read 2 pages of a book! 📖",
    4: "Take a 5-minute stretch break! 🧘",
    5: "Clean your workspace! 🧹",
    6: "Write down one goal for today! 🎯"
};

let currentRotation = { x: 0, y: 0 };

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

rollBtn.addEventListener('click', () => {
    // Disable button during roll
    rollBtn.disabled = true;
    taskText.style.opacity = '0';
    taskText.textContent = "Rolling...";
    taskText.style.opacity = '1';

    // Random number 1-6
    const result = getRandomInt(1, 6);

    // Calculate rotation to show the correct face
    // 1: front (0,0)
    // 2: bottom (90,0) -> rotateX(90deg) shows bottom? No, wait.
    // CSS Faces:
    // Front: translateZ
    // Back: rotateY(180)
    // Right: rotateY(90)
    // Left: rotateY(-90)
    // Top: rotateX(90)
    // Bottom: rotateX(-90)

    // To SHOW a face, we need to rotate the DICE container so that face is in front.
    // opposite rotations:
    // 1 (Front): rotateX(0) rotateY(0)
    // 6 (Back): rotateX(0) rotateY(180)
    // 3 (Right): rotateY(-90)
    // 4 (Left): rotateY(90)
    // 5 (Top): rotateX(-90)
    // 2 (Bottom): rotateX(90)

    let rotX = 0;
    let rotY = 0;

    // Add extra spins for effect (multiples of 360)
    const extraSpins = 360 * 5; 

    switch(result) {
        case 1: rotX = 0; rotY = 0; break;
        case 6: rotX = 0; rotY = 180; break;
        case 3: rotX = 0; rotY = -90; break; 
        case 4: rotX = 0; rotY = 90; break;
        case 5: rotX = -90; rotY = 0; break;
        case 2: rotX = 90; rotY = 0; break;
    }

    // Apply random slight offset to make it look less robotic? No, exact alignment is better for readability.
    // But we want to preserve previous rotation to avoid snapping back?
    // Actually, transition handles "from current to new".
    
    // We can add random full rotations to x and y to make it tumble
    const tumbleX = getRandomInt(2, 5) * 360;
    const tumbleY = getRandomInt(2, 5) * 360;
    
    // Final targets
    const finalX = rotX + tumbleX;
    const finalY = rotY + tumbleY;

    dice.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;

    // Wait for animation to finish (1s as per CSS)
    setTimeout(() => {
        taskText.style.opacity = '0';
        setTimeout(() => {
             taskText.textContent = tasks[result];
             taskText.style.opacity = '1';
             rollBtn.disabled = false;
        }, 200); // short delay for fade out
       
    }, 1000);
});
