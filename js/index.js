function onWindowResize() {
    // Camera frustum aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadModel(url) {
    return new Promise(resolve => {
      new THREE.GLTFLoader().load(url, resolve);
    });
}

function animate() {
    requestAnimationFrame( animate );
    update();
    renderer.render( scene, camera );
};

function update() {
    document.addEventListener("keydown", onDocumentKeyDown, false);

    

    score+=0.03
    scoreText.innerText = "Score:" + Math.floor(score);
    healthText.innerText = "Health:" + Math.floor(health);
}

// movement of player
function onDocumentKeyDown(event) {
    var xSpeed = 5;
    var ySpeed = 5;
    var keyCode = event.which;
    // WASD keys not arrow keys
    if (keyCode == 87) {
        player.position.y += ySpeed;
    } if (keyCode == 83) {
        player.position.y -= ySpeed;
    } if (keyCode == 65) {
        player.position.x -= xSpeed;
    } if (keyCode == 68) {
        player.position.x += xSpeed;
    }
};

// to make it responsive to changing size
window.addEventListener("resize", onWindowResize, false);

// init
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  // (FOV, aspect ratio, near, far)
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );  // whole window
// renderer.setClearColor( 0x4EABE5 );  // bg color
document.body.appendChild( renderer.domElement );

// //Load background texture
// const loader = new THREE.TextureLoader();
// loader.load('models/background.jpeg' , function(texture)
// {
//     scene.background = texture;  
// });

// renders axes (green = y-axis, red = x-axis, blue = z-axis)
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

// light
const color = 0xffffff, intensity = 1;
var light = new THREE.DirectionalLight(color, intensity);
light.position.set( 0, 0, 60)
scene.add( light );
light = new THREE.AmbientLight(0xffffff, 0.2);   // some light on every part
scene.add(light)

// // two lines
// geometry = new THREE.Geometry();
// geometry.vertices.push(
//     new THREE.Vector3(0, 0, -10),
//     new THREE.Vector3(0, 0, 10)
// );
// material = new THREE.LineBasicMaterial({
//     color: 0x6699FF, linewidth: 5
// });
// var line1 = new THREE.Line(geometry, material);
// scene.add(line1);

// loading models   --------------------------
let player;
let p1 = loadModel('models/player.glb').then(result => {  player = result.scene; });
objectList = [p1];

//if all Promises resolved 
Promise.all(objectList).then(() => {
    player.position.set(0,0,0);
    player.rotation.x = 1.5;
    player.scale.set(6,6,6);
 
    //add model to the scene
    scene.add(player);
});
// --------------------------

camera.position.y = -40;
camera.position.z = 100;
camera.lookAt(0,50,0);

var score = 0;
var scoreText = document.getElementById("score");
var health = 3;
var healthText = document.getElementById("health");

animate();