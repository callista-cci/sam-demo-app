// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const AWS = require('aws-sdk')
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })
let documentClient = new AWS.DynamoDB.DocumentClient({    'region': 'us-east-2'});

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

// GET  https://4ggrrjbce4.execute-api.us-east-2.amazonaws.com/Prod/restuarant?rId=5
// query param rId to fetch the user

exports.restuarantHandler = (event, context, callback) => {
  // Get from table using document client
  
var params = {
  TableName: "sam-demo-app1-RestuarantOneTable-QWCHW4V716UH",
  Limit: 10
};


var promise = documentClient.scan(params).promise().then(function(data, err) {
  if (err) {
    console.log(err);
    response = {
      'statusCode': 400,
      'body': JSON.stringify(err, null, 2)
    }
    callback(null, response);
  }
  else {
    console.log(data);
    response = {
          'statusCode': 200,
          'body': JSON.stringify(data, null, 2)
        }
    callback(null, response);
  }
});

// Using Dynamo DB : GET from table
/*

  var params = {
    TableName: "sam-demo-app1-RestuarantOneTable-QWCHW4V716UH",
    ExpressionAttributeValues: {
      ":v1": {
        S: event.queryStringParameters.rId
      }
    },
    KeyConditionExpression: "id = :v1",

  }yy
   

  var ddbPromise = ddb.query(params).promise().then(function (data) {
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
    */
};
