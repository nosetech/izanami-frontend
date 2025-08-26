# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 React frontend application for Izanami, built with TypeScript and Material-UI. The project uses Apollo Client for GraphQL API communication, with code generation for type-safe GraphQL operations.

## Development Commands

```bash
# Development server (with Turbopack)
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Linting and formatting
yarn lint
yarn format
yarn format:check

# Testing
yarn test
yarn test:updateSnapshot

# GraphQL code generation
yarn codegen
```

## Architecture

### Core Technologies
- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Material-UI (MUI)** v7 with Emotion styling
- **Apollo Client** for GraphQL with Next.js integration
- **GraphQL Code Generator** for type-safe operations
- **Axios** with axios-hooks for REST API calls
- **React Hook Form** with Yup validation

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Component hierarchy following atomic design:
  - `atoms/` - Basic UI components (Button, Image, etc.)
  - `molecules/` - Simple component combinations
  - `organisms/` - Complex components (AppBar, Footer, Logo)
  - `templates/` - Page layout templates (BaseLayout, Login)
- `src/graphql/` - GraphQL client configuration and generated types
- `src/hooks/` - Custom React hooks including API hooks
- `src/theme/` - MUI theme configuration with custom breakpoints
- `src/types/` - TypeScript type definitions

### Key Features

#### GraphQL Integration
- Apollo Client with Next.js SSR support
- Code generation from GraphQL schema to TypeScript
- Generated types in `src/graphql/generated/components.ts`
- GraphQL operations in `src/graphql/query/` as `.graphql` files

#### Authentication
- Cookie-based session management via `useLogin` hook
- Session endpoint at `/session` for login
- User data stored in cookies with secure settings

#### Theming
- Custom MUI theme with Japanese locale support
- Custom breakpoints: mobile, tablet, laptop, desktop
- Extended palette with custom colors (alert, base, foreground)
- Roboto font family

#### Component Architecture
- Atomic design pattern for component organization
- BaseLayout template with optional footer
- Responsive design with custom Material-UI breakpoints

## Environment Configuration

The project requires a `.env.local` file with:
- `NEXT_PUBLIC_GRAPHQL_URI` - GraphQL API endpoint

## Testing

- Jest with Next.js integration
- Testing Library for React component testing
- Snapshot testing enabled
- Tests in `__tests__/` directory

## Code Generation

Run `yarn codegen` after:
- Adding new GraphQL operations in `src/graphql/query/`
- Changes to the GraphQL schema
- Setting up the GraphQL endpoint in environment variables