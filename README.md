# CultureSpace
### Discover your world through culture.

CultureSpace is a cultural discovery platform powered by Qloo's cultural intelligence API. It helps users explore artists, movies, restaurants, and travel destinations, while allowing them to create project briefs and discover cultural references relevant to their creative goals.

**Live Demo:** https://culturespace.devs.li

## The Problem

Cultural discovery is fragmented across different platforms. Finding relevant artists, films, restaurants, and destinations that match specific interests or creative goals can require searching multiple sources independently.

## The Solution

CultureSpace brings multiple areas of cultural discovery into one platform. It uses Qloo's cultural intelligence to help users explore cultural entities and discover references based on their interests and project context.

## Key Features

- **Artist Discovery:** Explore artists and musical interests.
- **Movie Discovery:** Discover films and cinematic references.
- **Travel Discovery:** Explore destinations, attractions, and cultural places.
- **Restaurant Discovery:** Discover restaurants and dining experiences.
- **Creative Project Briefs:** Define projects using details such as location, audience, interests, atmosphere, and goals.
- **Context-Aware Research:** Use project information to guide cultural discovery and organise relevant results.

## Qloo Integration

CultureSpace integrates Qloo's API through two core endpoints:

- **`/v2/tags`:** Discover cultural tags relevant to a category or research context.
- **`/v2/insights`:** Retrieve cultural entities using discovered tags and category-specific parameters.

The application processes returned data using category-specific filtering, deduplication, fallback handling, and relevance-ranking logic to organise results around the available context.

CultureSpace implements a multi-step, context-aware research pipeline. Query selection, filtering, and ranking are handled by the application; the current implementation does not claim fully autonomous, open-ended agent planning.

## Technology Stack

- Next.js and React
- TypeScript
- Tailwind CSS
- Node.js
- Qloo API
- Vercel

## Links

- **Live Demo:** https://culturespace.devs.li
- **Source Code:** https://github.com/theonlysamad7/culturespace
- **Qloo API Documentation:** https://docs.qloo.com/reference/qloo-llm-hackathon-developer-guide

## License

See the repository's LICENSE file for licensing terms.
