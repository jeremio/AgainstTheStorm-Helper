<template>
  <div class="section">
    <h2 class="section-title">
      📊 Recommendations
    </h2>
    <div id="results" class="results">
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div v-else-if="!results" class="loading">
        Configure your settlement and blueprint options, then click "Calculate Best Choice" to see recommendations.
      </div>
      <div v-else-if="results.length === 0" class="error">
        No valid blueprint options found.
      </div>
      <template v-else>
        <div
          v-for="(result, index) in results"
          :key="result.building"
          class="recommendation"
          :class="{ best: index === 0 && result.score > 0 }"
        >
          <h3>
            <span v-if="index === 0 && result.score > 0">🏆 </span>
            {{ gameData.buildings[result.building]?.name || result.building }}
            <span v-if="index === 0 && result.score > 0"> (Recommended)</span>
          </h3>
          <div class="score" :class="getScoreClass(result.score, maxScore)">
            Score: {{ result.score.toFixed(1) }}
          </div>
          <ul class="reasoning" v-html="result.reasoning.join('')" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup vapor>
import { computed } from 'vue'

const props = defineProps({
  results: {
    type: Array,
    default: null,
  },
  error: {
    type: String,
    default: null,
  },
  gameData: {
    type: Object,
    required: true,
  },
})

const maxScore = computed(() => {
  if (!props.results || props.results.length === 0)
    return 0
  return Math.max(...props.results.map(r => r.score))
})

function getScoreClass(score, max) {
  if (max === 0)
    return 'poor'
  const ratio = score / max
  if (ratio >= 0.8)
    return 'best'
  if (ratio >= 0.6)
    return 'good'
  return 'poor'
}
</script>

<style scoped>
/* Reasoning list styling */
.reasoning {
  padding-left: 20px; /* Indent list */
  list-style-type: none; /* Remove default bullets */
}
.reasoning :deep(li) {
  margin-bottom: 4px; /* Space between items */
}
.reasoning :deep(li::before) {
  content: '🔹'; /* Custom bullet */
  margin-right: 8px;
  color: #ffd700;
}
</style>
