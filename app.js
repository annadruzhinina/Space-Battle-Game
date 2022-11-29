// hull=0 -> destroyed

class Ship {
  constructor(hull, firepower, accuracy, name) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.name = name;
  }

  attack(otherShip) {
    console.log(`${this.name} attaked ${otherShip.name}`);
    if (this.accuracy >= Math.random()) {
      otherShip.hull = otherShip.hull - this.firepower;
      console.log(
        `Attack is successful, remaining hull: ${otherShip.hull} for ${otherShip.name}`
      );
    } else {
      console.log("Attack is not successful");
    }
  }
}

class Game {
  constructor() {
    this.USSAssembly = new Ship(20, 5, 0.7, "USSAssembly");
    this.aliens = [];
    for (let i = 0; i < 16; i++) {
      this.aliens.push(
        new Ship(
          Math.floor(Math.random() * 4) + 3,
          Math.floor(Math.random() * 3) + 2,
          (Math.floor(Math.random() * 3) + 6) / 10,
          `Alien${i}`
        )
      );
    }
  }
  play() {
    console.log("Play started");
    console.log(this.USSAssembly);
    console.log(this.aliens);
    // this.USSAssembly.attack(this.aliens[0]);
    // this.aliens[0].attack(this.USSAssembly);

    let currentAlien = this.aliens[0];
    //while we have aliens
    while (this.aliens.length > 0) {
      this.USSAssembly.attack(currentAlien);
      if (currentAlien.hull > 0) {
        currentAlien.attack(this.USSAssembly);
        if (this.USSAssembly.hull < 0) {
          console.log("GAME OVER USSAssembly killed");
          return;
        }
      } else {
        console.log(`${currentAlien.name} killed`);
        this.aliens.splice(0, 1);
        currentAlien = this.aliens[0];

        // retreat?
        if (Math.random() > 0.5 && this.USSAssembly.hull < 5) {
          console.log("You retreat");
          return;
        }
      }
    }
    console.log("USSAssembly won this game!!!");
  }
}

const game = new Game();
game.play();
