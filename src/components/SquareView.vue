<script setup lang="ts">
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
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
  const geometry = new THREE.BoxGeometry(10, 10, 10)
  const picArray = ['px', 'nx', 'py', 'ny', 'pz', 'nz']
  const boxMaterials = []
  picArray.forEach((item) => {
    //纹理加载
    const texture = new THREE.TextureLoader().load(`./room1/${item}.png`)
    boxMaterials.push(new THREE.MeshBasicMaterial({map: texture}))
  })

  const cube = new THREE.Mesh(geometry, boxMaterials)
  cube.geometry.scale(1, 1, -1)
  scene.add(cube)
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
