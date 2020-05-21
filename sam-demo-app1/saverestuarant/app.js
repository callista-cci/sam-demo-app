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
// POST https://4ggrrjbce4.execute-api.us-east-2.amazonaws.com/Prod/saverestuarant/
// Body { 	"rId": "999", 	"rName": "Resturant 999" }

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


};
