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

const journal = new Journal();

journal.addEntry("Commit this changes to Github");
journal.addEntry("Relax!");

console.log(journal.showAllEntries());
