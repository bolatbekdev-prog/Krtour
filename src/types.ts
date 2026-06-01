/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TouristZone {
  id: string;
  name: string;
  category: "history" | "nature" | "culture" | "monument";
  shortDescription: string;
  fullDescription: string;
  historyProfessorTip: string; // Commentary from the history professor persona
  coordinates: [number, number]; // [latitude, longitude]
  distanceFromNukus: number; // in km
  bestSeason: string;
  accessibility: "easy" | "medium" | "hard";
  highlights: string[];
  imageUrl: string;
  audioGuideScript?: string; // Professor's short talk script
}

export interface JourneyRoute {
  id: string;
  title: string;
  description: string;
  difficulty: "Плевое дело" | "Приключение" | "Экспедиция";
  duration: string; // e.g. "1 день", "2 дня"
  routePoints: string[]; // List of TouristZone IDs in order
  color: string; // Theme color for drawing the route on map
}

export interface HeritageArtifact {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  originEra: string;
}
