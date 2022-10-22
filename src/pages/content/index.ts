import type { IStorage } from "src/types";
import { getStorage } from "../../lib/storage";

getStorage((storage: IStorage) => {
  console.log("content", storage);
});
