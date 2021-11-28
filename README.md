# Tic Tac Toe Kata

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project use [Enzyme](https://enzymejs.github.io/enzyme/) for testing 

This project respects TDD. All commits contain either a test + the code make it pass or refactoring without adding a new feature. 
All commits should always be green with tests and build without errors. 

Rules of Tic Tac Toe : 

 - X always goes first.
 - Players cannot play on a played position.
 - Players alternate placing X’s and O’s on the board until either:
   - One player has three in a row, horizontally, vertically or diagonally
   - All nine squares are filled.
 - If a player is able to draw three X’s or three O’s in a row, that player wins.
 - If all nine squares are filled and neither player has three in a row, the game is a draw.
 
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
