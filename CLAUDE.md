# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint and auto-fix issues
npm run lint

# Format code with Prettier
npm run format
```

## Project Architecture

This is a Vue 3 portfolio site project using:
- **Vue 3** with Composition API
- **Vite** as build tool with Vue DevTools plugin
- **Vue Router** for SPA routing
- **Pinia** for state management
- **ESLint + Prettier** for code quality

### Key Directories
- `src/views/` - Page components (HomeView, AboutView)
- `src/components/` - Reusable Vue components
- `src/router/` - Vue Router configuration with lazy loading for About page
- `src/stores/` - Pinia stores using Composition API style
- `src/assets/` - CSS and static assets

### Path Alias
- `@` is aliased to `src/` directory

## Project Requirements

The project aims to build a portfolio site with:
1. **Profile Section** - Name, bio, skills, social links
2. **Blog Functionality** - List and detail pages with Markdown support
3. **Responsive Design** - Desktop, tablet, mobile breakpoints
4. **Animations** - Scroll-triggered fade-in effects using Intersection Observer

### Planned Tech Stack
- **Styling**: Tailwind CSS or SCSS with CSS Modules (to be decided)
- **CMS**: Contentful, Strapi, or microCMS for blog content
- **Hosting**: Netlify or Vercel
- **Dark Mode**: LocalStorage-based theme switching

## Current State

The project is a fresh Vue 3 template with basic routing between Home and About pages. The portfolio features described in REQUIREMENTS.md need to be implemented.

## Vue.js Best Practices

### Component Design
- Use **Composition API** with `<script setup>` for new components
- Keep components small and focused on a single responsibility
- Use **props** for parent-to-child communication and **emits** for child-to-parent
- Define prop types and required properties explicitly
- Use `v-model` for two-way binding when appropriate

### State Management
- Use **Pinia** stores for global state
- Keep component-specific state local using `ref()` or `reactive()`
- Use `computed()` for derived state instead of methods
- Avoid directly mutating props

### Performance Optimization
- Use `v-show` for frequently toggled elements, `v-if` for conditional rendering
- Implement lazy loading for routes and heavy components
- Use `v-once` for static content that won't change
- Apply `key` attributes in `v-for` loops using unique, stable identifiers
- Use `shallowRef()` and `shallowReactive()` for large objects when deep reactivity isn't needed

### Code Organization
- Use TypeScript or JSDoc for better type safety
- Keep template, script, and style in single-file components (SFCs)
- Use `<style scoped>` or CSS modules to avoid style conflicts
- Extract reusable logic into composables (files in `src/composables/`)
- Follow naming conventions: PascalCase for components, kebab-case for events

### Reactivity Best Practices
- Prefer `ref()` for primitives, `reactive()` for objects
- Use `toRefs()` when destructuring reactive objects
- Avoid using `reactive()` on arrays, use `ref([])` instead
- Use `watchEffect()` for simple reactive dependencies, `watch()` for specific control

### Template Best Practices
- Use template refs sparingly, prefer declarative approaches
- Avoid complex logic in templates, use computed properties
- Use `v-bind="$attrs"` for attribute inheritance when needed
- Implement proper form validation and error handling
- Use semantic HTML elements for better accessibility

### Async Operations
- Use `async/await` in lifecycle hooks and methods
- Handle loading and error states properly
- Implement proper cleanup in `onUnmounted()` for subscriptions/timers
- Use `Suspense` component for async component loading when appropriate