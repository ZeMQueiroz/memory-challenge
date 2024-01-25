# Memory Memy Game ReadMe

## Thinking Process

Below just the thinking process behind the project

### `Porject Setup`

Used `create-reat-app` for a quick setup
installed the `react-router-dom` for the necessary routing

### `Routing`

I've setup the three requested routes while also making a `ProtectedRoute` component to block guest sessions.

### `Authentication`

Made a simple form component that accepts a username input and with a simple submit button with no validations.

Starterd implementing the global state for the app, went with redux instead of Context for extra points.
Also had to deal with slices which was new to me, which was interesting since I've been working with separated actions and reducers.

### `Game Page and Utils`

Started thinking on the game logic with some mock data.

After a quick read into Pexels docs, I decided which query I was going to use and got `axios` to help with the request.

Used redux to manage the game pause and resume states and made a timer component that would satisfy the needs of the challenge.

Used `localStorage` to save and load game data when the page is refreshed and if the same user is sumbmited in the login, if the user is different a new game should start.

### `Highs Scores Modal`

Here I made the first mistake.
I've actually made a modal to render on top on the `/game` route instead of the `/game/scores`.
It made more sense to me that to make this why so only later in the development I would be aware of tat mistake and fix the routes.

Also initially I was storing the high scores on the redux store so they were wiped out on refresh.

Later on I fixed the modal to render on the appropriate route and set the high score to store on the `localStorage`

## Personal notes
