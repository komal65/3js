// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load Mercedes car model
const loader = new THREE.GLTFLoader();
let carModel;

loader.load('m.glb', (gltf) => {
    carModel = gltf.scene;
    scene.add(carModel);
    // Adjust position, rotation, and scale of the car model if needed
    carModel.position.set(0, 0, 0);
    carModel.rotation.set(0, Math.PI, 0);
    carModel.scale.set(0.01, 0.01, 0.01);
});

// Create off-road terrain
const terrainGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
terrainGeometry.rotateX(-Math.PI / 2);

const terrainMaterial = new THREE.MeshBasicMaterial({ color: 0x654321, wireframe: true });
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
scene.add(terrain);

// Position camera
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Set up animation loop
const animate = function () {
    requestAnimationFrame(animate);
    // Animate car movement here
    if (carModel) {
        carModel.rotation.y += 0.01; // Rotate the car
    }
    renderer.render(scene, camera);
};

animate();
