# Sky-Force

Libraries required:
- three.js

## Instructions to start
- To load 3D models we cannot run on browsers due to security policy issues (CORS issues).
- Therefore http server is setup.

- First install required libraries by:

```
npm install
```
- Run the following program where index.html is present:
```
npm start
```

- If Firefox is not preferred then:
    - npm start and close the firefox window.
    - Open http://localhost:3000/ on preferred browser.

- If it doesnt load, just reload the window or change the browser.

## Technicalities

- Fully responsive = `onWindowResize()` function is used in index.js
- Camera is located on (0,-y,+z). It is to avoid making the game look 2D. 
