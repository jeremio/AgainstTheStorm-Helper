# Against the Storm Blueprint Optimizer - Features Guide

## Overview

The Against the Storm Blueprint Optimizer is a web-based tool designed to help players make optimal building choices based on their current settlement configuration. This tool analyzes your biome, selected species, current buildings, and available blueprint options to provide data-driven recommendations.

## Core Features

### 🏗️ Settlement Configuration

#### Biome Selection

- **Purpose**: Select your current biome to optimize recommendations based on resource availability
- **Supported Biomes**:
  - Royal Woodlands
  - Cursed Royal Woodlands
  - Ashen Thicket
  - Bamboo Flats
  - Coastal Grove
  - Coral Forest
  - Scarlet Orchard
  - Marshlands
  - Sealed Forest
  - Rocky Ravine

#### Species Management

- **Species Limit**: Exactly 3 species must be selected (game requirement)
- **Available Species**: Humans, Beavers, Lizards, Harpies, Foxes, Frogs, Bats
- **Visual Feedback**: Selected species are highlighted with golden borders
- **Smart Validation**: Prevents selection of more than 3 species

#### Current Buildings Tracker

- **Building Categories**: Production, Housing, Service, Farming, Resource Acquisition
- **Search Functionality**: Filter buildings by name for easy selection
- **Real-time Updates**: Building list updates based on species selection (exclusivity rules)
- **Pre-selection**: Essential buildings (Field Kitchen, Makeshift Post, Crude Workstation) are automatically selected

#### Rainwater Type Selection

- **Water Types**: Clearance Water, Drizzle Water, Storm Water
- **Impact**: Affects scoring for rain-dependent buildings
- **Multiple Selection**: Can select multiple water types available in your settlement

### 📊 Blueprint Analysis System

#### Blueprint Options

- **Option Count**: Up to 4 different blueprint choices can be compared
- **Smart Filtering**: Excludes basic buildings and current buildings from selection
- **Fallback Mode**: If no blueprints selected, analyzes all available buildings

#### Scoring Algorithm

The optimizer uses a comprehensive scoring system that evaluates multiple factors:

**Base Scoring Categories:**

- **Species Synergy** (up to +45 points): Buildings that match your species' specializations
- **Resource Availability** (variable): Higher scores for buildings that use abundant biome resources
- **Needs Fulfillment** (up to +60 points): Buildings that produce goods required by your species
- **Production Value** (up to +50 points): Priority given to essential goods like planks, bricks, fabric
- **Building Synergy** (up to +15 points): Buildings that complement your existing infrastructure
- **Biome Compatibility** (variable): Bonuses for buildings that excel in your biome
- **Rainwater Matching** (+10 points): Buildings that can use your available water types

**Special Bonuses:**

- **Housing Priority** (+70 points): Housing always receives high priority
- **Farming Analysis**: Complex evaluation of fertile soil usage and productivity
- **Inheritance Bonuses**: Pre-configured bonuses for specific high-value buildings
- **Recipe Quality**: Higher star recipes receive additional points

### 🎯 Recommendation Engine

#### Results Display

- **Ranked Results**: All options ranked from highest to lowest score
- **Score Visualization**: Color-coded scores (green for excellent, yellow for good, red for poor)
- **Detailed Reasoning**: Each recommendation includes specific reasons for the score
- **Score Breakdown**: Transparent scoring with detailed point attribution

#### Smart Recommendations

- **Context Awareness**: Considers your current progression and needs
- **Balanced Scoring**: Weighs multiple factors for well-rounded recommendations
- **Exclusivity Handling**: Automatically filters out buildings unavailable to your species
- **Prerequisites Check**: Evaluates if you can effectively use recommended buildings

## User Interface Features

### 🎨 Modern Design

- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Easy on the eyes with gradient backgrounds
- **Visual Hierarchy**: Clear organization with color-coded sections
- **Smooth Interactions**: Hover effects and transitions for better UX

### 🔧 Usability Features

- **Real-time Validation**: Immediate feedback on configuration errors
- **Progress Indicators**: Shows selection progress (e.g., "Selected: 2/3 species")
- **Error Messages**: Clear, helpful error messages with suggested solutions
- **Building Search**: Quick filter functionality for large building lists

### 📱 Accessibility

- **Mobile Optimized**: Touch-friendly interface for mobile gaming
- **Keyboard Navigation**: Full keyboard support for power users
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **High Contrast**: Sufficient color contrast for visibility

## Advanced Features

### 🧮 Calculation Engine

- **Multi-factor Analysis**: Considers 10+ different scoring factors
- **Dynamic Weighting**: Scoring adjusts based on settlement state
- **Performance Optimized**: Fast calculations even with complex configurations
- **Extensible**: Easy to add new scoring criteria

### 🔄 Data Management

- **JSON-based Data**: Easy to update game data as the game evolves
- **Modular Architecture**: Separate data files for easy maintenance
- **Version Control**: Track changes to game balance over time

### 🌐 Integration

- **Social Links**: Direct links to creator's content (YouTube, Discord, Twitch, Kick)
- **Community Focused**: Built to support the Against the Storm community
- **Open Development**: Transparent development process

## Tips for Best Results

### Configuration Tips

1. **Be Accurate**: Ensure your biome and species selection match your actual game state
2. **Update Buildings**: Keep your current buildings list updated for best recommendations
3. **Consider Water**: Don't forget to select your available rainwater types
4. **Think Ahead**: Consider what you'll need in the next few minutes, not just immediately

### Interpretation Guidelines

1. **High Scores (80+)**: Excellent choices that align well with your settlement
2. **Medium Scores (60-79)**: Good options that may work depending on your strategy
3. **Low Scores (<60)**: Generally avoid unless you have specific strategic reasons
4. **Consider Context**: Sometimes a lower-scored building might be needed for specific goals

### Strategic Usage

1. **Early Game**: Focus on essential production and housing
2. **Mid Game**: Look for synergies between buildings and species bonuses
3. **Late Game**: Optimize for specific victory conditions and advanced resources
4. **Emergency**: Use for quick decisions when under time pressure

## Future Enhancements

### Planned Features

- **Save/Load Configurations**: Save common settlement setups
- **Historical Tracking**: Track your building choices over time
- **Advanced Filters**: More granular control over recommendations
- **Export Functionality**: Share configurations with other players
- **Seasonal Updates**: Regular updates matching game patches

### Community Features

- **User Feedback**: Integration for community suggestions
- **Strategy Guides**: Built-in tips from experienced players
- **Meta Analysis**: Tracking of popular building combinations
- **Tournament Mode**: Specialized recommendations for competitive play

The Against the Storm Blueprint Optimizer continues to evolve based on community feedback and game updates, ensuring it remains the most accurate and helpful tool for settlement optimization.
