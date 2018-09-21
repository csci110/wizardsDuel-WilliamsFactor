import { game, Sprite } from "../sgc/sgc.js";
game.setBackground("space.png"); // Photo credit: 

// goal of the game is to get behind Smile and push hime to the other side

class Smile extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("smile", 0, 7);
        this.playAnimation("smile", true);
    }

    handleBoundrayContact() {
        game.removeSprite(this);
    }

    handleCollision(otherSprite) {
        if (this.getImage() !== otherSprite.getImage()) {
            let verticalOffset = Math.abs(this.y - otherSprite.y);
            if (verticalOffset < this.height / 2) {
                game.removeSprite(this);
                new Kill(otherSprite);
            }
        }
        return false;
    }
}

class Kill extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("kill.png");
        game.removeSprite(deadSprite);
        this.defineAnimation("kill", 0, 15);
        this.playAnimation("kill");
    }

    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(frown)) {
            game.end("Smile is Defeated by The Frown" +
                "\nBad End");
        }

        if (!game.isActiveSprite(smile)) {
            game.end("The Frown is Defeated by Smile" +
                "\nGood End");
        }

    }
}

class PlayerFace extends Sprite {
    constructor() {
        super();
        this.name = "Smile";
        this.setImage("smile.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.height;
        this.speedWhenWalking = 600;
        this.smileShootTime = 0;
    }

    handleDownArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }

    handleUpArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = -270;
    }

    handleLeftArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = -180;
    }

    handleRightArrowKey() {
        this.speed = this.speedWhenWalking;
        this.angle = 0;
    }

    handleGameLoop() {
        this.y = Math.max(5, this.y);
        this.y = Math.min(522, this.y);
        this.speed = 0;
    }

    handleSpacebar() {
        let now = game.getTime(); 
        if (now - this.arrowShootTime >= 2) {
            this.arrowShootTime = now;
            let dot = new Smile;
            dot.x = this.x + this.width; 
            dot.y = this.y; 
            dot.name = "A dot shoot by Smile";
            dot.setImage("dot.png");
            dot.angle = 180;

        }
    }
}

let smile = new PlayerFace();

class NonPlayerface extends Sprite {
    constructor() {
        super();
        this.name = "Frown";
        this.setImage("frown.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 200;
    }

    handleGameLoop() {
        if (this.y <= 0) {
            this.y = 0;
            this.angle = 270;
        }

        if (this.y >= game.displayHeight - this.height) {
            this.y = game.displayHeight - this.height;
            this.angle = 90;
        }

        if (Math.random() < 0.01) {
            let dot = new Smile;
            dot.x = this.x - this.width;
            dot.y = this.y;
            dot.name = "A dot cast by Frown";
            dot.setImage("dot.png");
            dot.angle = 180;
        }
    }

    handleAnimationEnd() {
        if (this.angle === 90) {}
        if (this.angle === 270) {}
    }
}

let frown = new NonPlayerface();

