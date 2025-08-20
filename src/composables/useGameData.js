import { readonly, ref } from 'vue'

export function useGameData() {
  const gameData = ref({
    biomes: {},
    species: {},
    buildings: {},
    recipes: {},
    resources: {},
  })

  const dataLoadStatus = ref({
    biomes: false,
    species: false,
    buildings: false,
    recipes: false,
    resources: false,
  })

  const error = ref(null)

  async function loadJSON(filename) {
    // All data is in the public folder
    const response = await fetch(`/js/data/${filename}`)
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}: ${response.statusText}`)
    }
    return await response.json()
  }

  async function loadGameData() {
    error.value = null
    try {
      const files = {
        biomes: 'biomes.json',
        species: 'species.json',
        buildings: 'buildings.json',
        recipes: 'recipes.json',
        resources: 'resources.json',
      }

      const results = await Promise.allSettled(
        Object.entries(files).map(([key, filename]) =>
          loadJSON(filename).then(data => ({ key, data })),
        ),
      )

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const { key, data } = result.value
          gameData.value[key] = data
          dataLoadStatus.value[key] = true
          console.log(`✅ ${files[key]} loaded`)
        }
        else {
          console.error(`❌ Loading failed`, result.reason)
          error.value = result.reason.message
        }
      })
    }
    catch (err) {
      console.error('Error loading game data:', err)
      error.value = err.message
    }
  }

  return {
    gameData: readonly(gameData),
    dataLoadStatus: readonly(dataLoadStatus),
    error: readonly(error),
    loadGameData,
  }
}
