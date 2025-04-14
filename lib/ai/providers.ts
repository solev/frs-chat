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
  resourceName: process.env.AZURE_THINKING_RESOURCE_NAME,
  apiKey: process.env.AZURE_THINKING_API_KEY,
  apiVersion: '2025-01-01-preview',
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'gpt-4o': chatModel,
        'o1-mini': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'gpt-4o': azure('gpt-4o'),
        'o1-mini': azure('o1-mini'),
        'o3-mini': azure('o3-mini'),
        'title-model': azure('gpt-4o'),
        'artifact-model': azure('gpt-4o'),
      },
      imageModels: {
        'small-model': azure.imageModel('dall-e-3'),
      },
    });
