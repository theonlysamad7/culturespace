# CultureSpace
### Discover your world through culture.

CultureSpace is a Qloo-powered cultural discovery platform that helps people explore artists, movies, restaurants, and travel destinations. It combines cultural intelligence with context-aware research to help users discover relevant cultural references for their interests and creative projects.

Beyond standalone discovery, CultureSpace allows users to develop structured project briefs and use project information to guide cultural research. The goal is to make cultural discovery more connected, contextual, and useful for creative exploration.

**Live Demo:** https://culturespace1.vercel.app

**Source Code:** https://github.com/theonlysamad7/culturespace

---

## The Problem

Cultural discovery is often fragmented across different platforms. Someone looking for music, films, restaurants, or destinations that match a particular taste may need to search several services independently.

The challenge becomes more significant when working on a creative project. Finding cultural references that fit a specific audience, location, atmosphere, or creative direction requires more than a collection of unrelated search results.

CultureSpace addresses this challenge by bringing multiple cultural discovery categories into one experience and using cultural intelligence to support more contextual exploration.

## Our Solution

CultureSpace uses Qloo's cultural intelligence API to discover and retrieve cultural entities across several categories. Users can explore cultural interests directly or provide additional context through a creative project brief.

The application uses category-specific research logic and, where available, project details to guide tag discovery, retrieve insights, organise results, and present relevant cultural references.

Rather than treating every request as an isolated search, CultureSpace aims to make cultural research more useful by considering the category and context behind the user's interests.

## Key Features

### 1. Artist Discovery
Explore artists and musical interests through Qloo-powered cultural discovery. This category helps users find artists and cultural references connected to their selected interests.

### 2. Movie Discovery
Discover films and cinematic references through category-specific research. The application uses relevant cultural signals to guide queries and organise the returned results.

### 3. Travel Discovery
Explore destinations, attractions, and culturally relevant places. Location and research context help guide discovery when this information is provided.

### 4. Restaurant Discovery
Discover restaurants and dining experiences through place-related insights and restaurant-specific filtering. This provides a dedicated experience for food and dining exploration.

### 5. Creative Project Briefs
Create a structured brief that describes a project and its creative direction. Depending on the information provided by the user, a brief can include details such as project type, location, audience, interests, budget, atmosphere, and goals.

The brief provides context that can help guide subsequent cultural research.

### 6. Context-Aware Cultural Research
CultureSpace uses the selected category and available project information to determine relevant research themes. It discovers cultural tags, queries Qloo for insights, and processes the returned entities to produce organised results.

### 7. Result Processing and Relevance
The application applies category-specific filtering, normalisation, deduplication, fallback handling, and application-level ranking to organise the results. These steps help reduce duplicate or unsuitable entries and make the returned information easier to explore.

---

## How CultureSpace Works

The application combines user input, Qloo's cultural intelligence API, and application-level research logic in a multi-step workflow.

### Step 1: Choose a Discovery Path
Users can explore a cultural category, such as artists, movies, travel, or restaurants, or begin by creating a creative project brief.

### Step 2: Establish the Research Context
The application collects the available information relevant to the selected category or project. This may include interests, location, audience, project goals, and other brief details.

### Step 3: Discover Relevant Cultural Tags
The server queries Qloo's `/v2/tags` endpoint to identify cultural tags relevant to the selected category and research context.

These tags provide additional cultural signals that can be used to guide the next stage of research.

### Step 4: Retrieve Cultural Insights
CultureSpace uses discovered tags and category-specific parameters to query Qloo's `/v2/insights` endpoint.

The endpoint returns cultural entities that the application can use for further exploration. The exact query parameters depend on the selected category and the information available.

### Step 5: Process the Results
The application processes the returned data through its research logic. This can include normalising entity data, filtering results by category, removing duplicates, handling fallback queries, and ranking findings against the available context.

### Step 6: Present the Findings
The application returns organised cultural references for users to explore. In the project workflow, these findings can support further research and creative decision-making.

**Implementation note:** CultureSpace currently implements a multi-step, context-aware research pipeline. Query selection, filtering, fallback handling, and ranking are application-level logic. The project does not claim fully autonomous, open-ended agent planning.

---

## Qloo API Integration

Qloo is central to CultureSpace's cultural discovery and research capabilities.

The application uses two core API endpoints:

- **`/v2/tags`** — Discovers cultural tags that can help identify relevant research signals.
- **`/v2/insights`** — Retrieves cultural entities based on query parameters, discovered tags, and category-specific requirements.

The research API coordinates these requests and processes the returned data before presenting results to the application.

CultureSpace adds its own research logic around the API, including category-specific query selection, result processing, filtering, deduplication, fallback handling, and relevance ranking.

This combination allows the application to use Qloo's cultural intelligence within a structured discovery and research experience.

**Qloo documentation:** https://docs.qloo.com/reference/qloo-llm-hackathon-developer-guide

---

## Technology Stack

- **Next.js** — Application framework and server-side functionality.
- **React** — User interface and interactive components.
- **TypeScript** — Application logic and type safety.
- **Tailwind CSS** — Interface styling.
- **Node.js** — Server-side JavaScript runtime.
- **Qloo API** — Cultural tags and insights for discovery and research.

---

## Project Links

- **Live Application:** https://culturespace1.vercel.app
- **GitHub Repository:** https://github.com/theonlysamad7/culturespace
- **Qloo API Documentation:** https://docs.qloo.com/reference/qloo-llm-hackathon-developer-guide

## License

CultureSpace is licensed under the GNU General Public License v3.0 (GPL-3.0). See the [LICENSE](./LICENSE) file for the complete license terms.
