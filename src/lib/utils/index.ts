type Density = Map<string, { count: number; percentage: number }>

export const getDensity = (letters: Array<string>): Density => {
	const map: Density = new Map()
	const total = letters.length

	// count letters
	for (const letter of letters) {
		const upperLetter = letter.toUpperCase()
		const count = map.get(upperLetter)?.count || 0
		map.set(upperLetter, { count: count + 1, percentage: 0 })
	}

	// set percentage
	for (const [key, value] of map) {
		const percentage = value.count / total
		map.set(key, { count: value.count, percentage })
	}

	// sort by percentage
	const sorted = new Map([...map.entries()].sort((a, b) => b[1].percentage - a[1].percentage))

	return sorted
}
