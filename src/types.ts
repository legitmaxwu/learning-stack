export type IStorage = {
  stack: StackItem[];
  stackTitle: string;
};

export type StackItem = {
  tab: chrome.tabs.Tab;
  title: string;
};
