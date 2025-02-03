const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;
let pos = 0;

const backgroundImage = createImage('background.png');
const platformImage = createImage('platform.png');
const treeImage = createImage('tree.png');
const idleRight = 'idleRight.png';
const idleLeft = 'idleLeft.png';
const runRight = 'runRight.png';
const runLeft = 'runLeft.png';

class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.speed = 5;
        this.velocity = { x: 0, y: 1 };
        this.width = 200;
        this.height = 200;
        this.frames = 0;
        this.frameSpeed = 2;
        this.frameTimer = 0;

        this.sprites = {
            idle: {
                right : createImage(idleRight),
                left: createImage(idleLeft)
            },
            run: {
                right: createImage(runRight),
                left: createImage(runLeft)
            }
        }
        this.currentSprite = this.sprites.idle.right;
    }
    draw() {
       ctx.drawImage(this.currentSprite, 120  * this.frames, 0, 120, 80, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.frameTimer++;

        if (this.frameTimer >= this.frameSpeed) {
            this.frames++;
            this.frameTimer = 0;
        }


        if (this.frames >= 10) {
            this.frames = 0;
        }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}

class Platform {
    constructor({ x, y }) {
        this.position = { x, y };
        this.width = 300; // Hardcoded width
        this.height = 60; // Hardcoded height
    }

    draw() {
        ctx.drawImage(platformImage, this.position.x, this.position.y, this.width, this.height);
    }
}

class Tree {
    constructor({ x, y }) {
        this.position = { x, y };
        this.width = 300; // Hardcoded width
        this.height = 300; // Hardcoded height
    }

    draw() {
        ctx.drawImage(treeImage, this.position.x, this.position.y, this.width, this.height);
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    trees.forEach(tree => {
        tree.draw();
    });

    platforms.forEach(platform => {
        platform.draw();
    });

    player.update();

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = - player.speed;
    } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
            pos += 5;
            platforms.forEach(platform => {
                platform.position.x -= player.speed * .50;
            });
            trees.forEach(tree => {
                tree.position.x -= player.speed * .35
            });
        } else if (keys.left.pressed) {
            pos -= 5;
            platforms.forEach(platform => {
                platform.position.x += player.speed * .50;
            });
            trees.forEach(tree => {
                tree.position.x += player.speed * .35
            });
        }
    }

    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width - 90 >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width - 90) {
            player.velocity.y = 0;
        }
    });

}

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    switch (key) {
        case 'a':
            keys.left.pressed = true;
            player.currentSprite = player.sprites.run.left;
            break;
        case 'd':
            keys.right.pressed = true;
            player.currentSprite = player.sprites.run.right;
            break;
        case 'w':
            player.velocity.y = -10; // Jump
            break;
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    switch (key) {
        case 'a':
            keys.left.pressed = false;
            if (!keys.right.pressed) {
                player.currentSprite = player.sprites.idle.left;
            }
            break;
        case 'd':
            keys.right.pressed = false;
            if (!keys.left.pressed) {
                player.currentSprite = player.sprites.idle.right;
            }
            break;
    }
});


const keys = {
    right: { pressed: false },
    left: { pressed: false }
};

function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image;
}

const platforms = []
    // Floor platform that spans across the screen
for (let x = 0; x <= 5800; x += 294) {
    platforms.push(new Platform({ x: x, y: 515 }));
}

platforms.push(
    // Platforms at the top that you can jump on
    new Platform({ x: 100, y: 400 }),
    new Platform({ x: 800, y: 300 }),
    new Platform({ x: 1000, y: 200 }),
    new Platform({ x: 800, y: 100 })
);


const trees = [
    new Tree({ x: 0, y: 300 }),
    new Tree({ x: 300, y: 300 }),
    new Tree({ x: 600, y: 300 }),
    new Tree({ x: 900, y: 300 }),
    new Tree({ x: 1200, y: 300 }),
    new Tree({ x: 1500, y: 300 }),
    new Tree({ x: 1800, y: 300 }),
    new Tree({ x: 2100, y: 300 }),
    new Tree({ x: 2400, y: 300 }),
    new Tree({ x: 2700, y: 300 }),
    new Tree({ x: 3000, y: 300 }),
    new Tree({ x: 3300, y: 300 }),
    new Tree({ x: 3600, y: 300 }),
    new Tree({ x: 3900, y: 300 }),
    new Tree({ x: 4200, y: 300 }),
    new Tree({ x: 4500, y: 300 }),
    new Tree({ x: 4800, y: 300 }),
    new Tree({ x: 5100, y: 300 }),
    new Tree({ x: 5400, y: 300 }),
    new Tree({ x: 5700, y: 300 }),
    new Tree({ x: 6000, y: 300 }),
    new Tree({ x: 6300, y: 300 }),
    new Tree({ x: 6600, y: 300 }),
    new Tree({ x: 6900, y: 300 }),
    new Tree({ x: 7200, y: 300 }),
    new Tree({ x: 7500, y: 300 }),
    new Tree({ x: 7800, y: 300 }),
    new Tree({ x: 8100, y: 300 }),
    new Tree({ x: 8400, y: 300 }),
    new Tree({ x: 8700, y: 300 }),
    new Tree({ x: 9000, y: 300 }),
];

const player = new Player();

animate();
