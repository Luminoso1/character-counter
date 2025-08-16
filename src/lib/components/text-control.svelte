<script>
	import { fly } from 'svelte/transition'
	import infoIcon from '../assets/info.svg'
	import { analyzer } from '../stores/text-analyzer'
	import Checkbox from './checkbox.svelte'

	const { text, characters, words, shouldExcludeSpaces } = analyzer

	let limit = $state(300)
	let hasLimit = $state(false)
	let error = $derived(hasLimit && $characters >= limit)
	let time = $derived.by(() => {
		let speed = 200 // words per minute
		return ($words / speed).toFixed(1)
	})
</script>

<section>
	<textarea
		spellcheck="false"
		name="text"
		id="text"
		placeholder="Start typing here… (or paste your text)"
		class="text-preset-3 active-shadow mb-3 min-h-52 w-full resize-none rounded-xl bg-neutral-100 p-5 text-neutral-700 outline-0 focus:outline-2 focus:outline-purple-500 dark:bg-neutral-800 dark:text-neutral-200"
		class:error
		bind:value={
			() => $text,
			(v) => {
				$text = error ? v.slice(0, limit + (v.length - 1 - $characters)) : v
			}
		}
	></textarea>

	{#if error}
		<div class="mb-4 flex items-center gap-2" in:fly={{ y: 20 }}>
			<img src={infoIcon} alt="information icon" />
			<p class="text-orange-800">
				Limit reached! Your text must not exceed {limit} characters.
			</p>
		</div>
	{/if}

	<div class="flex flex-col justify-between gap-3 md:h-8 md:flex-row md:items-center">
		<div class="flex flex-col gap-x-6 gap-y-3 md:flex-row">
			<Checkbox name="exclude-spaces" bind:checked={$shouldExcludeSpaces}>Exclude Spaces</Checkbox>

			<Checkbox name="has-limit" bind:checked={hasLimit}>Set Character Limit</Checkbox>

			{#if hasLimit}
				<input
					type="number"
					name="limit"
					id="limit"
					bind:value={limit}
					class="w-[6ch] rounded-md border-[1.5px] border-neutral-600 px-3 py-1"
					in:fly={{ x: -10, duration: 300 }}
					out:fly={{ x: 10, duration: 200 }}
				/>
			{/if}
		</div>

		<p>Approx. reading time: {time} minute</p>
	</div>
</section>
