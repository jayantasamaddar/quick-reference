exports.handler = async event => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  return `Successfully received S3 event.`;
};
