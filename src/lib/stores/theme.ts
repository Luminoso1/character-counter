import { writable } from 'svelte/store'

type Theme = 'light' | 'dark'

const DEFAULT_THEME: Theme = 'light'
const THEME_KEY = 'theme'

function getInitialTheme(): Theme {
	const local = localStorage.getItem(THEME_KEY) as Theme
	if (local) return local

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark'
	}

	return DEFAULT_THEME
}

function createThemeStore() {
	const { set, subscribe, update } = writable(getInitialTheme())

	function toggle() {
		update((t) => (t === 'dark' ? 'light' : 'dark'))
	}

	function resetToSystem() {
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		set(systemTheme)
	}

	return {
		subscribe,
		set: (theme: Theme) => {
			if (['light', 'dark'].includes(theme)) {
				set(theme)
			}
		},
		toggle,
		resetToSystem
	}
}

export const theme = createThemeStore()

theme.subscribe((currrent) => {
	localStorage.setItem(THEME_KEY, currrent)

	document.documentElement.classList.toggle('dark', currrent === 'dark')

	// mobile
	const metaThemeColor = document.querySelector('meta[name="theme-color"]')
	if (metaThemeColor) {
		metaThemeColor.setAttribute('content', currrent === 'dark' ? '#0f172a' : '#ffffff')
	}
})
