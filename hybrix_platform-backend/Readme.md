# 🧪 AI API 테스트

## 🌐 네이버 Clova 유료

## 🦜 네이버 파파고 테스트 (node.js) - translate

```jsx
import request from 'request';

export const papagoTranslate = (req, res) => {
  const client_id = 'xxxxxxxxxx-xxx--xxxx';
  const client_secret = 'xxxxxxxx';
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
```
![b](https://user-images.githubusercontent.com/73332608/223648345-034b0416-7c6b-4c6e-867c-9bf46326af16.png)

## 📷 dall-e of openAI (node.js) - text to image

```jsx
import { Configuration, OpenAIApi } from 'openai';

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
```

<img width="878" alt="a" src="https://user-images.githubusercontent.com/73332608/223647995-54ffd583-14df-42e5-8997-55a551ff0260.png">

![laugh](https://user-images.githubusercontent.com/73332608/223648420-2d48738b-67dc-4118-b1ed-9769bdd55ef2.png)

## 🤳🏻 Stable Diffusion (python3) - text to image

```python
import os
import replicate

# Set the REPLICATE_API_TOKEN environment variable
os.environ["REPLICATE_API_TOKEN"]="xxxx_xxxxxx--x---xxx";

model = replicate.models.get("stability-ai/stable-diffusion")
version = model.versions.get("db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf")

# https://replicate.com/stability-ai/stable-diffusion/versions/db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf#input
inputs = {
    # Input prompt
    'prompt': "running dogs",

    # pixel dimensions of output image
    'image_dimensions': "768x768",

    # Specify things to not see in the output
    # 'negative_prompt': ...,

    # Number of images to output.
    # Range: 1 to 4
    'num_outputs': 1,

    # Number of denoising steps
    # Range: 1 to 500
    'num_inference_steps': 50,

    # Scale for classifier-fre구글
```

```
➜  stable-diffusion git:(main) ✗ python3 stable-diffusion.py

['https://replicate.delivery/pbxt/QfT9gYT7842dUKAgSXJBG6fmggfJLfz83e5K92nnfxFd7BNJE/out-0.png']
```

![running dogs](https://user-images.githubusercontent.com/73332608/223648495-c88455e2-63b5-4c7d-93a4-1020d56f5e13.png)

## 💬 ChatGPT (node.js) - chat api

```jsx
import { Configuration, OpenAIApi } from 'openai';

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
```

<img width="861" alt="d" src="https://user-images.githubusercontent.com/73332608/223648565-b51a8455-f45f-4903-a5e5-b49d51169eff.png">

## 🎵 Jukebox (node.js) - text to music

❌

## 🛰 chatGPT를 이용하여 Google Spreadsheet 쉽게 사용하기

### 🔗 Reference

[안하면 손해인 ChatGPT를 구글시트에서 활용하기 (영상 속 구글 시트를 무료로 드려요!)](https://youtu.be/k3IKo5msI2A)

https://docs.google.com/spreadsheets/d/10RStjg9Ek1nCIWy23YXCwIUc3JWa3crZ-oztn9dn5NA/edit?usp=sharing구

### 🗂 Process

1. 확장 프로그램 > 부가기능 > gpt 검색 > **GPT for Sheets and Docs** 다운로드 > 
2. A-1에 원하는 정보에 대한 질의 문구를 작성 (ex. 의 특징에 대해 예시를 2개씩 작성해줘)
3. B열에 정보를 얻고 싶은 단어 작성 (ex. 아이패드)
4. C열부터 G열까지 각 시트에 원하는 정보에 맞는 함수 작성
    
    C) `iferror(GOOGLETRANSLATE(B2, “ko”, “en”))` → 직접 작성한 단어를 영어로 번역해주는 함수
    
    D) `C2&$A$1` → A-1에 작성한 질의 문구와 B열에 작성한 단어를 합치는 과정
    
    E) `iferror(GOOGLETRANSLATE(D2, “ko”, “en”))` → C열에 작성한 내용을 영어로 번역해주는 함수
    
    F) `GPT(E2)` → GPT에 E열에 번역된 질의문을 보내는 함수
    
    G) `GOOGLETRANSLATE(F2, “en”, “ko”)` → F열을 한글로 번역하는 함수
    

## ▶️ E**lai**

### 🔗 Reference

👍🏻 **공식문서에 언어별, 플랫폼별로 코드 구분돼서 잘나와 있음**

[Getting Started With API](https://elai.readme.io/reference/getting-started-with-your-api)

### Create a Video

<aside>
<img src="/icons/alert_red.svg" alt="/icons/alert_red.svg" width="40px" /> 공식문서대로 하면 존재하지 않는 라이브러리로 인식해서 Elai가 제대로 작동하지 않기 때문에 axios를 이용하여 Elai에 직접 요청 값을 보내는 방식을 사용했다.

</aside>

```jsx
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
```

```json
// postman request body
{
  "name": "What is Elai?",
   "slides": [
      {
        "id": 1,
        "canvas": {
          "objects": [
            {
              "type": "avatar",
              "version": 2,
              "left": 150,
              "top": 20,
              "fill": "#4868FF",
              "scaleX": 0.37,
              "scaleY": 0.37,
              "src": "https://elai-media.s3.eu-west-2.amazonaws.com/avatars/jade.png",
              "avatarType": "transparent",
              "animation": {
                "type": null
              }
            }
          ],
          "background": "#ffffff",
          "version": "4.4.0"
        },
        "avatar": {
            "id": "jade",
            "name": "Jade",
            "version": 2,
            "gender": "female"
        },
        "animation": "fade_in",
        "language": "English",
        "speech": "Elai is an AI-powered video creation platform that allows users to create high-quality videos easily and quickly. It offers a range of tools and features to help users create engaging videos for their businesses or personal projects, including customizable templates, high-quality stock footage and music, and automated editing options. Elai also provides advanced AI-powered tools for video creation, including voiceover generation, text-to-speech conversion, and automatic subtitle creation. The platform is designed to be user-friendly and accessible, even for those with little to no experience in video creation. With Elai, anyone can create professional-looking videos that are tailored to their specific needs and goals.",
        "voice": "en-US-AriaNeural",
        "voiceType": "text",
        "voiceProvider": "azure"
      }
   ],
   "tags": [
        "test"
   ]
}
```

```json
// postman response
{
    "message": "Your video link is https://app.elai.io/video/640835ef56a1787e29f1fc2c"
}
```

![e](https://user-images.githubusercontent.com/73332608/223648660-4ce5e837-be92-463f-88fa-1dacce8b72a8.png)

![f](https://user-images.githubusercontent.com/73332608/223648719-0f453ffe-6fd3-4d02-bd58-6faf9e5d75ac.png)

+) *한국어 AI 목소리가 한 개 존재하긴 하나 제대로 작동 안함.*
