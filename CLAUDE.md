# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StarterKit is a starter kit that provides a quick start for Next.js projects and includes a structured layout and reusable widgets.

## Tools & Configuration

- **Stack**: TypeScript + Next.js 16 + App Router
- **Architecture**: Feature-based
- **State Management**: Zustand
- **Local Storage**: LocalStorage + SessionStorage
- **Path alias**: `@/*` maps to `web/src/*`.
- **UI Language**: Turkish
- **Styling**: Tailwind CSS v4 + shadcn/ui + Lucide Icons + React-icons

## Project Structure

Next.js project lives in `web/` subdirectory (not repo root). All AI agents must follow this and [nextjs-coder.md](ai/nextjs-coder.md) instructions.
