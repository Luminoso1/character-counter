<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'

	type Props = HTMLInputAttributes & {
		children: Snippet
	}

	let { children, checked = $bindable(), class: CLASS, ...rest }: Props = $props()
</script>

<label for={rest.name} class="flex cursor-pointer items-center gap-2 select-none">
	<input
		id={rest.name}
		type="checkbox"
		bind:checked
		{...rest}
		class="custom-checkbox border-[1.5px] border-neutral-900 dark:border-neutral-200"
	/>
	<span>{@render children()}</span>
</label>
