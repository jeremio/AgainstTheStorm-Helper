<template>
  <div class="container">
    <header class="header">
      <h1>Inwector's Against the Storm Blueprint Optimizer</h1>
      <p>Choose the best blueprints for your settlement based on biome, species, and current buildings</p>
    </header>

    <div v-if="dataLoadError" class="data-status error">
      ❌ Error loading game data: {{ dataLoadError }}
    </div>
    <div v-else-if="!allDataLoaded" class="data-status">
      Loading game data...
    </div>
    <div v-else class="data-status loaded">
      ✅ Game data loaded successfully
    </div>

    <div class="main-content">
      <SettlementConfiguration
        :game-data="gameData"
        :data-loaded="allDataLoaded"
        @calculate="handleCalculation"
      />
      <RecommendationsDisplay
        :results="results"
        :error="calculationError"
        :game-data="gameData"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import RecommendationsDisplay from './components/RecommendationsDisplay.vue'
import SettlementConfiguration from './components/SettlementConfiguration.vue'
import { useBlueprintAnalyzer } from './composables/useBlueprintAnalyzer.js'
import { useGameData } from './composables/useGameData.js'

const { gameData, dataLoadStatus, error: dataLoadError, loadGameData } = useGameData()
const { calculateOptimalBlueprint } = useBlueprintAnalyzer(gameData)

const results = ref(null)
const calculationError = ref(null)

const allDataLoaded = computed(() => {
  return Object.values(dataLoadStatus.value).every(Boolean)
})

onMounted(loadGameData)

function handleCalculation(config) {
  console.log('Calculating with config:', config)
  calculationError.value = null
  results.value = null

  const { results: analysisResults, error } = calculateOptimalBlueprint(config)

  if (error) {
    calculationError.value = error
  }
  else {
    results.value = analysisResults
  }
}
</script>
