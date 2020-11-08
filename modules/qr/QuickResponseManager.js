const jwt = require('express-jwt');
const historical = require('../../controllers/historicoQRController');
const { setIntervalAsync } = require('set-interval-async/dynamic');

async function Initialize() {
  setIntervalAsync(async () => {
    let result = await Generate();

    if (result !== null)
      console.log(new Date() + ' - NEW QR Code generated: ' + result.secret);
    else console.log('>>> Error: Issue generating QR');
  }, 15 * 60000);
}

/**
 * Generates a new QR code with a randomly generated secret
 */
async function Generate() {
  return await historical.Create();
}

/**
 * Validation check for a given JWT
 * @param token
 */
async function Validate(token) {
  const qr = await historical.GetLatest();
  let isValid = false;

  jwt.verify(token, qr.secret, (err) => {
    if (err) console.log(err);
    else {
      isValid = !isValid;
    }
  });

  console.log(`is QR valid? ${isValid}`);

  return isValid;
}

module.exports = { Initialize, Generate, Validate };
