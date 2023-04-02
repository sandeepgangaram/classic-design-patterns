//Liskov Substitution Principle

//Functions that use pointers or references to base classes
//must be able to use objects of derived classes without knowing it

//If you have a function which takes in a base class
//The function should be able to take a derived class
//without breaking the functionality in any way whatsoever

class Shape {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getArea() {
    return this.height * this.width;
  }
}

class Rectangle extends Shape {
  constructor(height, width) {
    super(height, width);
  }

  setWidth(x) {
    this.width = x;
  }

  setHeight(x) {
    this.height = x;
  }
}

class Square extends Shape {
  constructor(width) {
    super(width, width);
  }

  setWidth(x) {
    this.height = x;
    this.width = x;
  }

  setHeight(x) {
    this.height = x;
    this.width = x;
  }
}

function increaseShapeWidth(shape) {
  shape.setWidth(shape.width + 1);
  console.log(shape.getArea());
}

increaseDimension(new Rectangle(5, 4));
increaseDimension(new Square(5));
increaseDimension(new Rectangle(5, 5));
