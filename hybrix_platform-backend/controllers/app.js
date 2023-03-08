const request = require('request');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
// const sdk = require('api')('@elai/v1.0#4vn24l38ksx1u', undefined);
const axios = require('axios');

dotenv.config();

const papagoTranslate = (req, res) => {
  const client_id = 'u_ue30kU_n6HcdYWOg4l';
  const client_secret = 'OeZPlSv0v8';
  const query = 'Hi, how do you do?';

  const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
  let options = {
    url: api_url,
    form: { source: 'en', target: 'ko', text: query },
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
  };

  request.post(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log(`error = `, response.statusCode);
    }
  });
};

const dalle = async (req, res) => {
  const { prompt } = req.body;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024',
  });
  const image_url = response['data']['data'][0]['url'];
  res.send(image_url);
};

const chatgpt = async (req, res) => {
  const { messages } = req.body;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
  });
  const result_message = response['data']['choices'][0]['message'];
  res.send(result_message);
};

const elaiVideo = async (req, res) => {
  const url = 'https://apis.elai.io/api/v1/videos';
  const apiKey = process.env.ELAI_API_KEY;

  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  };
  const requestData = { ...req.body };

  axios
    .post(url, requestData, config)
    .then((resp) => {
      res.json({
        message: `Your video link is https://app.elai.io/video/${resp.data._id}`,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  papagoTranslate,
  dalle,
  chatgpt,
  elaiVideo,
};
