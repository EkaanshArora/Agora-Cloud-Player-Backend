import fetch from 'node-fetch'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express();
// setup cors
app.use(cors({origin: '*', methods: ['GET', 'POST', 'DELETE']}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 8080;
const APP_ID = process.env.APP_ID;
const REST_KEY = process.env.REST_KEY;
const REST_SECRET = process.env.REST_SECRET;
const region = 'na'
const auth = 'Basic ' + Buffer.from(REST_KEY + ':' + REST_SECRET).toString('base64');

const play = async (req, resp) => {
  resp.header('Acess-Control-Allow-Origin', '*');

  const channelName = req.body.channel;
  if (!channelName) {
    return resp.status(500).json({ 'error': 'channel is required' });
  }

  const uid = req.body.uid;
  if (!uid) {
    return resp.status(500).json({ 'error': 'uid is required' });
  }

  const url = req.body.url;
  if (!url) {
    return resp.status(500).json({ 'error': 'url is required' });
  }
  
  const token = req.body.token;
  
  const headers = {
    'Authorization': auth,
    'Content-Type': 'application/json',
  }

  const data = {
    player:
    {
      streamUrl: url,
      channelName: channelName,
      token: token,
      uid: uid,
      idleTimeout: 300,
      name: "test"
    }
  }

  const res = await fetch(
    `https://api.agora.io/${region}/v1/projects/${APP_ID}/cloud-player/players`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    });
  const json = await res.json()

  console.log(json)
  return resp.json(json);
}

app.post('/play' , play);

const ping = (req, resp) => {
  resp.send({message: 'pong'});
}

app.get('/ping', ping)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});