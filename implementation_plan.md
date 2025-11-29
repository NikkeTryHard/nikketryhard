# Implementation Plan: React Documentation UI Rebuild

## 1. Component Architecture

The application will be restructured to focus on the documentation of the `Dither` component.

### Directory Structure

```
src/
  components/
    layout/
      Sidebar.tsx       # Fixed left navigation
      DocLayout.tsx     # Main layout wrapper
    demo/
      DitherDemo.tsx    # Interactive playground (Preview + Controls + Code)
      ControlPanel.tsx  # Inputs for Dither props
    ui/
      Tabs.tsx          # Simple Tab component
      CodeBlock.tsx     # For displaying code snippets
      PropsTable.tsx    # Documentation table
      Badge.tsx         # "New", "Updated" badges
  lib/
    utils.ts            # Utility functions (cn)
  App.tsx               # Main entry point assembling the page
```

### Key Components

1.  **`DocLayout`**:

    - Manages the overall grid: Fixed Sidebar (Left) + Scrollable Main Content (Right).
    - Responsive design (Sidebar hidden/drawer on mobile).

2.  **`Sidebar`**:

    - Renders navigation items from a data structure.
    - **Header**: Logo/GitHub button.
    - **Categories**: Introduction, Installation, MCP, Index.
    - **Groups**: Animated Text, etc.
    - **Badges**: Support for "New", "Updated" indicators.

3.  **`DitherDemo`**:
    - **State**: Holds the configuration for the `Dither` component.
    - **Tabs**: "Preview" (Canvas) vs "Code" (Usage snippet).
    - **Right Panel**: `ControlPanel` to adjust state.

## 2. State Management

We will use local React state in `DitherDemo` to manage the interactive properties of the `Dither` component.

**Interface:**

```typescript
interface DitherConfig {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}
```

**Flow:**

1.  `DitherDemo` initializes state with default values.
2.  Passes values to `<Dither />` for rendering.
3.  Passes values and setters to `<ControlPanel />`.
4.  Generates the code snippet string dynamically based on current state for the "Code" tab.

## 3. Styling Strategy

- **Theme**: Dark mode by default (`bg-black text-zinc-200`).
- **Sidebar**:
  - `w-64 fixed inset-y-0 left-0 border-r border-white/10 bg-black z-50`.
  - Scrollable content area within sidebar.
- **Main Content**:
  - `pl-64` (on desktop).
  - `max-w-5xl mx-auto py-12 px-8`.
- **Typography**: `inter` or system sans. Headings `font-bold tracking-tight`.
- **Accents**: White/Zinc for neutral.

## 4. Dependencies

**Existing:**

- `react`, `react-dom`
- `@react-three/fiber`, `three`
- `lucide-react`
- `tailwindcss`

**To Add:**

- `clsx`, `tailwind-merge`: For robust class composition.

## 5. Step-by-Step Implementation Plan

### Phase 1: Setup & Utilities

1.  Install `clsx` and `tailwind-merge`.
2.  Create `src/lib/utils.ts` for class merging helper (`cn`).

### Phase 2: UI Components

3.  Create `src/components/ui/Badge.tsx`.
4.  Create `src/components/ui/CodeBlock.tsx` (simple styled `pre/code`).
5.  Create `src/components/ui/Tabs.tsx`.
6.  Create `src/components/ui/PropsTable.tsx`.

### Phase 3: Layout & Navigation

7.  Create `src/components/layout/Sidebar.tsx` with the specified categories/groups.
8.  Create `src/components/layout/DocLayout.tsx`.

### Phase 4: Dither Demo & Controls

9.  Create `src/components/demo/ControlPanel.tsx` (Inputs, Sliders, Toggles).
10. Create `src/components/demo/DitherDemo.tsx` (Integrates `Dither`, `ControlPanel`, and `Tabs`).

### Phase 5: Assembly & Content

11. Update `src/App.tsx`:
    - Implement the full documentation structure.
    - **Introduction**: Brief description.
    - **Installation**: CLI/Manual tabs.
    - **Usage**: Basic example.
    - **Interactive Demo**: The `DitherDemo` component.
    - **Props Table**: Detailed API reference.
    - **Dependencies**: List peer dependencies.
    - **Footer**: Copyright/Links.

### Phase 6: Polish

12. Verify responsive behavior.
13. Ensure dark mode aesthetics are consistent.
