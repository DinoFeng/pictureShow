import fs from 'fs'
export default {
  getFolderFiles(folder) {
    return fs.readdirSync(folder)
  },
  getFileName() {
    return [
      {
        name: 'aa',
        files: [
          { name: 'cc', ext: 'jpg' },
          { name: 'dd', ext: 'jpg' },
          {
            name: 'bb',
            files: [
              { name: 'ee', ext: 'jpg' },
              { name: 'ff', ext: 'jpg' },
              { name: 'gg', ext: 'jpg' },
              { name: 'hh', ext: 'jpg' },
            ],
          },
        ],
      },
      { name: 'ii', ext: 'jpg' },
      { name: 'jj', ext: 'jpg' },
      {
        name: 'kk',
        files: [
          { name: 'ee', ext: 'jpg' },
          { name: 'ff', ext: 'jpg' },
          { name: 'gg', ext: 'jpg' },
          { name: 'hh', ext: 'jpg' },
        ],
      },
      { name: 'll', ext: 'jpg' },
    ]
  },
}
