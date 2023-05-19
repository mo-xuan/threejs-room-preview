<script setup>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {ref, onMounted} from 'vue'

//初始化场景
const scene = new THREE.Scene()
//初始化相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
//设置相机位置
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);
//初始化渲染器
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const container = ref(null)

const render = () => {

  renderer.render(scene, camera)
  requestAnimationFrame(render)
  objects.forEach((obj) => {
    obj.rotation.y += 0.01;
  });
  objects.forEach((node) => {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);
  });

}

const objects = [];

// 一球多用
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
);

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
objects.push(sunMesh);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5, .5, .5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

const color = 0xffffff;
const intensity = 3;
const light = new THREE.PointLight(color, intensity);
scene.add(light);

onMounted(() => {
  //添加控制器
  const controls = new OrbitControls(camera, container.value)
  controls.enableDamping = true
  container.value.appendChild(renderer.domElement)
  render()
})


</script>

<template>
  <div class="container" ref="container"></div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
