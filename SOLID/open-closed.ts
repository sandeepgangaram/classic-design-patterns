//Open-Closed Principle
//Classes are open for extension but closed for modification
// - meaning you never jump into an existing class and
//   start modifying it (unless you aboslutely have to - ex:bugfix)

enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

class Product {
  name: string;
  color: string;
  size: string;

  constructor(name: string, color: string, size: string) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

const apple: Product = new Product("Apple", "red", "small");
const fridge: Product = new Product("Fridge", "green", "large");
const table: Product = new Product("Table", "green", "large");

const products: Product[] = [apple, fridge, table];

interface FilterSpecification {
  spec: string;
  isSatisfied(item: any): boolean;
}

class ColorSpecification implements FilterSpecification {
  spec: string;

  constructor(color: string) {
    this.spec = color;
  }

  isSatisfied(item: any): boolean {
    return item.color === this.spec;
  }
}

class BetterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

const bf = new BetterFilter();

for (let p of bf.filter(products, new ColorSpecification(Color.GREEN))) {
  console.log(`Only Green : ${p.name}`);
}
