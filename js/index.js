function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

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
    
    // gameOver
    if ((enemy1.position.z == -100 && enemy2.position.z == -100 && enemy3.position.z == -100) || health<=0) {
        // while(scene.children.length > 0){ 
        //     scene.remove(scene.children[0]); 
        // }

        var backColor;
        if (health<=0) backColor = 0xff3333;
        else backColor = 0x00cc7a;

        scene.background = new THREE.Color( backColor );
        var gameOverText = document.getElementById("over");
        gameOverText.innerHTML = "GAME OVER";
    }

    else 
    {
        var enemy_speed = 3;
        // enemy movement
        if (enemy_move_dir[0]==1) {
            enemy1.position.x+=enemy_speed
            if (enemy1.position.x+enemy_speed >= 120) enemy_move_dir[0]*=-1;
        }
        else {
            enemy1.position.x-=enemy_speed
            if (enemy1.position.x-enemy_speed <= -120) enemy_move_dir[0]*=-1;
        }

        if (enemy_move_dir[1]==1) {
            enemy2.position.x+=enemy_speed
            if (enemy2.position.x+enemy_speed >= 120) enemy_move_dir[1]*=-1;
        }
        else {
            enemy2.position.x-=enemy_speed
            if (enemy2.position.x-enemy_speed <= -120) enemy_move_dir[1]*=-1;
        }

        if (enemy_move_dir[2]==1) {
            enemy3.position.x+=enemy_speed
            if (enemy3.position.x+enemy_speed >= 120) enemy_move_dir[2]*=-1;
        }
        else {
            enemy3.position.x-=enemy_speed
            if (enemy3.position.x-enemy_speed <= -120) enemy_move_dir[2]*=-1;
        }

        // missiles
        for (let i = 0; i < missileArray.length; i++) {
            const missile = missileArray[i];
            missile.position.y += 2;
            if (missile.position.y > 250) {
                missile.scale.set(0,0,0);
                missileArray.splice(i,1);
            }

            // collision checks
            else{
                if (missile.position.x+25 <= enemy1.position.x+15 &&  missile.position.x+25 >= enemy1.position.x-15 &&
                    missile.position.y <= enemy1.position.y+1 && missile.position.y >= enemy1.position.y-1 ) 
                {
                    score += 30;
                    missile.scale.set(0,0);
                    missileArray.splice(i,1);
                    
                    enemy1.scale.set(0,0);
                    enemy1.position.set(-100,-100,-100);
                    makeStars();
                    makeStars();
                }
                else if (missile.position.x+25 <= enemy2.position.x+15 &&  missile.position.x+25 >= enemy2.position.x-15 &&
                    missile.position.y <= enemy2.position.y+1 && missile.position.y >= enemy2.position.y-1 ) {
                    score += 10;
                    missile.scale.set(0,0);
                    missileArray.splice(i,1);
                    
                    enemy2.scale.set(0,0);
                    enemy2.position.set(-100,-100,-100);
                    makeStars();
                }
                else if (missile.position.x+25 <= enemy3.position.x+15 &&  missile.position.x+25 >= enemy3.position.x-15 &&
                    missile.position.y <= enemy3.position.y+1 && missile.position.y >= enemy3.position.y-1 ) {
                    score += 10;
                    missile.scale.set(0,0);
                    missileArray.splice(i,1);
                    
                    enemy3.scale.set(0,0);
                    enemy3.position.set(-100,-100,-100);
                    makeStars();
                }
            }
        }

        // enemy missile counter
        enemy_missile_timer++;
        if (enemy_missile_timer >= max_enemy_shoot_time) {
            enemy_missile_timer = 0;

            var missileGeometry = new THREE.SphereGeometry(2, 8, 6);
            var wireMaterial = new THREE.MeshBasicMaterial({
                color: 0xed1c24,
            });
            missile = new THREE.Mesh(missileGeometry, wireMaterial);
            missile.position.set(enemy1.position.x-20,enemy1.position.y,0);
            scene.add(missile);
            enemy_missile_array.push(missile);
        }

        // updating enemy missile positions
        for (let i = 0; i < enemy_missile_array.length; i++) {
            const missile = enemy_missile_array[i];
            missile.position.y -= 2;
            if (missile.position.y <= -25) {
                missile.scale.set(0,0,0);
                enemy_missile_array.splice(i,1);
            }

            // collision check
            else {
                // decrease health
                if (missile.position.x <= player.position.x+15 &&  missile.position.x >= player.position.x-15 &&
                    missile.position.y <= player.position.y+1 && missile.position.y >= player.position.y-1 ) 
                {
                    health -= 1;
                    missile.scale.set(0,0);
                    missile.position.set(-100,-100,-100);
                    missileArray.splice(i,1);
                }
            }
        }

        // coins collision
        for (let i = 0; i < starArray.length; i++) {
            const star = starArray[i];
            if(starCollision(star) == 1){
                score+=5;
                star.scale.set(0,0,0);
                starArray.splice(i,1);
            }
            else{
                star.rotation.y+=0.1;
            }
        }

        scoreText.innerText = "Score:" + Math.floor(score);
        healthText.innerText = "Health:" + Math.floor(health);
    }
}

function starCollision(star){
    if (star.position.x <= player.position.x+15 &&  star.position.x >= player.position.x-15 &&
        star.position.y <= player.position.y+3 && star.position.y >= player.position.y-3 ){
        return 1;
    }
    return 0;
}

function makeStars() {
    var x = randomNumber(-70,70);
    var y = randomNumber(0,80);

    var coinGeometry = new THREE.TorusGeometry(3, 2, 16, 100);
	var material = new THREE.MeshStandardMaterial({
        color: 0x0095DD,
        wireframe: true,
        wireframeLinewidth: 2
    });
    
    star = new THREE.Mesh(coinGeometry, material);
    star.position.set(x,y,0);
    star.rotation.x = 1;
    scene.add(star);
    starArray.push(star);
    console.log(star.position.x, star.position.y);
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
    } if (keyCode == 32) {
        // spacebar
        shootMissile();
    }
};

function shootMissile() {
    var missileGeometry = new THREE.SphereGeometry(2, 8, 6);
    var wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x00FA9A,
    });
    missile = new THREE.Mesh(missileGeometry, wireMaterial);
    missile.position.set(player.position.x,player.position.y,player.position.z);
    scene.add(missile);
    missileArray.push(missile);
    // console.log(missile.position.x, missile.position.y);
    // console.log(enemy2.position.x, enemy2.position.y);
}

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

// // renders axes (green = y-axis, red = x-axis, blue = z-axis)
// const axesHelper = new THREE.AxesHelper(1000);
// scene.add(axesHelper);

// light
const color = 0xffffff, intensity = 1;
var light = new THREE.DirectionalLight(color, intensity);
light.position.set( 0, 0, 60)
scene.add( light );
light = new THREE.AmbientLight(0xffffff, 0.2);   // some light on every part
scene.add(light)

// loading models   --------------------------
let player;
var enemy1, enemy2, enemy3;
let p1 = loadModel('models/player.glb').then(result => {  player = result.scene; });
let p2 = loadModel('models/enemy_boss.glb').then(result => {  enemy1 = result.scene; });
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

var enemy_move_dir = [1,-1,-1]; // 1 = right, -1 = left
var score = 0;
var scoreText = document.getElementById("score");
var health = 3;
var healthText = document.getElementById("health");
var missileArray = [];
var enemy_missile_timer = 0, max_enemy_shoot_time = 30;
var enemy_missile_array = [];
var starArray = [];

animate();