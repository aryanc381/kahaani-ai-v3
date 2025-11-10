import dotenv from 'dotenv';
import { Mistral } from '@mistralai/mistralai';
import fs from 'fs';
import FormData from "form-data";
import { Blob } from "node:buffer";  // ← THIS is correct Blob

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });


const chatResponse = await client.chat.complete({
  model: 'ft:ministral-3b-latest:17fc8bd3:20251110:16858091',
  messages: [{role: 'user', content: 'What happened to Shaniwar Wada in 1828?'}],
});
console.log(chatResponse.choices[0]?.message.content);

const training_file = fs.readFileSync('./data/training_file.jsonl');
const training_data = await client.files.upload({
  file: {
    fileName: 'training_file.jsonl',
    content: training_file,
  },
});

const createdJob = await client.fineTuning.jobs.create({
  model: 'open-mistral-7b',
  trainingFiles: [{ fileId: training_data.id, weight: 1 }],
  hyperparameters: {
    trainingSteps: 10,
    learningRate: 0.0001,
  },
  autoStart: true,
});

console.log(createdJob);


const stat = await client.fineTuning.jobs.start({jobId: '46523543-9dbb-49e0-b34e-dd49c2751312sssss'});
console.log(stat)