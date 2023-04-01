//Open-Closed Principle
//Classes are open for extension but closed for modification
// - meaning you never jump into an existing class and
//   start modifying it (unless you aboslutely have to - ex:bugfix)

//Constants
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

//Product Class
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

//Products Instances
const apple: Product = new Product("Apple", "green", "small");
const fridge: Product = new Product("Fridge", "red", "large");
const table: Product = new Product("Table", "green", "large");

const products: Product[] = [apple, fridge, table];

//Filters
interface FilterSpecification {
  spec: string;
  isSatisfied(item: Product): boolean;
}

//Color Filter
class ColorSpecification implements FilterSpecification {
  spec: string;

  constructor(color: string) {
    this.spec = color;
  }

  isSatisfied(item: Product): boolean {
    return item.color === this.spec;
  }
}

//Size Filter
class SizeSpecification implements FilterSpecification {
  spec: string;

  constructor(size: string) {
    this.spec = size;
  }

  isSatisfied(item: Product): boolean {
    return item.size === this.spec;
  }
}

//Any Filter
class BetterFilter {
  filter(items: Product[], spec: FilterSpecification | AndSpecification) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

//Adding multiple Filters
class AndSpecification {
  specs: FilterSpecification[];

  constructor(...specs: FilterSpecification[]) {
    this.specs = specs;
  }

  isSatisfied(item: Product) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

//Satisgying Any One Filter
class OrSpecification {
  specs: FilterSpecification[];

  constructor(...specs: FilterSpecification[]) {
    this.specs = specs;
  }

  isSatisfied(item: Product) {
    return this.specs.some((x) => x.isSatisfied(item));
  }
}

//Filter Instances and Examples
const redFilter = new ColorSpecification(Color.RED);

for (let p of products.filter((p) => redFilter.isSatisfied(p))) {
  console.log(`Just Red : ${p.name}`);
}

console.log("*****");

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

console.log("********");

const anySpec = new OrSpecification(
  new ColorSpecification(Color.GREEN),
  new SizeSpecification(Size.LARGE)
);

for (let p of bf.filter(products, anySpec)) {
  console.log(`Either Red or Large : ${p.name}`);
}
