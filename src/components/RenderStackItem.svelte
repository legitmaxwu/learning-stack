<script lang="ts">
  import type { StackItem } from "../types";

  export let restOfStack: StackItem[] = [];
  export let index: number = 0;
  export let item: StackItem;
  export let onClickComplete: (indexCompleted: number) => void = () => {};
</script>

<div>
  <div>
    <div class="flex gap-1">
      <img
        src={item.tab.favIconUrl}
        class="w-4 h-4 rounded-md bg-gray-900"
        alt={item.tab.favIconUrl}
      />
      <a
        href={item.tab.url}
        class="hover:underline text-blue-600 visited:text-purple-700 truncate"
      >
        {item.tab.title}
      </a>
    </div>
    <div class="h-0.5" />
    <div class="border-l-2 border-gray-300 pl-2">
      <div class="text-md font-bold">
        {item.title}
        {#if restOfStack.length === 0}
          <span>
            <span class="text-gray-500">
              {" "}
              •
              {" "}
            </span>
            <button
              class="text-blue-600 hover:text-blue-400 transition"
              on:click={() => {
                onClickComplete(index);
              }}>Complete</button
            >
          </span>
        {/if}
      </div>
      <div class="h-2" />
      {#if restOfStack.length > 0}
        <svelte:self
          item={restOfStack[0]}
          restOfStack={restOfStack.slice(1)}
          {onClickComplete}
          index={index + 1}
        />
      {/if}
    </div>
  </div>
</div>
