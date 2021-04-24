// to make it responsive to changing size
function onWindowResize() {
    // Camera frustum aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

// init
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  // (FOV, aspect ratio, near, far)

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );  // whole window
document.body.appendChild( renderer.domElement );

//Load background texture
const loader = new THREE.TextureLoader();
loader.load('models/background.jpeg' , function(texture)
{
    scene.background = texture;  
});

// renders axes (green = y-axis, red = x-axis, blue = z-axis)
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

// light
const color = 0xffffff, intensity = 1;
var light = new THREE.DirectionalLight(color, intensity);
light.position.set( 0, 0, 60)
scene.add( light );

// loading models   --------------------------
function loadModel(url) {
    return new Promise(resolve => {
      new THREE.GLTFLoader().load(url, resolve);
    });
}
let model1, model2, model3;
let p1 = loadModel('models/player.glb').then(result => {  model1 = result.scene; });

objectList = [p1];

//if all Promises resolved 
Promise.all(objectList).then(() => {
    model1.position.set(0,0,0);
    model1.rotation.x = 1.5;
    model1.scale.set(20,20,20);
 
    //add model to the scene
    scene.add(model1);
});
camera.position.z = 400;
camera.lookAt(0,0,0);

// --------------------------

function animate() {
    requestAnimationFrame( animate );
    update();
    renderer.render( scene, camera );
};

function update() {
    // model1.rotation.x += 0.01
}

animate();