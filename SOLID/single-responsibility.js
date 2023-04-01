const fs = require("fs");
const path = require("path");

//Responsibility - Manage Journal Entries
class Journal {
  constructor() {
    this.entries = {};
    this.count = 0;
  }

  addEntry(text) {
    let c = ++this.count;
    let content = `${this.count} : ${text}`;
    this.entries[c] = content;

    return this.entries[c];
  }

  removeEntry(index) {
    if (this.entries[index]) {
      delete this.entries[index];
      return true;
    }
    return false;
  }

  showAllEntries() {
    return Object.values(this.entries).join("\n");
  }
}

//Responsibility - Write data to files
class PersistenceManager {
  constructor() {
    if (!fs.existsSync(path.resolve(__dirname, "dist"))) {
      fs.mkdirSync(path.resolve(__dirname, "dist"));
    }
  }
  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.showAllEntries());
  }
}

const journal = new Journal();
journal.addEntry("Commit this changes to Github");
journal.addEntry("Relax!");
console.log(journal.showAllEntries());

const pManager = new PersistenceManager();
pManager.saveToFile(journal, path.resolve(__dirname, "dist", "journal.txt"));
