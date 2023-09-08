<script setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'

const container = ref(null)

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);


// 创建粒子材质
const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });

// 创建粒子几何体
const particleGeometry = new THREE.BufferGeometry();
const positions = [];

// 生成随机粒子的初始位置
const numParticles = 1000;
for (let i = 0; i < numParticles; i++) {
  const x = (Math.random() - 0.5) * 10;
  const y = (Math.random() - 0.5) * 10;
  const z = (Math.random() - 0.5) * 10;
  positions.push(x, y, z);
}

// 添加粒子的位置数据到几何体
particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

// 创建粒子系统
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// 设置相机位置
camera.position.z = 10;

const animate = () => {
  requestAnimationFrame(animate);

  // 旋转粒子系统
  particles.rotation.x += 0.005;
  particles.rotation.y += 0.005;

  renderer.render(scene, camera);
};

// 渲染循环
onMounted(()=> {
  container.value.appendChild(renderer.domElement)
  animate()
})



</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
