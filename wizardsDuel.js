import {game, Sprite} from "./sgc/sgc.js";

game.setBackground("floor.png");

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Marcus the Wizard";
        this.setImage("marcusSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.y;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 6, 8);
        this.speedWhenWalking = 100;
        
    }
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
    handleGameLoop() { // keep marcus in the display area
        this.y = Math.max(0, this.y);
        this.y = Math.min(552, this.y);
    }
}
let marcus = new PlayerWizard;

