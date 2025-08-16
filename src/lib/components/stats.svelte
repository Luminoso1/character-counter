<script lang="ts">
	import shape01 from '../assets/shape-01.svg'
	import shape02 from '../assets/shape-02.svg'
	import shape03 from '../assets/shape-03.svg'
	import { analyzer } from '../stores/text-analyzer'

	const { characters, words, sentences } = analyzer
</script>

{#snippet card(name: string, count: number, icon: string, CLASS: string)}
	<div
		class="{CLASS} relative overflow-hidden rounded-xl px-4 py-6 text-black *:relative *:z-10"
		style:background-image={`url("${icon}")`}
	>
		<span class="text-preset-1 block">{count.toString().padStart(2, '0')}</span>
		<p class="text-preset-3 mt-2">
			{name}
		</p>
	</div>
{/snippet}

<section class="mt-10 mb-6 grid gap-4 md:grid-cols-3">
	{@render card('Total Characters', $characters, shape01, 'bg-purple-400')}
	{@render card('Word Count', $words, shape02, 'bg-yellow-500')}
	{@render card('Sentence Count', $sentences, shape03, 'bg-orange-500')}
</section>

<style>
	div {
		background-repeat: no-repeat;
		background-position: top right -25px;
	}
</style>
