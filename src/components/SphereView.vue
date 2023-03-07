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
camera.position.z = 0.1
//初始化渲染器
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const container = ref(null)

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

//添加立方体
const InitializationContent = () => {
  const geometry = new THREE.SphereGeometry(16, 50, 50)
  const loader = new RGBELoader()
  loader.load('./room1/spehre_hdr.hdr', (texture) => {
    const sphereMaterial = new THREE.MeshBasicMaterial({map: texture})
    const sphere = new THREE.Mesh(geometry, sphereMaterial)
    sphere.geometry.scale(1,1,-1)
    scene.add(sphere)
  })

/*  const texture = new THREE.TextureLoader().load('./room1/sphere_normal.jpg')
  const sphereMaterial = new THREE.MeshBasicMaterial({map: texture})
  const sphere = new THREE.Mesh(geometry, sphereMaterial)
  sphere.geometry.scale(16,16,-16)
  scene.add(sphere)*/
}


InitializationContent()

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
