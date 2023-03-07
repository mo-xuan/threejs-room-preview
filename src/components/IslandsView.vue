<script setup lang="ts">
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {Water} from 'three/examples/jsm/objects/Water2'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'

//初始化场景
const scene = new THREE.Scene()
//初始化相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
)
//设置相机位置
camera.position.set(10, 3, 1)
//更新摄像头相关比例
//camera.aspect = window.innerWidth / window.innerHeight
//更新摄像头投影矩阵
//camera.updateProjectionMatrix()

//初始化渲染器
const renderer = new THREE.WebGL1Renderer({
  antialias: true,
  logarithmicDepthBuffer: true
})
renderer.outputEncoding = THREE.sRGBEncoding

//设置渲染器宽高
//renderer.setSize(window.innerWidth, window.innerHeight)
updateRendererAndCamera()
scene.add(camera)

//修改渲染器的宽高，相机的比例
function updateRendererAndCamera() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

//监听屏幕大小改变，修改渲染器的宽高，相机的比例
window.addEventListener('resize', () => {
  updateRendererAndCamera()
})

//讲渲染器添加到页面
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)


//创建一个巨大的天空球体
const skyGeometry = new THREE.SphereGeometry(1000, 60, 60)
const skyTexture = new THREE.TextureLoader().load('./islands/sky.jpg')
const skyMaterial = new THREE.MeshBasicMaterial({
  map: skyTexture
})
skyGeometry.scale(1, 1, -1)

const sky = new THREE.Mesh(skyGeometry, skyMaterial)
scene.add(sky)

//创建一个视频的纹理
const video = document.createElement('video')
video.src = './islands/sky-active.mp4'
video.loop = true

window.addEventListener('click', () => {
  /*if (video.paused) {
    video.play()
    skyMaterial.map = new THREE.VideoTexture(video)
    skyMaterial.map.needsUpdate = true
  }*/
})

// 载入环境hdr
const hdrLoader = new RGBELoader()
hdrLoader.loadAsync('./room1/spehre_hdr.hdr').then(texture => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})

//添加平行光
const light = new THREE.DirectionalLight(0xffffff, 0.8)
light.position.set(-100, 100, 10)
scene.add(light)

//创建水面
const waterGeometry = new THREE.CircleGeometry(300, 64)
const water = new Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  color: 0x00eeff,
  flowDirection: new THREE.Vector2(1, 1),
  scale: 1,
})
water.position.y = -1
//水面旋转放置水平
water.rotation.x = -Math.PI / 2
scene.add(water)

//添加小岛模型
const loader = new GLTFLoader()
loader.load('./islands/low_poly_island.glb', function (gltf) {
  scene.add(gltf.scene);
})

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()
</script>
<template>

</template>


<style scoped>

</style>
