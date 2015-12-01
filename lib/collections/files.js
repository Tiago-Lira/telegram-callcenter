

if (Meteor.isServer) {
  var UPLOAD_PATH = process.env.PWD + '/private/uploads';
}

FilesStore = new FS.Store.FileSystem('files', {path: UPLOAD_PATH});
Files = new FS.Collection("files", {
  stores: [
    FilesStore
  ],
  filter: {
    allow: {
      contentTypes: ['image/*', 'application/pdf']
    }
  }
});

