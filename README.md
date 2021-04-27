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
- Background texture was also implemented but was removed. It is still commented in code and can be enabled easily.
- Killing the enemies will generate stars to increase score. The boss will generate 2 stars whereas others will generate only 1.
- Killing all enemies or health == 0 triggers game over.
- After game end, all the elements / functionality stops except the player. It can still roam around. 
- To remove everything after game over (Removing free roam as explained in above point) just uncomment loop in line 31 in index.js.
- Different game over backgrounds for loss and win. 

### Keys
- WASD standard movements
- Space to shoot missiles.