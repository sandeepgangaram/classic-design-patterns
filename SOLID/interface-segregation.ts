// Interface Segregation Principle - ISP
// Segregate (or Split-up) interfaces into different parts
//so that people don't implement more than what they need

interface Print {
  print: (doc: any) => void;
}

interface Scan {
  scan: (doc: any) => void;
}

interface Fax {
  fax: (doc: any) => void;
}

class OldPrinter implements Print {
  print(doc: any) {
    console.log(doc);
  }
}

class ModernPrinter implements Print, Scan, Fax {
  print(doc: any) {
    console.log("Print ", doc);
  }
  scan(doc: any) {
    console.log("Scan ", doc);
  }
  fax(doc: any) {
    console.log("Fax ", doc);
  }
}
