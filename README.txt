Run these commands:

npm install

npx expo start -c

Press a for Android.

////----------------Pokemon App - Technical Submission-------------/////////
I have completed the task and focused on making the app scalable and high-performance. Below are the key implementations:
•	State Management with RTK Query: I used RTK Query instead of standard Redux for data fetching. This handles caching automatically, reducing unnecessary API calls and keeping the app fast.
•	Performance Tuning:
o	To ensure zero lag while scrolling, I memoized the PokemonCard component using React.memo.
o	I also optimized the FlatList with specific props like initialNumToRender and removeClippedSubviews to manage memory efficiently.
•	Logic for Pagination: I implemented an offset-based pagination system that loads 10 items at a time. This keeps the initial load light and provides a smooth infinite scroll experience.
•	Dynamic UI & Theming:
o	The sidebar (Drawer) is completely dynamic; it fetches types from the API rather than being hardcoded.
o	I added a Type-based coloring system where each card’s theme changes according to the Pokémon's primary type.
•	Network Optimization: I added logic to abort pending API requests when a user switches tabs or categories quickly. This prevents "race conditions" and saves network bandwidth.
•	UX Features: Included a toggle for Grid and List views, pull-to-refresh, and used high-quality official artwork for a premium look.
Tech Stack: React Native, TypeScript, Redux Toolkit, React Navigation.


