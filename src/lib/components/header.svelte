<script>
	import Logo from '/logo.svg'
	import Sun from '../assets/sun.svg'
	import Moon from '../assets/moon.svg'
	import { theme } from '../stores/theme'
	import { fade } from 'svelte/transition'
</script>

<header>
	<div class="mt-5 flex items-center justify-between lg:mt-8">
		<figure class="flex items-center gap-3">
			<img src={Logo} alt="Charater counter logo" />
			<figcaption class="text-preset-2">Character Counter</figcaption>
		</figure>

		<button
			type="button"
			onclick={() => theme.toggle()}
			class="grid size-11 cursor-pointer place-content-center rounded-lg bg-neutral-100 dark:bg-neutral-700"
		>
			{#key $theme}
				<img src={$theme === 'dark' ? Sun : Moon} alt="Theme icon" in:fade={{ duration: 200 }} />
			{/key}
		</button>
	</div>
</header>
