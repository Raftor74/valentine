class Heart {

    constructor(x, y, size = 20, opacity = 200) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = opacity;
        this.color = this.getDefaultHeartColor();
        this.speed = 2;
    }

    getDefaultHeartColor() {
        return {
            R: 220,
            G: 113,
            B: 113,
        };
    }

    setColor(r,g,b) {
        this.color = {
            R: r,
            G: g,
            B: b,
        };

        return this;
    }

    setSpeed(value) {
        this.speed = value;
        return this;
    }

    display() {
        noStroke();
        fill(this.color.R, this.color.G, this.color.B, this.opacity);
        push();
        rotate(45);
        rect(this.x, this.y, this.size, this.size);
        arc(this.x - (this.size / 2), this.y, this.size + 10, this.size, 90, 270, CHORD);
        arc(this.x, this.y - (this.size / 2), this.size, this.size + 10, 180, 360, CHORD);
        pop();
    }

    moveUp() {
        this.y -= this.speed;
        this.x -= this.speed;
    }

    isDead() {
        return (this.y <= -1000);
    }
}

let img;
let hearts = [];
let prevSecond;

const config = {
    backgroundGrayScale: 240,
    heartSize: 50,
    heartSpawnIntervalInSec: 3,
    countHeartsInSingleSpawn: 20,
    text: "С Днём Святого Валентина! ʕ ᵔᴥᵔ ʔ",
    textSize: 30,
    textRGBColor: [255, 102, 178],
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    img = loadImage('https://sun9-38.userapi.com/c857228/v857228396/b0c8c/Ajhs1lD_tuE.jpg');
}

function draw() {
    background(config.backgroundGrayScale);
    translate(width / 2, height / 2);
    if (spawnCondition(config.heartSpawnIntervalInSec)) {
        spawnHearts(config.countHeartsInSingleSpawn, config.heartSize);
    }
    displayHearts();
    drawCenterText(config.text, config.textSize, config.textRGBColor);
    drawCenterImage();
}

function spawnCondition(spawnInterval) {
    let currentSecond = second();
    let condition = (currentSecond !== prevSecond && currentSecond % spawnInterval === 0);
    prevSecond = currentSecond;
    return condition;
}

function spawnHearts(countHeartsInSingleSpawn, heartSize) {
    for (let i = 0; i < countHeartsInSingleSpawn; i++) {
        let delta = heartSize * 20;
        let posXSpawn = random(width / 2 - delta, width / 2 + delta);
        let posYSpawn = random(height, height + delta);
        let heart = new Heart(posXSpawn, posYSpawn, heartSize);
        hearts.push(heart);
    }
}

function displayHearts() {
    for (i = hearts.length - 1; i >= 0; i--) {
        hearts[i].display();
        hearts[i].moveUp();

        if (hearts[i].isDead()) {
            hearts.splice(i, 1);
        }
    }
}

function drawCenterText(txt, size, rgbColor) {
    fill(...rgbColor);
    textSize(size);
    text(txt, 0, -height / 3);
}

function drawCenterImage() {
    let scale = 3;
    let imgWidth = img.width / scale;
    let imgHeight = img.height / scale;
    let x = -img.width / (scale * 2);
    let y = -img.height / scale;
    image(img, x, y, imgWidth, imgHeight);
}