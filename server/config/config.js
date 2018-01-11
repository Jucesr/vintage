var env = process.env.NODE_ENV || 'dev';

if( env === 'dev'){
  const config =  require('./config.json');
  process.env.SENDER_EMAIL = config.SENDER_EMAIL;
  process.env.SENDER_PASSWORD = config.SENDER_PASSWORD;
  process.env.RECEIVER_EMAIL = config.RECEIVER_EMAIL;
}
