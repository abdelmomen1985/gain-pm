# AGENTS.md

## Project Overview

This is a React + TypeScript + Vite project for GAIN Medical Marketing's content workflow management. It uses Tailwind CSS for styling, shadcn/ui components, and drag-and-drop functionality with @hello-pangea/dnd.

## Build/Lint/Preview Commands

```bash
npm run dev          # Start dev server on port 4804
npm run build        # Build production bundle (tsc -b && vite build)
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

**Note**: No test framework is currently configured. When adding tests, update this file with test commands, especially for running single tests.

## Import Style

- Use named imports from local files: `import { Button } from './components/ui/button'`
- Use `@/` alias for src directory: `import { Task } from '@/types'`
- Use `type` keyword for type-only imports: `import type { Task, Status } from './types'`
- React imports: `import { useState } from 'react'` (default import `import * as React` only when needed)
- Third-party libraries: Follow their documentation patterns
- Order: React imports first, then third-party, then local imports (absolute, then relative)

## File Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── *.tsx         # Feature components
├── types.ts          # TypeScript type definitions
├── utils.ts          # Utility functions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Naming Conventions

- **Components**: PascalCase (e.g., `TaskCard`, `MetricsDisplay`, `CreateTask`)
- **Component files**: PascalCase matching export (e.g., `TaskCard.tsx`)
- **Utility/type files**: camelCase (e.g., `utils.ts`, `types.ts`)
- **Variables/Functions**: camelCase (e.g., `tasks`, `setTasks`, `handleMoveTask`)
- **Constants**: camelCase (e.g., `initialTasks`, `teamColors`)
- **Types/Interfaces**: PascalCase (e.g., `Task`, `Status`, `TaskCardProps`)
- **Enum-like types**: PascalCase string literal unions (e.g., `type Status = 'draft' | 'visuals'`)

## TypeScript Patterns

- Use `export type` for type aliases and `export interface` for object shapes
- Define types in `types.ts` for shared types
- Component props: Define interface with `Props` suffix (e.g., `TaskCardProps`)
- Use generics with type constraints: `<T extends string>`
- Avoid `any`; use `unknown` for truly unknown types
- Use optional chaining `?.` and nullish coalescing `??` operators
- Type imports explicitly marked: `import type { ... }`

## Component Patterns

- Functional components with hooks
- Props interface defined above component
- Default exports: `export default function ComponentName()`
- Named exports for utilities: `export const helper = () => {}`
- Use `forwardRef` when ref forwarding is needed
- Display names for components: `Button.displayName = "Button"`
- Event handlers: Prefix with `handle` (e.g., `handleMoveTask`, `handleDragEnd`)
- State setters: Prefix with `set` (e.g., `setTasks`, `setSelectedTeam`)

## Styling Guidelines

- Use Tailwind CSS for all styling
- Use `cn()` utility (from `@/lib/utils`) for className merging
- UI components use `class-variance-authority` (cva) for variants
- shadcn/ui pattern for reusable components
- Color classes: `text-gray-800`, `bg-blue-100`, etc.
- Spacing: Use consistent scale (1=4px, 2=8px, 3=12px, 4=16px)
- Responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

## State Management

- React hooks for local state: `useState`, `useEffect`
- Lifting state up to parent when shared between siblings
- Immutable updates: Use spread operator `[...tasks]` or `.map()`
- Date handling: Native `Date` objects
- IDs: Generate with `Math.random().toString(36).substr(2, 9)`

## Error Handling

- Early returns for invalid conditions: `if (!destination) return`
- Type guards with runtime checks when needed
- Optional chaining for potential undefined values
- No try-catch patterns currently used; add when implementing async operations

## Linting & Code Quality

- ESLint configuration in `eslint.config.js`
- Extends: `js.configs.recommended`, `tseslint.configs.recommended`
- React hooks and refresh plugins enabled
- UI components ignore `react-refresh/only-export-components` rule
- All TypeScript files in src must pass linting

## When Adding Features

1. Define types in `types.ts` if they're shared
2. Create components in `src/components/`
3. Use existing UI components from `src/components/ui/`
4. Follow naming conventions and file structure
5. Run `npm run lint` before committing
6. Test dev server: `npm run dev`
