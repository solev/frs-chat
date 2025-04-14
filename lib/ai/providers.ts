import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { azure, createAzure } from '@ai-sdk/azure';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

const azureThinking = createAzure({
  resourceName: process.env.AZURE_THINKING_RESOURCE_NAME, // Azure resource name
  apiKey: process.env.AZURE_THINKING_API_KEY, // Azure API key
  apiVersion: '2025-01-01-preview', // Azure API version

});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': azure('gpt-4o'),
        // 'chat-model-reasoning': wrapLanguageModel({
        //   model: xai('grok-3-mini-beta'),
        //   middleware: extractReasoningMiddleware({ tagName: 'think' }),
        // }),
        'chat-model-reasoning': azure("o1-mini"),
        'title-model': azure('gpt-4o'),
        'artifact-model': azure('gpt-4o'),
      },
      imageModels: {
        'small-model': azure.imageModel('dall-e-3'),
      },
    });
