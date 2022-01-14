# Agora Cloud Player Backend
This is an example of a simple Node/Express server that can be use to invoke cloud player to inject videos into an Agora video channel.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Run the server ###
Install the dependencies
```node
npm install
```
Start the service
```node
npm start
```

## Endpoints ##

### Ping ###
**endpoint structure**
```
GET /ping
```
response:
``` 
{"message":"pong"} 
```

### Play Video ###
The `play` endpoint requires a `channelName`, the user's `uid`, the video `url` and an optional `token` in the body.

**endpoint structure** 
```
POST /play
```

example body:
```
{
  channel: "test",
  uid: 1,
  token: null,
  url: "https://example.com/video.mp4""
}
```
Headers:
```
Content-Type: `application/json`
```
