# Vaultify

> Lightweight web-based utility for generating secure and unique UUIDs, passwords, MACs, and IPs.

- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Run](#Run)
- [Configuration](#Configuration)
- [Deployment](#Deployment)
- [License](#License)

## Prerequisites

- Knowledge of JavaScript/TypeScript, [Next.js](https://nextjs.org/), Git
- IDE ([VS Code](https://code.visualstudio.com/), WebStorm, ...)
- Package manager ([pnpm (recommended)](https://pnpm.io/installation), npm, ...)

## Installation

1. Go to the project folder: `cd vaultify/`
2. Install all dependecies: `pnpm install`
3. Copy `.env.example` to `.env` and update the properties accordingly
   - **Windows (CMD):** `copy .env.example .env`, **Linux/macOS:** `cp .env.example .env`

## Run

- Development server: `pnpm run dev`
- Production: `pnpm run build & pnpm run start`

## Configuration

| Description       | Values                 |
| ----------------- | ---------------------- |
| **Ports:**        | 3000                   |
| **Technologies:** | Next.js                |
| **URL:**          | http://localhost:3000/ |

## Deployment

| Description | Values                       |
| ----------- | ---------------------------- |
| **Server:** | Coolify                      |
| **URL:**    | https://vaultify.ksprptr.dev |

## License

> This software is developed by **Petr Kašpar** and is licensed under the MIT License.  
> For more details, please refer to the LICENSE file.
