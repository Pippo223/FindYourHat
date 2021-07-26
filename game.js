const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._field = field
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;
  }
  get field() {
    return this._field
  }
  print() {
    return this.field.map(row => row.join('')).join('\n');
  }
getInput() {
   const input = prompt('Which way?')
    switch (input) {
      case 'U': this.locationY -= 1
        break
      case 'D':
        this.locationY += 1
        break
      case 'L':
        this.locationX -= 1
        break
      case 'R':
        this.locationX += 1
        break
      default:
        console.log('Enter U, D, L or R.')
        this.getInput()
        break
    } 
}
runGame() {
    let playing = true;
    while (playing) {
      console.log(this.print())
      this.getInput()
      if (!this.withinBounds()) {
        console.log('Instruction is out of bounds!');
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log('Sorry, you fell down a hole!');
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log('Congratulations, you found your hat!');
        playing = false;
        break;
      }
      // Update the current location on the map
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }
  withinBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }
  
  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map(el => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    // Set the "hat" location
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    // the "hat" should not be at starting position
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
  
}

const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.runGame();