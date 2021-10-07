import "reflect-metadata";
import { createConnection } from "typeorm";
import { VCode } from "./entity/VCode";
var randomstring = require("randomstring");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const csvWriter = createCsvWriter({
  path: 'file.csv',
  header: [
    { id: 'code', title: 'Verification Code' },
    { id: 'expiration', title: 'Expire Date' },
  ]
});

createConnection().then(async connection => {
  var jsonArr = [];
  for (let i = 0; i < 25000; i++) {
    let radomStr = randomstring.generate(8);
    let expireDate = new Date();
    expireDate.setMonth(expireDate.getMonth()+6);
    jsonArr.push({
      code: radomStr,
      is_used: 0,
      expire_date: expireDate
  });
  let record = [{code: radomStr ,expiration: expireDate  }];
  await csvWriter.writeRecords(record)
      .then(() => {
        console.log(i+ ' Done');
      });
  }
  console.log(jsonArr);
  await connection
    .createQueryBuilder()
    .insert()
    .into(VCode)
    .values(jsonArr)
    .execute();
}).catch(error => console.log(error));
