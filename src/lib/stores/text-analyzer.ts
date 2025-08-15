import { derived, writable } from 'svelte/store'
import { getDensity } from '../utils'

class TextAnalyzerStore {
	text = writable('')
	shouldExcludeSpaces = writable(false)

	characters = derived([this.text, this.shouldExcludeSpaces], ([$text, $shouldExludeSpaces]) => {
		let normalized = $text
		if ($shouldExludeSpaces) {
			normalized = $text.replace(/\s+/g, '')
		}
		return normalized.length
	})
	words = derived(this.text, ($text) => {
		const normalized = $text.split(/\b[a-zA-Z]+\b/g)
		return normalized.length - 1
	})

	sentencies = derived(this.text, ($text) => {
		const normalized = $text.match(/[^.!?]+[.!?]+/g) || []
		return normalized.length
	})

	lettersMapped = derived(this.text, ($text) => {
		const normalized = $text.replace(/[^a-zA-Z]/g, '').split('')

		const density = getDensity(normalized)

		return Array.from(density.entries()).map(([key, value]) => {
			return { key, ...value }
		})
	})
}

export const analyzer = new TextAnalyzerStore()
