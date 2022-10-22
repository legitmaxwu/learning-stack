<script lang="ts">
  import "./App.css";
  import type { StackItem } from "../types";
  import { updateStorage } from "../lib/storage";
  import RenderStackItem from "./RenderStackItem.svelte";

  export let stackTitle: string = "";
  export let stack: StackItem[] = [];

  let newTitle: string = "";

  $: updateStorage({ stackTitle });

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);

    console.log(tab);
    return tab;
  }

  async function addItemToStack() {
    const tab = await getCurrentTab();
    if (!tab) {
      alert("No tab found");
      return;
    }
    const newItem: StackItem = {
      title: newTitle,
      tab: tab,
    };

    stack = [...stack, newItem];
    updateStorage({ stack });
    newTitle = "";
  }

  function completeTaskAtIndex(index: number) {
    const item = stack[index];
    chrome.tabs.update({
      url: item.tab.url,
    });
    stack = stack.slice(0, index);
    updateStorage({ stack });
  }
</script>

<div class="p-4 w-96">
  <input
    type="text"
    bind:value={stackTitle}
    placeholder="Stack Title"
    class="w-full text-xl"
  />
  <div class="h-4" />
  {#if stack.length === 0}
    <div>
      <div class="text-gray-500">No items in stack</div>
    </div>
  {:else}
    <div class="flex flex-col">
      <RenderStackItem
        item={stack[0]}
        restOfStack={stack.slice(1)}
        onClickComplete={(index) => {
          completeTaskAtIndex(index);
        }}
      />
    </div>
  {/if}
  <div class="h-2" />

  <div class="h-8" />

  <div class="flex items-center gap-2 -m-4 p-4 bg-gray-100">
    <input
      on:keypress={async (e) => {
        if (e.key === "Enter") {
          addItemToStack();
        }
      }}
      bind:value={newTitle}
      placeholder="New goal..."
      class="border transition rounded-sm border-gray-400 focus:border-black outline-none px-2 py-1"
    />
    <button
      on:click={addItemToStack}
      disabled={!newTitle}
      class="border px-2 py-1 bg-gray-800 hover:bg-gray-700 transition text-white rounded-sm disabled:bg-gray-400"
    >
      Add
    </button>
  </div>
</div>
