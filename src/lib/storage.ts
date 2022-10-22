import type { IStorage } from "../types";

export function getStorage(callback: (storage: IStorage) => void) {
  chrome.storage.sync.get(
    { stack: [], stackTitle: "" } as IStorage,
    (storage: IStorage) => {
      callback(storage);
    }
  );
}

export function setStorage(storage: IStorage) {
  chrome.storage.sync.set(storage);
}

export function updateStorage(storage: Partial<IStorage>) {
  getStorage((oldStorage) => {
    setStorage({ ...oldStorage, ...storage });
  });
}
