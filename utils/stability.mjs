/* eslint-disable node/no-unsupported-features/es-syntax */
import GenerationService from '../generation/stability.ai/generation_pb_service.js';
import Generation from '../generation/stability.ai/generation_pb.js';
import grpcWeb from '@improbable-eng/grpc-web';
import grpcTransport from '@improbable-eng/grpc-web-node-http-transport';
import {btoa} from 'buffer';
import {writeFileSync} from 'fs';

import dotenv from 'dotenv';
dotenv.config();

const {grpc} = grpcWeb;
const {NodeHttpTransport} = grpcTransport;

grpc.setDefaultTransport(NodeHttpTransport());

// Setup image params
const imageParams = new Generation.ImageParameters();
imageParams.setWidth(512);
imageParams.setHeight(512);
imageParams.addSeed(1234);
imageParams.setSamples(1);
imageParams.setSteps(50);

// Use the `k-dpmpp-2` sampler
const transformType = new Generation.TransformType();
transformType.setDiffusion(Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M);
imageParams.setTransform(transformType);

// Use Stable Diffusion 2.0
const request = new Generation.Request();
request.setEngineId('stable-diffusion-v1-5');
request.setRequestedType(Generation.ArtifactType.ARTIFACT_IMAGE);
request.setClassifier(new Generation.ClassifierParameters());

// Use a CFG scale of `13`
const samplerParams = new Generation.SamplerParameters();
samplerParams.setCfgScale(13);

const stepParams = new Generation.StepParameter();
const scheduleParameters = new Generation.ScheduleParameters();

// Set the schedule to `0`, this changes when doing an initial image generation
stepParams.setScaledStep(0);
stepParams.setSampler(samplerParams);
stepParams.setSchedule(scheduleParameters);

imageParams.addParameters(stepParams);
request.setImage(imageParams);

// Authenticate using your API key, don't commit your key to a public repository!
const metadata = new grpc.Metadata();
metadata.set('Authorization', 'Bearer ' + process.env.STABILITY_API_KEY);

// Create a generation client
const generationClient = new GenerationService.GenerationServiceClient(
  'https://grpc.stability.ai',
  {}
);

const generateImage = (
  prompt = 'Mermaid sits on the beach',
  cb = someFunctionToCallWhenFinished
) => {
  // Set our text prompt
  const promptText = new Generation.Prompt();
  promptText.setText(prompt);

  request.addPrompt(promptText);

  // Send the request using the `metadata` with our key from earlier
  const generation = generationClient.generate(request, metadata);

  // Set up a callback to handle data being returned
  generation.on('data', data => {
    data.getArtifactsList().forEach(artifact => {
      // Oh no! We were filtered by the NSFW classifier!
      if (
        artifact.getType() === Generation.ArtifactType.ARTIFACT_TEXT &&
        artifact.getFinishReason() === Generation.FinishReason.FILTER
      ) {
        return console.error('Your image was filtered by the NSFW classifier.');
      }

      // Make sure we have an image
      if (artifact.getType() !== Generation.ArtifactType.ARTIFACT_IMAGE) return;

      // You can convert the raw binary into a base64 string
      const base64Image = btoa(
        new Uint8Array(artifact.getBinary()).reduce(
          (data, byte) => data + String.fromCodePoint(byte),
          ''
        )
      );

      const bufferImage = Buffer.from(artifact.getBinary(), 'binary');

      const binaryImage = artifact.getBinary();

      // Here's how you get the seed back if you set it to `0` (random)
      const seed = artifact.getSeed();

      // We're done!
      cb({
        seed,
        base64Image,
        binaryImage,
        bufferImage,
      });
    });
  });

  // Anything other than `status.code === 0` is an error
  generation.on('status', status => {
    if (status.code === 0) return;
    console.log(status);
    console.error(
      'Your image could not be generated. You might not have enough credits.'
    );
  });
};

function someFunctionToCallWhenFinished({binary}) {
  writeFileSync('test.png', binary, 'binary');
}

export default {generateImage};
