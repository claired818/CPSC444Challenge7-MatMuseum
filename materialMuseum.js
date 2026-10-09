/*
1. What material is currently used throughout the museum?
    The current material is the basic material.
2. Why do the objects appear flat and similar?
    They appear flat because lighting doesn't affect the basic material.
*/

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------------------------------------------------
// Scene
// ---------------------------------------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222233);

// ---------------------------------------------------
// Camera
// ---------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 20);

// ---------------------------------------------------
// Renderer
// ---------------------------------------------------

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// ---------------------------------------------------
// Controls
// ---------------------------------------------------

const controls = new OrbitControls(camera, renderer.domElement);

// ---------------------------------------------------
// Lights
// ---------------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.0
);

scene.add(ambientLight);

const sphereLight = new THREE.SpotLight(
    0xffffff,
    150
);

sphereLight.position.set(-13, 7, -2);

sphereLight.castShadow = true;

scene.add(sphereLight);

// const sphereLighthelper = new THREE.SpotLightHelper(
//     sphereLight,
//     0.5
// );

// scene.add(sphereLighthelper);

const cubeLight = new THREE.PointLight(
    0xffffff,
    200
);

cubeLight.position.set(-3, 6, -6);

cubeLight.castShadow = true;

scene.add(cubeLight);

// const cubeLighthelper = new THREE.PointLightHelper(
//     cubeLight,
//     0.5
// );

// scene.add(cubeLighthelper);

const statueLight = new THREE.PointLight(
    0xffffff,
    150
);

statueLight.position.set(11, 6, -3);

statueLight.castShadow = true;

scene.add(statueLight);

const statueLighthelper = new THREE.PointLightHelper(
    statueLight,
    0.5
);

scene.add(statueLighthelper);

// ---------------------------------------------------
// Floor
// ---------------------------------------------------

const floorGeometry =
    new THREE.PlaneGeometry(40, 40);

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x444444
    });

const floor =
    new THREE.Mesh(
        floorGeometry,
        floorMaterial
    );

floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;

scene.add(floor);

// ---------------------------------------------------
// Object Labels
// ---------------------------------------------------

function createPedestal(x, z) {

    const geo =
        new THREE.CylinderGeometry(
            0.8,
            0.8,
            1,
            32
        );

    const mat =
        new THREE.MeshBasicMaterial({
            color: 0x999999
        });

    const pedestal =
        new THREE.Mesh(geo, mat);

    pedestal.position.set(x, 0.5, z);

    pedestal.castShadow = true;
    pedestal.receiveShadow = true;

    scene.add(pedestal);
}

function placeOnPedestal(object, x, z) {
    object.geometry.computeBoundingBox();
    object.position.set(x, 1 - object.geometry.boundingBox.min.y, z);
}

// ---------------------------------------------------
// Materials
// ---------------------------------------------------

const yellowMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffd43b
    });

const greenMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x2ecc71
    });

const cyanMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x00bcd4
    });

const redMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xff4d4d
    });

const whiteMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xf5f5f5
    });

const orangeMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xff8c42
    });

const magentaMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xff4fd8
    });

const purpleMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x9b59b6
    });

const blueMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x4169e1
    });

// ---------------------------------------------------
// Row 1
// ---------------------------------------------------

createPedestal(-9, -4);

const goldMat = new THREE.MeshStandardMaterial({
        color: 0xffff55,
        roughness: 0.25,
        metalness: 0.97
    });

const sphere =
    new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        goldMat
    );

sphereLight.target = sphere;
placeOnPedestal(sphere, -9, -4);
sphere.castShadow = true;

scene.add(sphere);

createPedestal(-3, -4);

const plasticMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        shininess: 75,
        specular: 0xffffff
    });

const cube =
    new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        plasticMat
    );

placeOnPedestal(cube, -3, -4);
cube.castShadow = true;

scene.add(cube);

createPedestal(3, -4);

const crystal =
    new THREE.Mesh(
        new THREE.OctahedronGeometry(1.5),
        yellowMaterial
    );

placeOnPedestal(crystal, 3, -4);
crystal.castShadow = true;

scene.add(crystal);

const statueMat = new THREE.MeshToonMaterial({
        color: 0xff4fd8
    });

createPedestal(9, -4);

const statue =
    new THREE.Mesh(
        new THREE.ConeGeometry(1,3,32),
        statueMat
    );

placeOnPedestal(statue, 9, -4);
statue.castShadow = true;

scene.add(statue);

// ---------------------------------------------------
// Row 2
// ---------------------------------------------------

createPedestal(-9, 5);

const torus =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            1,
            0.4,
            16,
            100
        ),
        orangeMaterial
    );

placeOnPedestal(torus, -9, 5);
torus.castShadow = true;

scene.add(torus);

createPedestal(-3, 5);

const pyramid =
    new THREE.Mesh(
        new THREE.ConeGeometry(
            1.5,
            3,
            4
        ),
        blueMaterial
    );

placeOnPedestal(pyramid, -3, 5);

scene.add(pyramid);

createPedestal(3, 5);

const knotMat = new THREE.MeshNormalMaterial();

const normalObject =
    new THREE.Mesh(
        new THREE.TorusKnotGeometry(
            0.8,
            0.3,
            100,
            16
        ),
        knotMat
    );

placeOnPedestal(normalObject, 3, 5);
normalObject.castShadow = true;

scene.add(normalObject);

createPedestal(9, 5);

const treeMat = new THREE.MeshLambertMaterial({
        color: 0x2ecc71
    });

const tree =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            1,
            1,
            3,
            6
        ),
        treeMat
    );

placeOnPedestal(tree, 9, 5);
tree.castShadow = true;

scene.add(tree);

// ---------------------------------------------------
// Mystery Object
// Students pick the material.
// ---------------------------------------------------

createPedestal(0, 0);

const mystery =
    new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.5),
        whiteMaterial
    );

placeOnPedestal(mystery, 0, 0);
mystery.castShadow = true;

scene.add(mystery);

// ---------------------------------------------------
// Animation
// ---------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    sphere.rotation.y += 0.01;
    cube.rotation.y += 0.01;
    crystal.rotation.y += 0.01;
    statue.rotation.y += 0.01;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    pyramid.rotation.y += 0.01;
    normalObject.rotation.y += 0.01;
    tree.rotation.y += 0.01;

    mystery.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();

// ---------------------------------------------------
// Resize
// ---------------------------------------------------

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});