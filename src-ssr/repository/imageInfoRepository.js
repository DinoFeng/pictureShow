const baseInterface = require("./iRepository");
const _createTable = Symbol("createTable");
const _createUniqueIndex = Symbol("createUniqueIndex");
const _createSexyIndex = Symbol("_createSexyIndex");
const _createPornIndex = Symbol("_createPornIndex");
const _createNeutraleIndex = Symbol("_createNeutraleIndex");
const _createDrawingIndex = Symbol("_createDrawingIndex");
const _createHentaiIndex = Symbol("_createHentaiIndex");
const _createFolderIndex = Symbol("_createFolderIndex");
class ImageListRepository extends baseInterface {
  get tableName() {
    return "ImageList";
  }

  async InitTable() {
    return this[_createTable]()
      .then(() =>
        Promise.all([
          this[_createUniqueIndex](),
          this[_createSexyIndex](),
          this[_createPornIndex](),
          this[_createNeutraleIndex](),
          this[_createDrawingIndex](),
          this[_createHentaiIndex](),
          this[_createFolderIndex](),
        ])
      )
      .then(() => true);
  }

  async [_createTable]() {
    const sql = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL UNIQUE,
        folder TEXT,
        sexy NUMERIC,
        porn NUMERIC,
        neutral NUMERIC,
        drawing NUMERIC,
        hentai NUMERIC,
        updatedAt TEXT)`;
    return this.dao.run(sql);
  }

  async [_createUniqueIndex]() {
    const sql = `
      CREATE UNIQUE INDEX IF NOT EXISTS idx_${this.tableName}_unique ON ${this.tableName}(fullName)`;
    return this.dao.run(sql);
  }

  async [_createSexyIndex]() {
    const sql = `
      CREATE INDEX IF NOT EXISTS idx_${this.tableName}_sexy ON ${this.tableName}(sexy)`;
    return this.dao.run(sql);
  }

  async [_createPornIndex]() {
    const sql = `
      CREATE INDEX IF NOT EXISTS idx_${this.tableName}_porn ON ${this.tableName}(porn)`;
    return this.dao.run(sql);
  }

  async [_createNeutraleIndex]() {
    const sql = `
      CREATE INDEX IF NOT EXISTS idx_${this.tableName}_neutral ON ${this.tableName}(neutral)`;
    return this.dao.run(sql);
  }

  async [_createDrawingIndex]() {
    const sql = `
      CREATE INDEX IF NOT EXISTS idx_${this.tableName}_drawing ON ${this.tableName}(drawing)`;
    return this.dao.run(sql);
  }

  async [_createHentaiIndex]() {
    const sql = `
      CREATE INDEX IF NOT EXISTS idx_${this.tableName}_hentai ON ${this.tableName}(hentai)`;
    return this.dao.run(sql);
  }

  async [_createFolderIndex]() {
    const sql = `
      CREATE INDEX IF NOT EXISTS idx_${this.tableName}_folder ON ${this.tableName}(folder)`;
    return this.dao.run(sql);
  }
}
module.exports = ImageListRepository;
