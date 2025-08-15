<script lang="ts">
	import { analyzer } from '../stores/text-analyzer'
	const { lettersMapped } = analyzer
	let isCompress = $state(true)

	let density = $derived.by(() => {
		return isCompress ? $lettersMapped.slice(0, 5) : $lettersMapped
	})
</script>

{#snippet progress(letter: string, count: number, percentage: number)}
	<article class="flex items-center gap-2">
		<span class="size-6">{letter}</span>
		<progress value={percentage}></progress>
		<span>{count} ({(percentage * 100).toFixed(2)}%)</span>
	</article>
{/snippet}

<section>
	<h3 class="text-preset-2">Letter Density</h3>

	<div class="mt-5 space-y-3">
		{#if $lettersMapped.length}
			{#each density as letter (letter)}
				{@const { key, count, percentage } = letter}
				{@render progress(key, count, percentage)}
			{/each}
		{:else}
			<p>No characters found. Start typing to see letter density.</p>
		{/if}

		{#if $lettersMapped.length > 5}
			<button
				class="flex cursor-pointer items-center gap-2"
				onclick={() => (isCompress = !isCompress)}
			>
				<span>
					{#if isCompress}
						Show more
					{:else}
						Show less
					{/if}
				</span>
				<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
					<path
						d={isCompress ? 'M10 4L6 8L2 4' : 'M2 8L6 4L10 8'}
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}
	</div>
</section>
