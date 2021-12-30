export interface EnvConfig {
  apiEndpoint: string;
  environment: string;
  defaultLanguage: string;
  selectedLanguage: string;
  langs: string[];
  discord: Discord;
}

export interface Discord {
  username: string;
  errorWebhook: string;
}
