import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#c'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({color: 0xffffff});
	const star = new THREE.Mesh(geometry, material);
	const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
	star.position.set(x,y,z);
	scene.add(star);
}

Array(200).fill().forEach(addStar);

const circusTexture = new THREE.TextureLoader().load('circus.jpeg');
scene.background = circusTexture;

const beeTexture = new THREE.TextureLoader().load('bee.jpeg');
const bee = new THREE.Mesh(
	new THREE.BoxGeometry(20,20,20),
	new THREE.MeshStandardMaterial( {
		map: beeTexture,
	})
);
scene.add(bee);

bee.position.z = 1;
bee.position.setX(-1);

const lionsTexture = new THREE.TextureLoader().load('lions.jpeg');
const lions = new THREE.Mesh(
	new THREE.BoxGeometry(20,20,20),
	new THREE.MeshStandardMaterial( {
		map: lionsTexture,
	})
);
scene.add(lions);

lions.position.z = 30;
lions.position.setX(-1);

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	bee.rotation.x += 0.05;
	bee.rotation.y += 0.075;
	bee.rotation.z += 0.05;

	lions.rotation.x += 0.05;
	lions.rotation.y += 0.075;
	lions.rotation.z += 0.05;

	camera.position.z = t * -0.01;
	camera.position.x = t * -0.0002;
	camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
	requestAnimationFrame(animate);

	bee.rotation.x += 0.005;
	lions.rotation.x += 0.005;

	renderer.render(scene, camera);
}

animate();