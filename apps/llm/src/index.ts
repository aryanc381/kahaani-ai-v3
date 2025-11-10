import dotenv from "dotenv";
import { Mistral } from "@mistralai/mistralai";
import fs from "fs";

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY!;
const client = new Mistral({ apiKey });

// quick test call (not required)
const chatResponse = await client.chat.complete({
  model: "open-mistral-7b",
  messages: [
    { role: "user", content: "What happened to Shaniwar Wada in 1828?" },
  ],
});
console.log("TEST:", chatResponse.choices[0]?.message.content);

// ---- upload training file
const training_file = fs.readFileSync("./data/training_file.jsonl");
const training_data = await client.files.upload({
  file: {
    fileName: "training_file.jsonl",
    content: training_file,
  },
});

// ---- upload validation file
const validation_file = fs.readFileSync("./data/validation_file.jsonl");
const validation_data = await client.files.upload({
  file: {
    fileName: "validation_file.jsonl",
    content: validation_file,
  },
});

// ---- create job
const createdJob = await client.fineTuning.jobs.create({
  model: "open-mistral-7b",
  trainingFiles: [{ fileId: training_data.id, weight: 1 }],
  //@ts-ignore
  validationFiles: [{ fileId: validation_data.id, weight: 1 }],
  hyperparameters: {
    trainingSteps: 10,          // you can make 60 later
    learningRate: 0.001,       // MUST be string (best practice)
  },
  autoStart: true,
});

console.log("JOB CREATED:");
console.log(createdJob);
