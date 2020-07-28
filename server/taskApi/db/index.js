const mongoose = require('mongoose');

const uri =
  'mongodb+srv://user_1:123@cluster0.o4tz8.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
