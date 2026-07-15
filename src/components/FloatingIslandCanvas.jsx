import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function FloatingIslandCanvas({ appState }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  
  // Track camera target for smooth GSAP animation
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0.5, 0));
  // Track mouse coordinates for parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SETUP SCENE, CAMERA, & RENDERER ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Background gradient color matching sky palette
    scene.background = new THREE.Color('#BDE7FF');
    scene.fog = new THREE.FogExp2('#BDE7FF', 0.035);

    const isPortrait = width < height;
    const camera = new THREE.PerspectiveCamera(isPortrait ? 65 : 45, width / height, 0.1, 100);
    // Initial Title Screen Camera Position
    camera.position.set(0, 2.5, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- LIGHTING ---
    // Sky blue ambient light for global illumination fill
    const ambientLight = new THREE.AmbientLight('#9FD5FF', 0.85);
    scene.add(ambientLight);

    // Warm main sun light
    const sunLight = new THREE.DirectionalLight('#F6F1E6', 1.3);
    sunLight.position.set(12, 18, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    const d = 8;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Green bounce light from the grass up to model undersides
    const groundBounceLight = new THREE.DirectionalLight('#76C45F', 0.35);
    groundBounceLight.position.set(0, -1, 0);
    scene.add(groundBounceLight);

    // --- PROCEDURAL LOW-POLY STYLIZED ENVIRONMENT ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Floating Island Base (Stacked Bevel Hexagonal/Cylindrical Shapes)
    const islandBaseGroup = new THREE.Group();
    worldGroup.add(islandBaseGroup);

    // Top Grass Layer
    const grassGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.6, 6, 1);
    const grassMat = new THREE.MeshStandardMaterial({ 
      color: '#76C45F', 
      flatShading: true,
      roughness: 0.8,
      metalness: 0.1
    });
    const grassBase = new THREE.Mesh(grassGeo, grassMat);
    grassBase.position.y = 0;
    grassBase.receiveShadow = true;
    grassBase.castShadow = true;
    islandBaseGroup.add(grassBase);

    // Middle Stone Layer
    const stoneGeo = new THREE.CylinderGeometry(4.0, 3.8, 0.8, 6, 1);
    const stoneMat = new THREE.MeshStandardMaterial({ 
      color: '#CFC7BA', 
      flatShading: true,
      roughness: 0.9
    });
    const stoneBase = new THREE.Mesh(stoneGeo, stoneMat);
    stoneBase.position.y = -0.7;
    stoneBase.receiveShadow = true;
    stoneBase.castShadow = true;
    islandBaseGroup.add(stoneBase);

    // Bottom Dirt/Wood Roots Layer
    const dirtGeo = new THREE.CylinderGeometry(3.8, 0.1, 2.5, 6, 1);
    const dirtMat = new THREE.MeshStandardMaterial({ 
      color: '#9A6940', 
      flatShading: true,
      roughness: 0.9,
      metalness: 0.05
    });
    const dirtBase = new THREE.Mesh(dirtGeo, dirtMat);
    dirtBase.position.y = -2.35;
    dirtBase.receiveShadow = true;
    dirtBase.castShadow = true;
    islandBaseGroup.add(dirtBase);

    // 2. Voxel Hills
    const hillGeometry = new THREE.BoxGeometry(1, 1, 1);
    const hillMat = new THREE.MeshStandardMaterial({ color: '#5BA34D', flatShading: true, roughness: 0.85 });
    
    const hills = [
      { scale: [2, 1.2, 1.8], pos: [-2, 0.4, -1] },
      { scale: [1.6, 0.8, 1.5], pos: [-2.6, 0.2, 0.8] },
      { scale: [2.5, 1.8, 2.2], pos: [1.5, 0.7, -1.8] }, // Hill under castle
      { scale: [1.8, 0.6, 1.2], pos: [2.8, 0.2, 0] },
      { scale: [1.2, 0.5, 1.2], pos: [0, 0.2, -2.5] }
    ];

    hills.forEach(hillData => {
      const mesh = new THREE.Mesh(hillGeometry, hillMat);
      mesh.scale.set(...hillData.scale);
      mesh.position.set(...hillData.pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      worldGroup.add(mesh);
    });

    // 3. Castle on the far right (stacked low-poly shapes)
    const castleGroup = new THREE.Group();
    castleGroup.position.set(1.5, 1.6, -1.8);
    worldGroup.add(castleGroup);

    const castleStoneMat = new THREE.MeshStandardMaterial({ color: '#CFC7BA', flatShading: true, roughness: 0.8 });
    const castleRoofMat = new THREE.MeshStandardMaterial({ color: '#D97A2D', flatShading: true, roughness: 0.7 });
    const flagMat = new THREE.MeshStandardMaterial({ color: '#F4C34D', flatShading: true, roughness: 0.6 });

    // Main Keep
    const keepGeo = new THREE.BoxGeometry(1.2, 1.4, 1.2);
    const keep = new THREE.Mesh(keepGeo, castleStoneMat);
    keep.position.y = 0.7;
    keep.castShadow = true;
    keep.receiveShadow = true;
    castleGroup.add(keep);

    // Towers (Left & Right)
    const towerGeo = new THREE.CylinderGeometry(0.35, 0.35, 2.0, 5);
    const towerL = new THREE.Mesh(towerGeo, castleStoneMat);
    towerL.position.set(-0.7, 1.0, 0.4);
    towerL.castShadow = true;
    towerL.receiveShadow = true;
    castleGroup.add(towerL);

    const towerR = towerL.clone();
    towerR.position.x = 0.7;
    castleGroup.add(towerR);

    // Cone Roofs
    const roofGeo = new THREE.ConeGeometry(0.45, 0.8, 5);
    const roofL = new THREE.Mesh(roofGeo, castleRoofMat);
    roofL.position.set(-0.7, 2.4, 0.4);
    roofL.castShadow = true;
    castleGroup.add(roofL);

    const roofR = roofL.clone();
    roofR.position.x = 0.7;
    castleGroup.add(roofR);

    // Tiny flag
    const flagPoleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 4);
    const flagPoleMat = new THREE.MeshStandardMaterial({ color: '#33452C' });
    const flagPole = new THREE.Mesh(flagPoleGeo, flagPoleMat);
    flagPole.position.set(0, 1.7, 0);
    keep.add(flagPole);

    const flagMeshGeo = new THREE.BoxGeometry(0.25, 0.15, 0.02);
    const flagMesh = new THREE.Mesh(flagMeshGeo, flagMat);
    flagMesh.position.set(0.125, 0.22, 0);
    flagPole.add(flagMesh);

    // 4. Soft Trees
    const treeTrunkGeo = new THREE.CylinderGeometry(0.1, 0.16, 0.8, 5);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: '#9A6940', flatShading: true, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: '#76C45F', flatShading: true, roughness: 0.8 });
    const foliageGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);

    const treeData = [
      { pos: [-2.2, 0.8, 1.2], scale: [1, 1.4, 1] },
      { pos: [-2.8, 0.7, 0.5], scale: [0.8, 1.1, 0.8] },
      { pos: [-1.4, 1.2, -1.2], scale: [1.2, 1.6, 1.2] },
      { pos: [0.2, 0.4, -2.4], scale: [0.9, 1.3, 0.9] },
      { pos: [2.8, 0.5, 0.4], scale: [0.9, 1.2, 0.9] }
    ];

    const treeMeshes = [];

    treeData.forEach((tree, idx) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(...tree.pos);
      treeGroup.scale.set(...tree.scale);
      
      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.y = 0.4;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      treeGroup.add(trunk);

      // Low-poly layered foliage
      const f1 = new THREE.Mesh(foliageGeo, foliageMat);
      f1.position.y = 1.0;
      f1.castShadow = true;
      f1.receiveShadow = true;
      treeGroup.add(f1);

      const f2 = new THREE.Mesh(foliageGeo, foliageMat);
      f2.scale.set(0.7, 0.7, 0.7);
      f2.position.set(0.1, 1.4, -0.05);
      f2.castShadow = true;
      treeGroup.add(f2);

      worldGroup.add(treeGroup);
      treeMeshes.push(treeGroup);
    });

    // 5. Water / Small Lake & Waterfall
    const waterGeo = new THREE.BoxGeometry(2.0, 0.1, 1.8);
    const waterMat = new THREE.MeshStandardMaterial({ 
      color: '#9FD5FF', 
      roughness: 0.1, 
      metalness: 0.8,
      transparent: true,
      opacity: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(-0.8, 0.1, -1.8);
    worldGroup.add(water);

    // Waterfall line particles
    const waterfallParticles = [];
    const waterfallGroup = new THREE.Group();
    waterfallGroup.position.set(-0.8, 0.6, -2.2); // flowing down from the back hill
    worldGroup.add(waterfallGroup);

    const waterParticleGeo = new THREE.BoxGeometry(0.06, 0.12, 0.06);
    const waterParticleMat = new THREE.MeshBasicMaterial({ color: '#BDE7FF', transparent: true, opacity: 0.9 });

    for (let i = 0; i < 20; i++) {
      const particle = new THREE.Mesh(waterParticleGeo, waterParticleMat);
      particle.position.set(
        (Math.random() - 0.5) * 0.8,
        Math.random() * 0.8,
        (Math.random() - 0.5) * 0.2
      );
      waterfallGroup.add(particle);
      waterfallParticles.push({
        mesh: particle,
        speed: 1.0 + Math.random() * 1.5,
        startY: 0.8,
        endY: -0.5
      });
    }

    // 6. Rotating Golden Coins / Gems
    const coinGeo = new THREE.OctahedronGeometry(0.15, 0);
    const coinMat = new THREE.MeshStandardMaterial({ 
      color: '#F4C34D', 
      roughness: 0.2, 
      metalness: 0.9, 
      flatShading: true 
    });

    const coinData = [
      { pos: [-0.8, 1.2, 1.2] },
      { pos: [0.2, 1.0, 1.8] },
      { pos: [-1.8, 1.5, -0.6] }
    ];

    const coinMeshes = [];
    coinData.forEach(c => {
      const mesh = new THREE.Mesh(coinGeo, coinMat);
      mesh.position.set(...c.pos);
      mesh.castShadow = true;
      worldGroup.add(mesh);
      coinMeshes.push(mesh);
    });

    // 7. Drifting Clouds
    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    const cloudMat = new THREE.MeshStandardMaterial({ 
      color: '#FFFFFF', 
      roughness: 0.9, 
      metalness: 0.01,
      transparent: true,
      opacity: 0.9,
      flatShading: true 
    });

    const createVoxelCloud = (width, height, depth) => {
      const g = new THREE.Group();
      const numBlocks = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < numBlocks; i++) {
        const bGeo = new THREE.BoxGeometry(
          width * (0.5 + Math.random() * 0.5),
          height * (0.6 + Math.random() * 0.4),
          depth * (0.5 + Math.random() * 0.5)
        );
        const b = new THREE.Mesh(bGeo, cloudMat);
        b.position.set(
          (Math.random() - 0.5) * width,
          (Math.random() - 0.5) * height * 0.4,
          (Math.random() - 0.5) * depth * 0.5
        );
        g.add(b);
      }
      return g;
    };

    const clouds = [
      { mesh: createVoxelCloud(2.2, 0.8, 1.2), pos: [-8, 5, -5], speed: 0.12 },
      { mesh: createVoxelCloud(1.8, 0.6, 1.0), pos: [-4, 6.5, -8], speed: 0.08 },
      { mesh: createVoxelCloud(2.5, 0.9, 1.4), pos: [5, 4.5, -6], speed: 0.15 },
      { mesh: createVoxelCloud(1.5, 0.5, 0.8), pos: [9, 6.0, -10], speed: 0.06 }
    ];

    clouds.forEach(c => {
      c.mesh.position.set(...c.pos);
      cloudGroup.add(c.mesh);
    });

    // 8. Subtle Flapping Birds
    const birdGroup = new THREE.Group();
    scene.add(birdGroup);

    const birdMat = new THREE.MeshStandardMaterial({ color: '#33452C', flatShading: true });
    
    // Create simple flapping bird geometry
    const createBird = () => {
      const g = new THREE.Group();
      
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.06), birdMat);
      g.add(body);
      
      const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.16), birdMat);
      wingL.position.set(-0.06, 0.01, 0.08);
      g.add(wingL);
      
      const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.16), birdMat);
      wingR.position.set(0.06, 0.01, -0.08);
      g.add(wingR);
      
      return { group: g, wingL, wingR };
    };

    const birds = [
      { ...createBird(), angle: 0, radius: 6, speed: 0.35, height: 4, center: new THREE.Vector3(-1, 0, -1) },
      { ...createBird(), angle: Math.PI, radius: 5, speed: 0.45, height: 4.8, center: new THREE.Vector3(1, 0, -2) }
    ];

    birds.forEach(b => {
      birdGroup.add(b.group);
    });

    // 9. Distant Floating Islands (Voxel background accents)
    const distIslandGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.3, 5);
    const distDirtGeo = new THREE.CylinderGeometry(1.1, 0.05, 0.8, 5);
    
    const distantIslands = [
      { pos: [-9, 1.5, -12], scale: 0.9, rotation: 0.4 },
      { pos: [10, 2.5, -15], scale: 1.2, rotation: -0.5 },
      { pos: [6, -1.0, -9], scale: 0.75, rotation: 0.2 }
    ];

    distantIslands.forEach(di => {
      const group = new THREE.Group();
      group.position.set(...di.pos);
      group.scale.setScalar(di.scale);
      group.rotation.y = di.rotation;

      const top = new THREE.Mesh(distIslandGeo, grassMat);
      top.receiveShadow = true;
      group.add(top);

      const bot = new THREE.Mesh(distDirtGeo, dirtMat);
      bot.position.y = -0.55;
      group.add(bot);

      // Add one tiny tree
      const tinyTrunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      tinyTrunk.scale.set(0.5, 0.5, 0.5);
      tinyTrunk.position.set(0, 0.35, 0);
      group.add(tinyTrunk);

      const tinyFoil = new THREE.Mesh(foliageGeo, foliageMat);
      tinyFoil.scale.set(0.4, 0.4, 0.4);
      tinyFoil.position.set(0, 0.65, 0);
      group.add(tinyFoil);

      worldGroup.add(group);
    });

    // --- MOUSE MOVE INTERACTION (Parallax) ---
    const handleMouseMove = (e) => {
      // Normalize mouse positions between -1 and 1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    let animationFrameId = null;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Slow idle sways for world
      worldGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.12;

      // 1. Swaying Trees
      treeMeshes.forEach((t, i) => {
        t.rotation.z = Math.sin(elapsed * 1.5 + i) * 0.035;
        t.rotation.x = Math.cos(elapsed * 1.3 + i) * 0.02;
      });

      // 2. Waterfall flow
      waterfallParticles.forEach(p => {
        p.mesh.position.y -= delta * p.speed;
        // Wrap particle back to top
        if (p.mesh.position.y < p.endY) {
          p.mesh.position.y = p.startY;
          p.mesh.position.x = (Math.random() - 0.5) * 0.8;
        }
      });

      // 3. Castle Flag sway
      flagMesh.rotation.y = Math.sin(elapsed * 6) * 0.25;

      // 4. Rotating Gold Coins
      coinMeshes.forEach((c, i) => {
        c.rotation.y += delta * 1.5;
        c.position.y += Math.sin(elapsed * 2.0 + i) * 0.0015;
      });

      // 5. Cloud Drifting
      clouds.forEach(c => {
        c.mesh.position.x += delta * c.speed;
        // Wrap around when off-screen
        if (c.mesh.position.x > 18) {
          c.mesh.position.x = -18;
        }
      });

      // 6. Flying Birds
      birds.forEach((b, i) => {
        b.angle += delta * b.speed;
        const bx = b.center.x + Math.cos(b.angle) * b.radius;
        const bz = b.center.z + Math.sin(b.angle) * b.radius;
        const by = b.height + Math.sin(elapsed * 2 + i) * 0.2;
        
        b.group.position.set(bx, by, bz);
        // Face movement direction
        b.group.rotation.y = -b.angle + Math.PI / 2;

        // Wing flapping
        const flap = Math.sin(elapsed * 10 + i) * 0.6;
        b.wingL.rotation.z = flap;
        b.wingR.rotation.z = -flap;
      });

      // 7. Mouse Parallax (interpolation for smoothing)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Only apply parallax if camera is not in mid-transition
      if (appState === 'TITLE') {
        camera.position.x = mouse.x * 1.5;
        camera.position.y = 2.5 + mouse.y * 1.0;
        camera.lookAt(cameraTargetRef.current);
      } else if (appState === 'WORKSPACE') {
        // Shift workspace camera position slightly with mouse
        camera.position.x = 5.0 + mouse.x * 0.8;
        camera.position.y = 7.0 + mouse.y * 0.5;
        camera.lookAt(cameraTargetRef.current);
      } else {
        // Transiting state, let GSAP control camera completely
        camera.lookAt(cameraTargetRef.current);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      cameraRef.current.aspect = w / h;
      
      // Dynamic zoom-out on portrait mobile viewports to prevent island cropping
      if (w < h) {
        cameraRef.current.fov = 65;
      } else {
        cameraRef.current.fov = 45;
      }

      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      // Clean up geometries and materials
      worldGroup.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      if (rendererRef.current && rendererRef.current.domElement && container) {
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // --- TRANSITIONS WATCHER (ANIMATE CAMERA WITH GSAP) ---
  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    if (appState === 'TRANSITIONING') {
      // Phase 1-3 Cinematic sweep: Zooms out, moves up, looks down
      const timeline = gsap.timeline();
      
      // Animate Camera Position
      timeline.to(camera.position, {
        x: 5.0,
        y: 7.0,
        z: 13.0,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      // Animate Camera Target lookAt
      timeline.to(cameraTargetRef.current, {
        x: 0,
        y: 0.8,
        z: -0.5,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 0);
    } else if (appState === 'TITLE') {
      // Animate Camera back to initial Title Screen positioning
      const timeline = gsap.timeline();

      timeline.to(camera.position, {
        x: 0,
        y: 2.5,
        z: 10.0,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      timeline.to(cameraTargetRef.current, {
        x: 0,
        y: 0.5,
        z: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 0);
    }
  }, [appState]);

  return <div ref={containerRef} className="canvas-container" />;
}
