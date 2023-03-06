import request from 'request';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export const papagoTranslate = (req, res) => {
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

export const dalle = async (req, res) => {
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
