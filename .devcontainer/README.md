# Dev Container

This Dev Container provides a Node.js 20 development environment for peptide-site, a Next.js, React, TypeScript, and Tailwind CSS application.

It includes Git, Python 3 with pip, and pre-commit so the repository's JavaScript and Python tooling scripts can run in the container.

## Getting started

1. Install the VS Code Dev Containers extension.
2. Open this repository in VS Code.
3. Choose **Dev Containers: Reopen in Container** from the Command Palette.

After the container is created, its setup command runs `npm install` and `pre-commit install`. You can then use the project scripts, such as `npm run dev`, `npm run build`, and `npm run lint`, from the integrated terminal.

The container workspace is `/workspaces/peptide-site` and commands run as the non-root `vscode` user.
