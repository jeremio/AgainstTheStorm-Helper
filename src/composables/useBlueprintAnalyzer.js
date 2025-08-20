export function useBlueprintAnalyzer(gameData) {

  const analyzeBlueprint = (buildingKey, biomeKey, selectedSpecies, currentBuildings, availableRainwater) => {
    const building = gameData.value.buildings[buildingKey]
    const biome = gameData.value.biomes[biomeKey]

    let analysis = {
      score: 0,
      reasoning: [],
      details: {
        speciesBonus: 0,
        resourceAvailability: 0,
        needsFulfillment: 0,
        productionValue: 0,
        prerequisiteFulfillment: 0,
        existingFulfillment: 0,
        rainwaterBonus: 0,
        inheritBonus: 0,
        fertileSoilBonus: 0,
        fertileUsefulnessScore: 0,
        isFarmUseless: 0,
      },
    }

    if (!building || !biome) {
      analysis.reasoning.push('❌ Missing building or biome data')
      return analysis
    }

    // Base score
    analysis.score = 0

    // 1) Exclusivity
    if (building.exclusivity && building.exclusivity !== '') {
      if (!selectedSpecies.includes(building.exclusivity)) {
        analysis.score = -1000
        analysis.details.exclusivityCheck = -1000
        analysis.reasoning.push(`❌ Cannot build: Exclusive to ${gameData.value.species[building.exclusivity]?.name}`)
        return analysis
      }
    }

    // 1.1) Houses
    if (building.category == 'housing') analysis.score = 70

    // 1.2) Farms
    if (building.category == 'farming') {
      const fertileBonus = analyzeFertileSoilBonus(building, biome, currentBuildings)
      analysis.details.fertileSoilBonus = fertileBonus
      analysis.reasoning.push(`<li>+${fertileBonus}: fertile soil is ${biome.fertile_soil} in ${biome.name}`)
      analysis.score += fertileBonus
    }

    // 1.3) Do you have a farm while choosing another farm?
    if (building.category == 'farming') {
      const farmExistsPoints = isFarmWhileFarmingBuildingExists(building, biome, currentBuildings)
      analysis.details.fertileSoilBonus = farmExistsPoints
      analysis.reasoning.push(`<li>+${farmExistsPoints}: fertile soil can already be used by other buildings`)
      analysis.score += farmExistsPoints
    }

    // 1.4) Farms usefulness
    if (building.category == 'farming') {
      const fertileUsefulnessScore = analyzeFertileSoilUsefulness(building, biome, currentBuildings)
      if (fertileUsefulnessScore != 0) {
        analysis.details.fertileUsefulnessScore = fertileUsefulnessScore
        analysis.reasoning.push(`<li>+${fertileUsefulnessScore} produces useful products for existing buildings`)
        analysis.score += fertileUsefulnessScore
      }
    }

    // 1.5) Greenhouses
    if (building.category == 'farming') {
      if (building.name == 'Clay Pit' && !availableRainwater.includes('clearance')) {
        analysis.score += -50
        analysis.details.isFarmUseless = -50
        analysis.reasoning.push(`<li>-50 lacking the required water to produce in this building`)
      }

      if (building.name == 'Greenhouse' && !availableRainwater.includes('drizzle')) {
        analysis.score += -50
        analysis.details.isFarmUseless = -50
        analysis.reasoning.push(`<li>-50 lacking the required water to produce in this building`)
      }
    }

    // 2) Species specialization bonus
    selectedSpecies.forEach((speciesKey) => {
      const species = gameData.value.species[speciesKey]
      if (species?.specialization_bonus && Array.isArray(building?.specialization_bonus)) {
        building.specialization_bonus.forEach((buildingSpec) => {
          if (species.specialization_bonus.includes(buildingSpec)) {
            analysis.score += 15
            analysis.details.speciesBonus += 15
            analysis.reasoning.push(`<li>+15: ${species.name} specialize in ${buildingSpec}`)
          }
        })
      }
    })

    // 3) Resource availability
    const resourceScore = analyzeResourceAvailability(building, biome)
    analysis.score += resourceScore
    analysis.details.resourceAvailability = resourceScore
    if (resourceScore > 0) analysis.reasoning.push(`<li>+${resourceScore}: Resource availability in biome`)
    else if (resourceScore < 0) analysis.reasoning.push(`<li>${resourceScore}: Resource constraints`)

    // 4) Needs fulfillment
    const needsScore = analyzeNeedsFulfillment(building, selectedSpecies)
    analysis.score += needsScore
    analysis.details.needsFulfillment = needsScore
    if (needsScore > 0) analysis.reasoning.push(`<li>+${needsScore}: Fulfills species needs`)

    // 4.5) Service fulfillment
    const serviceScore = analyzeServiceFulfillment(building, selectedSpecies)
    analysis.score += serviceScore
    analysis.details.serviceFulfillment = serviceScore
    if (serviceScore > 0) analysis.reasoning.push(`<li>+${serviceScore}: Fulfills species service`)

    // 5) Production value
    const productionScore = analyzeProductionValue(building)
    analysis.score += productionScore
    analysis.details.productionValue = productionScore
    if (productionScore > 0) analysis.reasoning.push(`<li>+${productionScore}: High production value`)

    // 6) Prerequisite fulfillment
    const prereqScore = analyzeBuildingNeedsFulfilledByExisting(building, currentBuildings)
    analysis.score += prereqScore
    if (prereqScore !== 0) {
      analysis.reasoning.push(`<li>+${prereqScore}: Inputs can be produced by existing buildings`)
    }
    analysis.details.prerequisiteFulfillment = prereqScore

    // 7) Existing Building Recipe fulfillment
    const existingScore = analyzeExistingNeedsFulfilledByBuilding(building, currentBuildings)
    analysis.score += existingScore
    if (existingScore !== 0) {
      analysis.reasoning.push(`<li>+${existingScore}: Outputs can be used by existing buildings`)
    }
    analysis.details.existingFulfillment = existingScore

    // 8) Recipe / production bonus
    const recipeScore = analyzeRecipeBonus(building, currentBuildings)
    analysis.score += recipeScore
    analysis.details.recipeBonus = recipeScore
    if (recipeScore > 0) {
      analysis.reasoning.push(`<li>+${recipeScore}: Building contributes useful production`)
    }

    // 9) Rainwater bonus
    const rainwaterScore = analyzeRainwaterMatch(building, availableRainwater)
    analysis.score += rainwaterScore
    analysis.details.rainwaterBonus = rainwaterScore
    if (rainwaterScore > 0) {
      analysis.reasoning.push(`<li>+${rainwaterScore}: Available rainwater`)
    }

    // 10) Inherit bonus
    const inheritBonus = getInheritBonus(building.name)
    if(inheritBonus > 0) {
        analysis.score += inheritBonus
        analysis.reasoning.push(`<li>+${inheritBonus}: Inherit bonus`)
    }

    return analysis
  }

  const getInheritBonus = (buildingName) => {
    const bonuses = {
        'Academy': 20, 'Bath House': 20, 'Clan Hall': 30, 'Feast Hall': 10,
        'Forum': 10, 'Guild House': 10, 'Holy Guild House': 20, 'Holy Market': 10,
        'Holy Temple': 20, 'Market': 10, 'Monastery': 20, 'Tavern': 30,
        'Advanced Rain Collector': 60
    };
    return bonuses[buildingName] || 0;
  }

  const analyzeResourceAvailability = (building, biome) => {
    let score = 0
    let recipeKeys = []
    if (Array.isArray(building?.recipes)) {
      recipeKeys = building.recipes
    } else if (building?.recipes && typeof building.recipes === 'object') {
      recipeKeys = Object.keys(building.recipes)
    }

    if (recipeKeys.length === 0) return score

    const abundant = Array.isArray(biome?.abundant_resources) ? biome.abundant_resources : []
    const common = Array.isArray(biome?.common_resources) ? biome.common_resources : []
    const rare = Array.isArray(biome?.rare_resources) ? biome.rare_resources : []
    const nodes = Array.isArray(biome?.nodes) ? biome.nodes : []

    recipeKeys.forEach((recipeKey) => {
      let recipe = gameData.value.recipes?.[recipeKey]

      if (building.category == 'resource_acquisition') {
        if (nodes.includes(recipeKey)) {
          score += 50
        }
      }

      if (building.category == 'production' && recipe?.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          const options = Array.isArray(ingredient.options) ? ingredient.options : []
          if (options.length === 0) return

          if (options.some((r) => abundant.includes(r))) score += 10
          if (options.some((r) => common.includes(r))) score += 5
          if (options.every((r) => rare.includes(r))) score += 2
        })
      }
    })
    return score
  }

  const analyzeNeedsFulfillment = (building, selectedSpecies) => {
    let score = 0
    const recipes = Array.isArray(building?.recipes) ? building.recipes : []
    const needsFulfillment = {
      porridge: ['porridge'], biscuits: ['biscuits'], pie: ['pie'], jerky: ['jerky'],
      pickled_goods: ['pickled_goods'], skewers: ['skewers'], paste: ['paste'],
      coats: ['coats'], boots: ['boots'], religion: ['incense'], treatment: ['tea'],
      education: ['scrolls'], luxury: ['wine'], brawling: ['training_gear'], leisure: ['ale'],
    }

    selectedSpecies.forEach((speciesKey) => {
      const species = gameData.value.species[speciesKey]
      species?.needs?.forEach((need) => {
        const fulfillers = needsFulfillment[need]
        if (!fulfillers) return
        recipes.forEach((recipeKey) => {
          const recipe = gameData.value.recipes[recipeKey]
          if (recipe?.output && fulfillers.includes(recipe.output.item)) {
            score += 20
          }
        })
      })
    })
    return score
  }

  const analyzeServiceFulfillment = (building, selectedSpecies) => {
    let score = 0
    const serviceTypes = Array.isArray(building?.service_type) ? building.service_type : []

    selectedSpecies.forEach((speciesKey) => {
        const species = gameData.value.species[speciesKey]
        species?.needs?.forEach((need) => {
            if (serviceTypes.includes(need)) {
                score += 20
            }
        })
    })
    return score
  }

  const analyzeProductionValue = (building) => {
    let score = 0
    const recipes = Array.isArray(building?.recipes) ? building.recipes : []
    const valueMap = {
      planks: 50, bricks: 30, fabric: 30, pack_of_luxury_goods: 15, pack_of_trade_goods: 15,
      tools: 10, wildfire_essence: 10, amber: 10, pack_of_building_materials: 10,
      pack_of_provisions: 10, training_gear: 10, parts: 10, pipes: 10,
      oil: 5, coal: 5,
    }

    recipes.forEach((recipeKey) => {
      const recipe = gameData.value.recipes[recipeKey]
      const item = recipe?.output?.item
      if (!item) return

      score += valueMap[item] || 0
      if (recipeKey.includes('3star')) score += 10
    })
    return score
  }

  const analyzeBuildingNeedsFulfilledByExisting = (newBuilding, currentBuildings) => {
    let score = 0
    if (!newBuilding.recipes?.length) return 0;

    newBuilding.recipes.forEach((recipeKey) => {
      const recipe = gameData.value.recipes?.[recipeKey];
      if (!recipe?.ingredients) return;

      recipe.ingredients.forEach((ingredient) => {
        const options = ingredient.options || [];
        const canBeProduced = options.some((resource) =>
          currentBuildings.some((buildingKey) =>
            gameData.value.buildings[buildingKey]?.recipes?.some(
              (existingRecipeKey) => gameData.value.recipes?.[existingRecipeKey]?.output?.item === resource
            )
          )
        );
        if (canBeProduced) score += 5;
      });
    });
    return score;
  }

  const analyzeExistingNeedsFulfilledByBuilding = (newBuilding, currentBuildings) => {
      let score = 0;
      if (!newBuilding.recipes?.length) return 0;

      const newOutputs = newBuilding.recipes.map((rKey) => gameData.value.recipes?.[rKey]?.output?.item).filter(Boolean);

      currentBuildings.forEach((buildingKey) => {
          const existing = gameData.value.buildings[buildingKey];
          if (!existing?.recipes) return;

          existing.recipes.forEach((recipeKey) => {
              const recipe = gameData.value.recipes?.[recipeKey];
              if (!recipe?.ingredients) return;

              recipe.ingredients.forEach((ingredient) => {
                  const options = ingredient.options || [];
                  if (options.some((opt) => newOutputs.includes(opt))) {
                      const isCurrentlyBlocked = !currentBuildings.some((otherKey) => {
                          if (otherKey === buildingKey) return false;
                          const otherBuilding = gameData.value.buildings[otherKey];
                          return otherBuilding?.recipes?.some((otherRecipeKey) =>
                              options.includes(gameData.value.recipes?.[otherRecipeKey]?.output?.item)
                          );
                      });
                      score += isCurrentlyBlocked ? 8 : 5;
                  }
              });
          });
      });
      return score;
  }

  const analyzeRecipeBonus = (building, currentBuildings) => {
    let score = 0
    const outputs = (building.recipes || []).map((rKey) => gameData.value.recipes[rKey]?.output?.item).filter(Boolean)

    outputs.forEach((outputItem) => {
      let maxStar = -1
      currentBuildings.forEach((bKey) => {
        const b = gameData.value.buildings[bKey]
        if (!b?.recipes) return

        b.recipes.forEach((rKey) => {
          const recipe = gameData.value.recipes[rKey]
          if (recipe?.output?.item === outputItem) {
            const starMatch = rKey.match(/(\d)star$/)
            const stars = starMatch ? parseInt(starMatch[1], 10) : 1
            maxStar = Math.max(maxStar, stars)
          }
        })
      })

      const buildingStar = building.recipes.reduce((star, rKey) => {
        const recipe = gameData.value.recipes[rKey]
        if (recipe?.output?.item === outputItem) {
          const starMatch = rKey.match(/(\d)star$/)
          return Math.max(star, starMatch ? parseInt(starMatch[1], 10) : 1)
        }
        return star
      }, 0)

      if (maxStar === -1) score += 20
      else if (buildingStar <= maxStar) score -= 20
      else score += 10
    })
    return score
  }

  const analyzeRainwaterMatch = (building, availableRainwater) => {
    if (!building?.rain_engine) return 0
    return availableRainwater.includes(building.rain_engine) ? 10 : 0
  }

  const analyzeFertileSoilBonus = (building, biome, currentBuildings) => {
    const soilLevel = biome.fertile_soil?.[0] || 'common';
    const soilMultiplier = { abundant: 1.5, common: 1.0, rare: 0.5 }[soilLevel] || 1.0;
    return 40 * soilMultiplier;
  }

  const isFarmWhileFarmingBuildingExists = (building, biome, currentBuildings) => {
    let score = 0
    currentBuildings.forEach((bKey) => {
      const cb = gameData.value.buildings[bKey]
      if (cb.category == 'farming') score -= 40
    })
    return score
  }

  const analyzeFertileSoilUsefulness = (building, biome, currentBuildings) => {
    let score = 0
    building.recipes.forEach((rKey) => {
      const match = rKey.match(/^(.+?)_(\d)star$/)
      if (!match) return

      const product = match[1]
      const stars = parseInt(match[2], 10)
      let isUseful = false
      currentBuildings.forEach((bKey) => {
        const cb = gameData.value.buildings[bKey]
        cb.recipes?.forEach((recipeKey) => {
          const recipe = gameData.value.recipes[recipeKey]
          if (!recipe?.ingredients) return
          recipe.ingredients.forEach((ingredient) => {
            if (ingredient.options?.includes(product)) {
              isUseful = true
            }
          })
        })
      })

      if (isUseful) {
        score += 20 * stars
      }
    })
    return score
  }

  const calculateOptimalBlueprint = (config) => {
    let blueprintOptions = config.blueprintOptions.filter(Boolean);

    if (blueprintOptions.length === 0) {
        const excluded = [...config.currentBuildings];
        blueprintOptions = Object.keys(gameData.value.buildings)
            .filter(key => !excluded.includes(key) && !gameData.value.buildings[key].name.match(/Holy|Hallowed|Flawless/));
    }

    if (!config.biome || config.selectedSpecies.length !== 3) {
      return { error: 'Please select a biome and exactly 3 species.' }
    }

    const results = blueprintOptions.map((blueprint) => {
      const analysis = analyzeBlueprint(blueprint, config.biome, config.selectedSpecies, config.currentBuildings, config.availableRainwater)
      return {
        building: blueprint,
        score: analysis.score,
        reasoning: analysis.reasoning,
        details: analysis.details,
      }
    })

    results.sort((a, b) => b.score - a.score)
    return { results }
  }

  return { calculateOptimalBlueprint }
}
