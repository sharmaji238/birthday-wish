import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera } from 'lucide-react';

export default function ThreeDHeartPage() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const hearts = [];

    // 🩷 Create multiple 3D hearts
    for (let i = 0; i < 5; i++) {
      const heartShape = new THREE.Shape();
      const scale = 0.5;
      heartShape.moveTo(0, 0);
      heartShape.bezierCurveTo(0, -0.3 * scale, -0.6 * scale, -0.3 * scale, -0.6 * scale, 0);
      heartShape.bezierCurveTo(-0.6 * scale, 0.3 * scale, 0, 0.6 * scale, 0, 1 * scale);
      heartShape.bezierCurveTo(0, 0.6 * scale, 0.6 * scale, 0.3 * scale, 0.6 * scale, 0);
      heartShape.bezierCurveTo(0.6 * scale, -0.3 * scale, 0, -0.3 * scale, 0, 0);

      const extrudeSettings = {
        depth: 0.3,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 2,
        bevelSize: 0.08,
        bevelThickness: 0.08
      };

      const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
      const hue = (i * 0.15) % 1;
      const color = new THREE.Color().setHSL(hue + 0.8, 1, 0.6);

      const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 100,
        specular: 0xffffff,
        emissive: color,
        emissiveIntensity: 0.3
      });

      const heart = new THREE.Mesh(geometry, material);
      heart.scale.set(3, 3, 3);
      heart.position.x = (Math.random() - 0.5) * 8;
      heart.position.y = (Math.random() - 0.5) * 8;
      heart.position.z = (Math.random() - 0.5) * 8;

      heart.userData = {
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        rotationSpeed: (Math.random() - 0.5) * 0.03
      };

      scene.add(heart);
      hearts.push(heart);
    }

    // ✨ Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 30;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 30;

      const color = new THREE.Color().setHSL(Math.random() * 0.2 + 0.8, 1, 0.6);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 💡 Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const lights = [];
    for (let i = 0; i < 4; i++) {
      const color = new THREE.Color().setHSL(i * 0.25, 1, 0.6);
      const pointLight = new THREE.PointLight(color, 2);
      pointLight.position.set(
        Math.cos(i * Math.PI / 2) * 10,
        Math.sin(i * Math.PI / 2) * 10,
        5
      );
      scene.add(pointLight);
      lights.push({ light: pointLight, angle: i * Math.PI / 2 });
    }

    camera.position.z = 12;

    // 🎬 Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      hearts.forEach((heart, index) => {
        heart.rotation.x += heart.userData.rotationSpeed;
        heart.rotation.y += heart.userData.speedX * 2;
        heart.rotation.z += heart.userData.rotationSpeed * 0.5;

        heart.position.x += heart.userData.speedX;
        heart.position.y += heart.userData.speedY;

        if (Math.abs(heart.position.x) > 10) heart.userData.speedX *= -1;
        if (Math.abs(heart.position.y) > 10) heart.userData.speedY *= -1;

        heart.position.y += Math.sin(time + index) * 0.02;
      });

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0003;

      lights.forEach((lightObj) => {
        lightObj.angle += 0.01;
        lightObj.light.position.x = Math.cos(lightObj.angle) * 10;
        lightObj.light.position.y = Math.sin(lightObj.angle) * 10;
      });

      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current = { scene, camera, renderer };

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes float-text {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow-text {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 40px rgba(255, 105, 180, 0.8); }
        }
      `}</style>

      <div className="text-center mb-8 z-10">
        <h2 className="text-5xl font-bold text-white mb-4"
            style={{ animation: 'float-text 3s ease-in-out infinite, glow-text 2s ease-in-out infinite' }}>
          My Heart Beats for You 💗
        </h2>
        <p className="text-xl text-pink-200">
          Watch these 3D hearts dance — they move with the rhythm of my love
        </p>
        <p className="text-md text-pink-300 mt-2">
          ✨ 5 hearts, 3000 particles, infinite love ✨
        </p>
      </div>

      <div
        ref={mountRef}
        className="w-full max-w-4xl h-96 md:h-[500px] rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '2px solid rgba(255, 105, 180, 0.3)',
          boxShadow: '0 0 40px rgba(255, 105, 180, 0.4)',
        }}
      />

      {/* Navigation */}
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <button
          onClick={() => navigate('/message')}
          className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          ← Back to Message
        </button>

        <button
          onClick={() => navigate('/love')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <Heart className="w-5 h-5 fill-white" />
          Love Story
        </button>

        <button
          onClick={() => navigate('/gallery')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <Camera className="w-5 h-5" />
          View Memories
        </button>
      </div>

      <div className="mt-8 text-center max-w-2xl">
        <p className="text-pink-200 text-sm">
          💫 Each heart spins in its own orbit — just like how we found each other in this vast universe 💫
        </p>
      </div>
    </div>
  );
}
