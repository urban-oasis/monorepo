const { OAuth2Client } = require('google-auth-library')
const assert = require('assert')

async function verifyGoogleAccount (tokenId) {
  const clientId = process.env.OAUTH2_CLIENT_ID
  const oauthClient = new OAuth2Client(clientId)
  const ticket = await oauthClient.verifyIdToken({
    idToken: tokenId,
    audience: clientId
  })
  const payload = ticket.getPayload()['hd']
  if (payload.includes('urbanoasis.life')) {
    return process.env.AUTH_TOKEN
  } else {
    throw ('Incorrect domain', payload)
  }
}

module.exports.verifyGoogleAccount = verifyGoogleAccount
