<script>
	import Logo from '/logo.svg'
	import Sun from '../assets/sun.svg'
	import Moon from '../assets/moon.svg'
	import { theme } from '../stores/theme'
	import { fade } from 'svelte/transition'
</script>

<header>
	<div class="mt-5 flex items-center justify-between lg:mt-8">
		<div class="flex items-center gap-3">
			<img src={Logo} alt="Charater counter logo" />
			<h2 class="text-preset-2">Character Counter</h2>
		</div>

		<button
			onclick={() => theme.toggle()}
			class="grid size-11 cursor-pointer place-content-center rounded-lg bg-neutral-100 dark:bg-neutral-700"
		>
			{#key $theme}
				<div in:fade={{ duration: 200 }}>
					<img src={$theme === 'dark' ? Sun : Moon} alt="Theme icon" />
				</div>
			{/key}
		</button>
	</div>
</header>
