# Contributing to peptide-site

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab?logo=python&logoColor=white)](https://www.python.org/)
[![CI](https://github.com/ACFHarbinger/peptide-site/actions/workflows/ci.yml/badge.svg)](https://github.com/ACFHarbinger/peptide-site/actions/workflows/ci.yml)

Thank you for your interest in contributing! This document covers setup, style, and the PR process for this repository.

---

## Table of Contents

- [Contributing to peptide-site](#contributing-to-peptide-site)
  - [Table of Contents](#table-of-contents)
  - [1. Getting Started](#1-getting-started)
    - [1.1 Prerequisites](#11-prerequisites)
    - [1.2 Clone and bootstrap](#12-clone-and-bootstrap)
  - [2. Development Setup](#2-development-setup)
  - [3. Code Style Guidelines](#3-code-style-guidelines)
  - [4. Git Workflow](#4-git-workflow)
  - [5. Pull Request Process](#5-pull-request-process)
  - [6. Testing Requirements](#6-testing-requirements)
  - [7. Issue Reporting](#7-issue-reporting)

---

## 1. Getting Started

### 1.1 Prerequisites

- Git, [Node.js](https://nodejs.org/) >= 20, `npm`.
- For the [`git/`](../git/) automation workspace or [`scripts/make_vials.py`](../scripts/make_vials.py): `python` (>= 3.11) + [`uv`](https://github.com/astral-sh/uv).
- `pre-commit` (`pip install pre-commit && pre-commit install`).

### 1.2 Clone and bootstrap

```bash
git clone https://github.com/ACFHarbinger/peptide-site.git
cd peptide-site
npm install
npm run dev
```

## 2. Development Setup

The site lives at the repo root (`app/` once scaffolded, `src/`) as a single Next.js app; [`git/`](../git/) is a separate `uv`-managed Python workspace for repo automation (`cd git && uv sync`).

## 3. Code Style Guidelines

Follow the rules in [`.agent/rules/`](../.agent/rules/), primarily [`typescript_react.md`](../.agent/rules/typescript_react.md). Python in [`git/`](../git/) is linted with ruff (blocking) and mypy (advisory) via `.pre-commit-config.yaml` — run `pre-commit run --all-files` before pushing.

## 4. Git Workflow

- Branch from `main`: `feature/<short-description>` or `fix/<short-description>`.
- Keep commits focused; write commit messages that explain *why*, not just *what*.
- Rebase onto `main` before opening a PR.

## 5. Pull Request Process

1. Fill out the [PR template](../.github/PULL_REQUEST_TEMPLATE.md) in full.
2. Ensure CI is green (`npm run lint && npm test && npm run build`).
3. Request review; address feedback with new commits (don't force-push during review).
4. Squash-merge once approved.

## 6. Testing Requirements

New components/logic get a Vitest unit test (`test/unit/`); new multi-component interactions get an integration test (`test/integration/`, using MSW for any network mocking); new user-facing flows get a Cypress spec (`test/cypress/e2e/`). See [`.agent/rules/test_writing.md`](../.agent/rules/test_writing.md).

## 7. Issue Reporting

Use the issue templates under [`.github/ISSUE_TEMPLATE/`](../.github/ISSUE_TEMPLATE/) — they help both humans and coding agents triage faster.
