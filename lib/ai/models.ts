export const DEFAULT_CHAT_MODEL: string = 'gpt-4o';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Primary model for all-purpose chat',
  },
  {
    id: 'o1-mini',
    name: 'o1 mini',
    description: 'Uses advanced reasoning',
  },
  {
    id: 'o3-mini',
    name: 'o3 mini',
    description: 'Uses advanced reasoning',
  },
];
