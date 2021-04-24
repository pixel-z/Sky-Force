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
    if (keyCode == 87 && player.position.y <= 100) {
        player.position.y += ySpeed;
    } if (keyCode == 83 && player.position.y >= -20) {
        player.position.y -= ySpeed;
    } if (keyCode == 65 && player.position.x >= -120) {
        player.position.x -= xSpeed;
    } if (keyCode == 68 && player.position.x <= 120) {
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

// loading models   --------------------------
let player;
let enemy1, enemy2, enemy3;
let p1 = loadModel('models/player.glb').then(result => {  player = result.scene; });
let p2 = loadModel('models/enemy.glb').then(result => {  enemy1 = result.scene; });
let p3 = loadModel('models/enemy.glb').then(result => {  enemy2 = result.scene; });
let p4 = loadModel('models/enemy.glb').then(result => {  enemy3 = result.scene; });
objectList = [p1,p2,p3,p4];

//if all Promises resolved 
Promise.all(objectList).then(() => {
    player.position.set(0,0,0);
    player.rotation.x = 1.5;
    player.scale.set(6,6,6);

    enemy1.position.set(0,180,0);
    enemy1.scale.set(10,10,20);
    enemy1.rotation.y = 1.6;
 
    enemy2.position.set(100,150,0);
    enemy2.scale.set(10,10,20);
    enemy2.rotation.y = 1.6;

    enemy3.position.set(-100,130,0);
    enemy3.scale.set(10,10,20);
    enemy3.rotation.y = 1.6;

    //add model to the scene
    scene.add(player);
    scene.add(enemy1);
    scene.add(enemy2);
    scene.add(enemy3);
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