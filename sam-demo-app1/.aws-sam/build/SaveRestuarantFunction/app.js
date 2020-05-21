// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-2' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

//aws_access_key_id = ASIAQZV6RMWN4ZOUGPWE
//aws_secret_access_key = ayoWqGwSdn5gseSq/xU6szXOdCBx7LfiBaFJNf/5

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.saverestuarantHandler = (event, context, callback) => {
  const { path, queryStringParameters, headers, body } = event;


  console.log("path:" + path)
  console.log("body:" + body)

  if (event.body) {
    let body = JSON.parse(event.body)
    if (body.rId)
      rId = body.rId;
    if (body.rName)
      rName = body.rName
  }

  var params = {
    TableName: "sam-demo-app1-RestuarantOneTable-QWCHW4V716UH",
    Item: {
      id: { S: rId },
      resturantName: { S: rName }
    }
  }

  var ddbPromise = ddb.putItem(params).promise().then(function (data) {
    console.log(data);
    response = {
      'statusCode': 200,
      'body': JSON.stringify(data, null, 2)
    }
    callback(null, response)
  })
    .catch(function (err) {
      console.log(err);
      response = {
        'statusCode': 400,
        'body': JSON.stringify(err, null, 2)
      }
      callback(null, response)
    });


  // await ddb.putItem(params, function(err, data) {
  // if (err) {
  //     console.log("Error", err);
  //   } else {
  //     console.log("Success", data);
  //   }
  // });



  // // Call DynamoDB to add the item to the table
  // await ddb.describeTable(params, function(err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //   } else {
  //     console.log("Success", data);
  //   }
  // });
  // response = {
  //                         'statusCode': 200,
  //                         'body': JSON.stringify({
  //                                                 id: '123',
  //                                                 restuarantName: 'James Restuarant',
  //                                                 location : 'Margao Goa'
  //                                                 // location: ret.data.trim()
  //                                             })
  //                     }
  //                     callback(null, response)

  //                   };

  //callback(null, response)
  //return response
  // docClient.put(params)
  // 		.promise()
  // 		.then((result) => {
  //             console.log("Item:" + item)
  // 			return item;
  // 		}, (error) => {
  //             console.log("Error:" + error)
  // 			return error;
  //         });

  //  docClient.put(params, callback);;

  //     function(err, data){
  //         if(err){
  //             console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  //            // response = JSON.stringify(err, null, 2)
  //            // callback(err, null)
  //            response = {
  //                     'statusCode': 400,
  //                     'body': JSON.stringify({
  //                         id: '123',
  //                         restuarantName: 'James Restuarant',
  //                         location : 'Margao Goa'
  //                         // location: ret.data.trim()
  //                     })
  //                 }
  //                 callback(null, response)
  //    // return response
  //         }
  //         else {
  //             console.log("Added item:", JSON.stringify(data, null, 2));
  //             response = {
  //                 'statusCode': 200,
  //                 'body': JSON.stringify({
  //                     id: '123',
  //                     restuarantName: 'James Restuarant',
  //                     location : 'Margao Goa'
  //                     // location: ret.data.trim()
  //                 })

  //             }

  //             callback(null, response)
  //            // response = JSON.stringify(data, null, 2)
  //         //callback(null, data)
  //         }
  //     })

  // try {
  //     // const ret = await axios(url);
  //     response = {
  //         'statusCode': 200,
  //         'body': JSON.stringify([{
  //             id: '123',
  //             restuarantName: 'James Restuarant',
  //             location : 'Margao Goa'
  //             // location: ret.data.trim()
  //         },
  //         {
  //             id: '124',
  //             restuarantName: 'Johnnys Restuarant',
  //             location : 'Margao Goa'
  //             // location: ret.data.trim()
  //         },
  //     ])
  //     }
  // } catch (err) {
  //     console.log(err);
  //     return err;
  // }

};
