<script lang="ts">
	import Header from './lib/components/header.svelte'
	import TextControl from './lib/components/text-control.svelte'
	import Stats from './lib/components/stats.svelte'
	import Density from './lib/components/density.svelte'
</script>

<div class="mx-auto w-full max-w-[990px] px-4 pb-10 sm:px-8 lg:px-0">
	<Header />

	<main>
		<h1
			class="text-preset-1 mx-auto mt-12 mb-10 max-w-xl text-center text-neutral-900 dark:text-neutral-100"
		>
			Analyze your text in real-time.
		</h1>

		<TextControl />

		<Stats />

		<Density />
	</main>
</div>
