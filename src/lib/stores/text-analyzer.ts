import { derived, writable } from 'svelte/store'
import { getDensity } from '../utils'

class TextAnalyzerStore {
	text = writable('')
	shouldExcludeSpaces = writable(false)

	characters = derived([this.text, this.shouldExcludeSpaces], ([$text, $shouldExcludeSpaces]) => {
		let normalized = $text
		if ($shouldExcludeSpaces) {
			normalized = $text.replace(/\s+/g, '')
		}
		return normalized.length
	})
	words = derived(this.text, ($text) => {
		const normalized = $text.match(/\b[a-zA-Z]+\b/g)
		return normalized ? normalized.length : 0
	})

	sentences = derived(this.text, ($text) => {
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
