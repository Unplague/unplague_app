# Unplague

A pandemic management game that inverts the mechanics of "Plague Inc." - instead of spreading a virus, you're trying to contain it and keep healthcare systems from being overwhelmed.

## Inspiration
2012 the game Plague Inc. was released by Ndemic. The player has the goal to wipe out the world with a virus. We turn the game principle around and thereby contribute to the playful sensitization of the general population for measures to contain the virus.

## How it works
In Unplague, the player starts with a few corona infection foci spread around the world. Based on rounds, decisions can or must be made which have an impact on the satisfaction of the population, the spread of the virus and the money available. The goal of the game is to keep the infection rate (percentage of infected compared to the total world population) below the 70% threshold as long as possible in order not to overtax the health care system. If this threshold is exceeded, the game ends. Unlike other games, Unplague does not offer the possibility of winning (eradication of the virus), which corresponds to reality. The main goal is to stretch the spread of the virus over time.

## Gameplay Insights
The Minimum Viable Product (MVP) includes a limited range of functions, which will be further developed and gradually added to after the #wirvvirus Hackathon is completed. During the course of the game, the player deals with the following questions, among others:

- How much do the numbers of infected people grow exponentially in one week?
- How does social distancing affect this growth?
- How does an initial restriction affect the satisfaction of the population?
- Get ready for the challenge: How long can you limit the infection rate to a maximum of 70%?

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v7 or higher) or yarn (v1.22 or higher)

> **Note:** This project supports both npm and yarn for local development. For deployment, npm is used by default (via `package-lock.json`) to ensure consistency across platforms. If you prefer yarn locally, run `yarn install` to generate your own `yarn.lock` file.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Unplague/unplague_app.git
cd unplague_app
```

2. Install dependencies:

**Using npm:**
```bash
npm install
```

**Or using yarn:**
```bash
yarn install
```

3. Start the development server:

**Using npm:**
```bash
npm start
```

**Or using yarn:**
```bash
yarn start
```

The application will open automatically in your browser at `http://localhost:3000`.

### Available Scripts

**With npm:**
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

**With yarn:**
- `yarn start` - Runs the app in development mode
- `yarn test` - Launches the test runner
- `yarn build` - Builds the app for production
- `yarn eject` - Ejects from Create React App (one-way operation)

## Built With

- **React 17** - UI Framework
- **TypeScript** - Type-safe JavaScript
- **Redux** - State Management
- **React-Leaflet 3** - Interactive maps
- **Sass** - CSS preprocessing
- **Turf.js** - Geospatial analysis

## Hackathon
This project was created during the #WirVsVirus Hackathon 2020.
- https://wirvsvirushackathon.org/
