function loadModel(url) {
    return new Promise((resolve) => {
        new THREE.GLTFLoader().load(url, resolve);
    });
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  // (FOV, aspect ratio, near, far)

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );  // whole window
document.body.appendChild( renderer.domElement );

// renders axes
// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);

// light
const light = new THREE.AmbientLight(0x404040); // white light
light.position.set( 0, 0, 80)
scene.add( light );

// cube
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;

// loading models   --------------------------
function loadModel(url) {
    return new Promise(resolve => {
      new THREE.GLTFLoader().load(url, resolve);
    });
}
let model1, model2, model3;
let p1 = loadModel('models/paper_plane.glb').then(result => {  model1 = result.scene.children[0]; });
// let p2 = loadModel('models/paper_plane.glb').then(result => {  model2 = result.scene.children[0]; });
// let p3 = loadModel('models/paper_plane.glb').then(result => {  model3 = result.scene.children[0]; });

objectList = [p1,p2,p3];

//if all Promises resolved 
Promise.all(objectList).then(() => {
    model1.position.set(0,0,0);
 
    //add model to the scene
    scene.add(model1);
});

// --------------------------

function animate() {
    requestAnimationFrame( animate );
    update();
    renderer.render( scene, camera );
};

function update() {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
}

animate();