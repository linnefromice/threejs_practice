import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
const starsImage = require("./images/stars.jpeg");

const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();

// mesh
const geometry = new THREE.SphereGeometry(5, 60, 40);
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture(starsImage)
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// camera
const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
camera.position.set(0, 0, 0.1);
camera.lookAt(sphere.position);

// helper
const axis = new THREE.AxesHelper(1000);
axis.position.set(0, 0, 0);
scene.add(axis);

// render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x000000);
document.getElementById("stage").appendChild(renderer.domElement);
renderer.render(scene, camera);

//control

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  sphere.rotation.y += (0.05 * Math.PI) / 180;
  renderer.render(scene, camera);
  controls.update();
}
render();