module.exports = {
  name: "fullstack-monorepo",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/fullstack-monorepo/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
