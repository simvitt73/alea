# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MathALÉA is a French mathematics exercise generator for K-12 education. It's a Svelte/TypeScript application that generates randomized math exercises with support for interactive elements, LaTeX rendering, and multiple export formats.

## Development Commands

### Core Development
```bash
npm install          # Install dependencies (use pnpm if preferred)
npm run dev          # Start development server (generates JSON first)
npm start            # Alias for dev
npm run build        # Production build with tests
npm run buildRam     # Build with increased memory (4GB)
npm run forceBuild   # Build without running tests
```

### Testing
```bash
npm run test:unit           # Run unit tests
npm run test:src           # Run source tests
npm run test:e2e           # Run all E2E tests
npm run test:e2e:dev       # Run E2E tests in watch mode
npm run testExercice       # Test individual exercise
```

### Code Quality
```bash
npm run lint            # Lint JS/TS files in exercices folder
npm run lintSvelte      # Lint Svelte components
npm run check           # TypeScript/Svelte type checking
npm run transpile       # Compile TypeScript (outputs to journal.log)
```

### Data Generation
```bash
npm run makeJson        # Generate referential JSON files (required before build/dev)
npm run updateMenu      # Alias for makeJson
```

## Architecture Overview

### Core Structure
- **src/exercices/**: Exercise classes organized by grade level (6e, 5e, 4e, 3e, 2e, 1e)
- **src/modules/**: Shared mathematical utilities and classes
- **src/components/**: Svelte UI components
- **src/lib/**: Core application logic and utilities
- **src/json/**: Generated referential data files

### Key Classes
- **Exercice.ts**: Base class for all exercises with extensive configuration options
- **ExerciceSimple.ts**: Simplified exercises for single questions
- **mathalea.ts**: Core application logic, exercise loading, and URL handling
- **Grandeur.ts**: Mathematical units and quantities handling

### Exercise System
Exercises follow a class-based pattern inheriting from `Exercice`:
- Each exercise has configurable parameters (`sup`, `sup2`, etc.)
- Support for interactive vs. static modes
- LaTeX and HTML rendering capabilities
- Auto-correction and QCM (multiple choice) support
- Randomization with reproducible seeds

### Data Flow
1. Exercises are loaded dynamically by UUID
2. Parameters applied from URL or user interface
3. Questions generated with seeded randomization  
4. Content rendered with KaTeX for math expressions
5. Interactive elements handled via custom components

## Build System

Uses Vite with:
- Manual chunking for large dependencies
- Svelte compilation with TypeScript support
- Bundle analysis via rollup-plugin-visualizer
- Dynamic imports for exercise loading

## Pre-commit Hooks

The project uses git-precommit-checks with rules for:
- Console.log detection (non-blocking warning)
- Merge conflict markers (blocking)
- TODO/FIXME markers (non-blocking warning)

## Testing Strategy

Multi-layered testing approach:
- **Unit tests**: Individual function/class testing
- **E2E tests**: Full application workflow testing
- **Consistency tests**: Exercise parameter validation
- **Interactivity tests**: Interactive component verification
- **PDF export tests**: Document generation validation

## Key Considerations

- All math content supports French and Swiss French (fr-CH) localization
- Exercise randomization must be reproducible via seeds
- Interactive exercises require different handling than static ones
- LaTeX compatibility crucial for mathematical expressions
- Large codebase requires careful memory management during builds