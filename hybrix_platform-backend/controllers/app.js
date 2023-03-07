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

export const chatgpt = async (req, res) => {
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

export const fineTune = async (req, res) => {};

export const jukebox = async (req, res) => {
  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new
  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);
  // const prompt = `Generate a piece of music in the style of classical piano.
  // The piece should be 2 minutes long and start in the key of C major.
  // Include a melody with a range of one octave and a tempo of 100 bpm.`;
  // const model = 'jukebox-2b-gpt3';
  // const temperature = 0.5;
  // const top_p = 0.9;
  // const length = 8192;
  // const hparams = {
  //   sample_rate: 44100,
  //   n_samples: length,
  //   temperature: temperature,
  //   top_p: top_p,
  //   mode: 'primed',
  //   prompt: prompt,
  //   bs: 1,
  //   length: length,
  //   model: model,
  //   sample_length: length,
  //   midi: 'False',
  //   hop_fraction: [0.25, 0.25, 0.25],
  //   levels: 3,
  //   conditional: false,
  //   use_reverb: false,
  //   prompt_length_in_seconds: 12,
  //   sample_rate: 44100,
  //   train_level: '3',
  // };
  // openai
  //   .createCompletion({
  //     engine: 'davinci',
  //     prompt,
  //     max_tokens: length,
  //     n: 1,
  //     temperature,
  //     top_p,
  //     stop: null,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //     ...hparams,
  //   })
  //   .then((response) => {
  //     const music = response['data']['choices'][0]['text'];
  //     console.log(music);
  //   });
  // // const music = response['data']['choices'][0]['text'];
  // // console.log(response);
  // // res.send(music);
};
