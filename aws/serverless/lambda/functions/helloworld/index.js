console.log('Loading function');

exports.handler = (event, context, callback) => {
  console.log(event);
  const body = `<h1>Hello from Lambda!</h1>
  <h3>IPv4Address: ${event.headers['x-forwarded-for']} </h3>`;
  const result = {
    statusCode: 200,
    statusDescription: '200 OK',
    isBase64Encoded: false,
    headers: {
      'Content-Type': 'text/html',
    },
    body,
  };
  context.callbackWaitsForEmptyEventLoop = false;
  callback(null, result);
};
