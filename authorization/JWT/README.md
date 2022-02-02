# Authorization by JWT - JSON Web Tokens 
-----------------------------------------

JSON Web Tokens are a form of user identification that is issued after the initial user login process takes place. Once authentication and login takes place, the API will issue the client application an access token and a refresh token. The Refresh Token is sent as a httpOnly cookie which is not accessible by JavaScript. The Access token is issued as JSON data on verification of the refresh token.

To avoid the risks, the client stores the token in memory (which can be referred as ***current application state***) so they are automatically lost when the app is closed and not local storage which has security vulnerabilities.

## Characteristics of the Tokens

### Access Token
- Short time validity (5-30 mins)
- The Access token is sent as JSON data
- The Access token is issued during authorization
- The Client uses the access token for accessing protected routes of our API until it expires
- The API has to verify the access token with middleware, everytime the access token is used to make a request.
- When the access token expires, the Client sends a new request with the refresh token to issue a fresh access token.


## Refresh Token
- Long time validity (An hour, hours, day or days)
- The Refresh token is issued during authorization
- Used to request the generation of an access token.
- The API's Refresh endpoint will verify the token and cross reference with database.
- Storing the refresh token allows early termination if user decides to logout.
- Sent to the client as a httpOnly cookie which is not accessible by JavaScript.
- Must have expiry at some point. Should not have the ability to issue new refresh tokens because that grants indefinite access if it falls into the wrong hands.