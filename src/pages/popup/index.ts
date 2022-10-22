import App from "src/components/App.svelte";
import { getStorage } from "../../lib/storage";

function restoreApp() {
  getStorage((storage) => {
    console.log(storage);
    new App({
      target: document.body,
      props: storage,
    });
  });
}

document.addEventListener("DOMContentLoaded", restoreApp);
