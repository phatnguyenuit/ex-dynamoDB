const dynamoose = require('dynamoose');
const dynalite = require('dynalite');
const {
  aws_region
} = require('../config/config');

const startUpAndReturnDynamo = async () => {
  const dynaliteServer = dynalite({
    path: './mockData'
  });
  await dynaliteServer.listen(8000);
  return dynaliteServer;
};

const createDynamooseInstance = () => {
  dynamoose.AWS.config.update({
    region: aws_region
  });
  dynamoose.local(); // This defaults to "http://localhost:8000"
}

// const createAndGetCat = async () => {
//   const Cat = dynamoose.model('Cat', {
//     id: Number,
//     name: String
//   });
//   const garfield = new Cat({
//     id: 666,
//     name: 'Garfield'
//   });
//   await garfield.save();
//   const badCat = await Cat.get(666);
//   return badCat;
// }

const connectDb = async () => {
  await startUpAndReturnDynamo();
  createDynamooseInstance();
}

module.exports = connectDb;
