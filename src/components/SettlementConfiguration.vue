<template>
  <div class="section">
    <h2 class="section-title">
      ️Settlement Configuration
    </h2>

    <!-- Biome Selection -->
    <div class="input-group">
      <label for="biome-select">Biome:</label>
      <select id="biome-select" v-model="config.biome">
        <option disabled value="">
          Select a biome...
        </option>
        <option v-for="(biome, key) in gameData.biomes" :key="key" :value="key">
          {{ biome.name }}
        </option>
      </select>
    </div>

    <!-- Species Selection -->
    <div class="input-group">
      <label>Species (select exactly 3):</label>
      <div class="species-selection">
        <div
          v-for="(species, key) in gameData.species"
          :key="key"
          class="species-item"
          :class="{ selected: config.selectedSpecies.includes(key) }"
          @click="toggleSpecies(key)"
        >
          <input type="checkbox" :checked="config.selectedSpecies.includes(key)" @change.stop="toggleSpecies(key)">
          <span>{{ speciesIcons[key] }} {{ species.name }}</span>
        </div>
      </div>
      <div class="species-counter">
        Selected: {{ config.selectedSpecies.length }}/3
      </div>
    </div>

    <!-- Rainwater Selection -->
    <div class="input-group">
      <label>Available Rainwater Types:</label>
      <div class="rainwater-selection">
        <label class="rainwater-option">
          <input v-model="config.availableRainwater" type="checkbox" value="clearance">
          <span>💧 Clearance</span>
        </label>
        <label class="rainwater-option">
          <input v-model="config.availableRainwater" type="checkbox" value="drizzle">
          <span>🌦️ Drizzle</span>
        </label>
        <label class="rainwater-option">
          <input v-model="config.availableRainwater" type="checkbox" value="storm">
          <span>⛈️ Storm</span>
        </label>
      </div>
    </div>

    <!-- Current Buildings -->
    <div class="input-group">
      <label for="building-filter">Current Buildings:</label>
      <input id="building-filter" v-model="buildingFilter" type="text" placeholder="Filter buildings...">
      <div class="buildings-list">
        <div v-for="(building, key) in filteredBuildings" :key="key" class="building-item">
          <input :id="`building-${key}`" v-model="config.currentBuildings" type="checkbox" :value="key">
          <label :for="`building-${key}`">{{ building.name }}</label>
        </div>
      </div>
    </div>

    <!-- Blueprint Options -->
    <div class="blueprint-options">
      <p>
        Blueprint Options:
        <span class="info-icon" title="If you pick no blueprints, all available buildings will be analyzed." />
      </p>
      <div v-for="i in 4" :key="i" class="blueprint-option">
        <label :for="`blueprint-${i}`">Option {{ i }}:</label>
        <select :id="`blueprint-${i}`" v-model="config.blueprintOptions[i - 1]">
          <option value="">
            Select a building...
          </option>
          <option v-for="(building, key) in availableBlueprintOptionsFor(i - 1)" :key="key" :value="key">
            {{ building.name }}
          </option>
        </select>
      </div>
    </div>

    <button class="calculate-btn" :disabled="!isReadyToCalculate" @click="$emit('calculate', config)">
      Calculate Best Choice
    </button>
  </div>
</template>

<script setup vapor lang="ts">
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps<{
  gameData: Record<string, any>
  dataLoaded: boolean
}>()

defineEmits(['calculate'])

const buildingFilter = ref('')

const config = reactive({
  biome: '',
  selectedSpecies: [],
  currentBuildings: [],
  availableRainwater: [],
  blueprintOptions: ['', '', '', ''],
})

const speciesIcons = {
  humans: '🧑',
  beavers: '🦫',
  lizards: '🦎',
  harpies: '🦅',
  foxes: '🦊',
  frogs: '🐸',
  bats: '🦇',
}

function toggleSpecies(speciesKey) {
  const index = config.selectedSpecies.indexOf(speciesKey)
  if (index > -1) {
    config.selectedSpecies.splice(index, 1)
  }
  else if (config.selectedSpecies.length < 3) {
    config.selectedSpecies.push(speciesKey)
  }
}

const filteredBuildings = computed(() => {
  const filterText = buildingFilter.value.toLowerCase()
  return Object.fromEntries(
    Object.entries(props.gameData.buildings || {})
      .filter(([_key, building]) => {
        // Exclusivity check
        if (building.species_exclusivity && !config.selectedSpecies.includes(building.species_exclusivity)) {
          return false
        }
        // Filter text check
        return building.name.toLowerCase().includes(filterText)
      }),
  )
})

// Watch for species changes to uncheck exclusive buildings
watch(() => config.selectedSpecies, (newSpecies, oldSpecies) => {
  const removedSpecies = oldSpecies.filter(s => !newSpecies.includes(s))
  if (removedSpecies.length > 0) {
    config.currentBuildings = config.currentBuildings.filter((buildingKey) => {
      const building = props.gameData.buildings[buildingKey]
      return !building || !building.species_exclusivity || newSpecies.includes(building.species_exclusivity)
    })
  }
}, { deep: true })

function availableBlueprintOptionsFor(index) {
  // Exclude buildings selected in OTHER dropdowns
  const otherSelectedBlueprints = config.blueprintOptions.filter((bp, i) => i !== index && bp)

  const excluded = new Set([
    // 'field_kitchen', 'makeshift_post', 'crude_workstation',
    ...config.currentBuildings,
    ...otherSelectedBlueprints,
  ])

  return Object.fromEntries(
    Object.entries(props.gameData.buildings || {})
      .filter(([key, building]) =>
        !excluded.has(key)
        && !building.name.match(/Holy|Hallowed|Flawless/),
      ),
  )
}

const isReadyToCalculate = computed(() => {
  return props.dataLoaded && config.biome && config.selectedSpecies.length === 3
})
</script>
