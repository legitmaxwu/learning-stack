import type { IStorage } from "src/types";
import { getStorage } from "../../lib/storage";

chrome.runtime.onInstalled.addListener(() => {
  getStorage((storage: IStorage) => {
    console.log("background", storage);
  });
});
