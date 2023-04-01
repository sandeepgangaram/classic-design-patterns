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

const apple: Product = new Product("Apple", "green", "small");
const fridge: Product = new Product("Fridge", "red", "large");
const table: Product = new Product("Table", "green", "large");

const products: Product[] = [apple, fridge, table];

interface FilterSpecification {
  spec: string;
  isSatisfied(item: Product): boolean;
}

class ColorSpecification implements FilterSpecification {
  spec: string;

  constructor(color: string) {
    this.spec = color;
  }

  isSatisfied(item: Product): boolean {
    return item.color === this.spec;
  }
}

class SizeSpecification implements FilterSpecification {
  spec: string;

  constructor(size: string) {
    this.spec = size;
  }

  isSatisfied(item: Product): boolean {
    return item.size === this.spec;
  }
}

class BetterFilter {
  filter(items: Product[], spec: FilterSpecification | AndSpecification) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

class AndSpecification {
  specs: FilterSpecification[];

  constructor(...specs: FilterSpecification[]) {
    this.specs = specs;
  }

  isSatisfied(item: Product) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

const bf = new BetterFilter();

for (let p of bf.filter(products, new ColorSpecification(Color.GREEN))) {
  console.log(`Only Green : ${p.name}`);
}

console.log("********");

for (let p of bf.filter(products, new SizeSpecification(Size.LARGE))) {
  console.log(`Only Large : ${p.name}`);
}

console.log("********");

const multiSpec = new AndSpecification(
  new ColorSpecification(Color.GREEN),
  new SizeSpecification(Size.LARGE)
);

for (let p of bf.filter(products, multiSpec)) {
  console.log(`Both Large and Green : ${p.name}`);
}
