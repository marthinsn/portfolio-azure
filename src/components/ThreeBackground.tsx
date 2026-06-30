import { useEffect, useRef } from "react";
import * as THREE from "three";

function isWebGLAvailable(): boolean {
  try {
    const test = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (test.getContext("webgl") || test.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!isWebGLAvailable()) return; // graceful no-op in headless/GPU-less envs

    const W = window.innerWidth;
    const H = window.innerHeight;

    // ── Renderer ─────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    } catch {
      return; // WebGL context creation failed — silently degrade
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 600);
    camera.position.set(0, 0, 35);

    // ── Helpers ───────────────────────────────────────────────────
    const hex = (c: string) => new THREE.Color(c);
    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    // ── 1. STAR FIELD ─────────────────────────────────────────────
    {
      const N = 1200;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = rand(90, 200);
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: hex("#E4A390"),
        size: 0.13,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const stars = new THREE.Points(geo, mat);
      stars.name = "stars";
      scene.add(stars);
    }

    // ── 2. FLOATING PARTICLES ────────────────────────────────────
    const PART_N = 150;
    const partBase = new Float32Array(PART_N * 3);
    const partPhase = new Float32Array(PART_N);
    for (let i = 0; i < PART_N; i++) {
      partBase[i * 3]     = rand(-50, 50);
      partBase[i * 3 + 1] = rand(-35, 35);
      partBase[i * 3 + 2] = rand(-30, 10);
      partPhase[i] = Math.random() * Math.PI * 2;
    }
    const partGeo = new THREE.BufferGeometry();
    const partPos = partBase.slice();
    partGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
      color: hex("#D49C68"),
      size: 0.18,
      transparent: true,
      opacity: 0.40,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // ── 3. WIREFRAME SPHERES (PLANETS) WITH GLOWING CORES ──────────
    type SphereSpec = {
      radius: number;
      segments: number;
      pos: [number, number, number];
      color: string;
      opacity: number;
      rotSpeed: [number, number, number];
      coreR?: number;
      coreO?: number;
    };
    const sphereSpecs: SphereSpec[] = [
      { radius: 9,  segments: 14, pos: [18,  8, -18],  color: "#8A4F55", opacity: 0.14, rotSpeed: [0.003, 0.006, 0.002], coreR: 7,  coreO: 0.05 },
      { radius: 6,  segments: 12, pos: [-16, -7, -8],  color: "#E4A390", opacity: 0.18, rotSpeed: [0.005, 0.003, 0.007], coreR: 5,  coreO: 0.04 },
      { radius: 14, segments: 16, pos: [4, -15, -30],  color: "#D49C68", opacity: 0.08, rotSpeed: [0.002, 0.004, 0.003], coreR: 11, coreO: 0.03 },
      { radius: 4,  segments: 10, pos: [-10, 12,  2],  color: "#E4A390", opacity: 0.22, rotSpeed: [0.008, 0.004, 0.005] },
      { radius: 7,  segments: 12, pos: [25, -3, -12],  color: "#8A4F55", opacity: 0.12, rotSpeed: [0.003, 0.007, 0.004] },
      { radius: 5,  segments: 10, pos: [-28, 15, -15], color: "#D49C68", opacity: 0.20, rotSpeed: [0.004, 0.008, 0.003], coreR: 3.5, coreO: 0.05 },
      { radius: 8,  segments: 14, pos: [22, -18, -10], color: "#E4A390", opacity: 0.14, rotSpeed: [0.006, 0.002, 0.005], coreR: 6,   coreO: 0.04 },
      { radius: 11, segments: 16, pos: [-8, -22, -22], color: "#8A4F55", opacity: 0.10, rotSpeed: [0.002, 0.005, 0.004], coreR: 8,   coreO: 0.03 }
    ];
    
    const planets: Array<THREE.Group & {
      rotSpeed: [number, number, number];
      basePos: [number, number, number];
      driftPhase: number;
      driftSpeed: number;
      driftScale: [number, number, number];
      wireframeMesh: THREE.LineSegments;
    }> = [];

    sphereSpecs.forEach(({ radius, segments, pos, color, opacity, rotSpeed, coreR, coreO }) => {
      const group = new THREE.Group() as any;
      group.position.set(...pos);
      group.basePos = pos;
      group.rotSpeed = rotSpeed;
      group.driftPhase = Math.random() * Math.PI * 2;
      group.driftSpeed = rand(0.28, 0.35); // pergerakan bola 0.28 - 0.35
      group.driftScale = [rand(10, 20), rand(8, 16), rand(5, 11)]; // much wider drift range

      const sGeo = new THREE.SphereGeometry(radius, segments, Math.round(segments * 0.7));
      const wGeo = new THREE.WireframeGeometry(sGeo);
      const mat = new THREE.LineBasicMaterial({
        color: hex(color),
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const wireMesh = new THREE.LineSegments(wGeo, mat);
      group.add(wireMesh);
      group.wireframeMesh = wireMesh;
      sGeo.dispose();

      if (coreR !== undefined && coreO !== undefined) {
        const cGeo = new THREE.SphereGeometry(coreR, 16, 16);
        const cMat = new THREE.MeshBasicMaterial({
          color: hex(color),
          transparent: true,
          opacity: coreO,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const coreMesh = new THREE.Mesh(cGeo, cMat);
        group.add(coreMesh);
      }

      scene.add(group);
      planets.push(group);
    });

    // ── 5. ORBITING LIGHT ORBS ────────────────────────────────────
    type OrbSpec = {
      radius: number;
      color: string;
      orbitR: number;
      speed: number;
      offset: number;
      yBase: number;
      yWave: number;
    };
    const orbSpecs: OrbSpec[] = [
      { radius: 0.55, color: "#E4A390", orbitR: 22, speed: 0.28, offset: 0,    yBase: 6,  yWave: 4 },
      { radius: 0.40, color: "#D49C68", orbitR: 16, speed: 0.42, offset: 2.1,  yBase: -9, yWave: 3 },
      { radius: 0.30, color: "#8A4F55", orbitR: 30, speed: 0.18, offset: 4.2,  yBase: 10, yWave: 5 },
      { radius: 0.20, color: "#E4A390", orbitR: 12, speed: 0.55, offset: 1.05, yBase: -4, yWave: 2 },
    ];
    const orbs: Array<{ mesh: THREE.Mesh; spec: OrbSpec }> = [];
    orbSpecs.forEach((spec) => {
      const geo = new THREE.SphereGeometry(spec.radius, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: hex(spec.color),
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      orbs.push({ mesh, spec });
    });

    // ── 5b. MUSIC NOTES (KOMET / BINTANG BERACAKAN) ─────────────────
    const createNoteTexture = (char: string): THREE.Texture => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 128, 128);
        ctx.fillStyle = "#ffffff";
        ctx.font = '84px "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", sans-serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(char, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };

    const noteChars = ["♪", "♫", "♬", "♩", "♭", "♯"];
    const noteTextures = noteChars.map(char => createNoteTexture(char));

    type NoteSpec = {
      sprite: THREE.Sprite;
      baseX: number;
      baseY: number;
      baseZ: number;
      velX: number;
      velY: number;
      velZ: number;
      speed: number;
      rotSpeed: number;
      wobbleSpeed: number;
      phase: number;
      scale: number;
    };

    const notes: NoteSpec[] = [];
    const notesCount = 160; // Gantikan sebagian titik bintang dengan not balok agar terlihat lebih banyak
    const noteColors = ["#E4A390", "#D49C68", "#8A4F55"];

    for (let i = 0; i < notesCount; i++) {
      const tex = noteTextures[Math.floor(Math.random() * noteTextures.length)];
      const color = noteColors[Math.floor(Math.random() * noteColors.length)];
      
      const mat = new THREE.SpriteMaterial({
        map: tex,
        color: hex(color),
        transparent: true,
        opacity: rand(0.15, 0.45),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      
      const px = rand(-65, 65);
      const py = rand(-45, 45);
      const pz = rand(-30, 5);
      sprite.position.set(px, py, pz);
      
      const scale = rand(1.0, 2.0);
      sprite.scale.set(scale, scale, 1);
      
      scene.add(sprite);

      notes.push({
        sprite,
        baseX: px,
        baseY: py,
        baseZ: pz,
        velX: rand(1.5, 4.5),   // slide rightwards like a stream
        velY: rand(1.0, 3.2),   // slide upwards
        velZ: rand(-0.5, 0.5),
        speed: rand(0.8, 1.4),
        rotSpeed: rand(-1.0, 1.0),
        wobbleSpeed: rand(1.2, 2.8),
        phase: Math.random() * Math.PI * 2,
        scale,
      });
    }

    // ── 6. WAVE MESH GRID ─────────────────────────────────────────
    const WAVE_SEG = 50;
    const waveGeo = new THREE.PlaneGeometry(120, 100, WAVE_SEG, WAVE_SEG);
    const waveMat = new THREE.MeshBasicMaterial({
      color: hex("#4A3F40"),
      wireframe: true,
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 3.2;
    waveMesh.position.set(0, -22, -5);
    scene.add(waveMesh);
    const waveVerts = waveGeo.attributes.position.array as Float32Array;
    const waveBaseY = new Float32Array(waveVerts.length / 3);
    for (let i = 0; i < waveBaseY.length; i++) waveBaseY[i] = 0;

    // ── 7. SECOND WAVE (top, faint) ───────────────────────────────
    const waveGeo2 = new THREE.PlaneGeometry(120, 100, WAVE_SEG, WAVE_SEG);
    const waveMat2 = new THREE.MeshBasicMaterial({
      color: hex("#8A4F55"),
      wireframe: true,
      transparent: true,
      opacity: 0.035,
      depthWrite: false,
    });
    const waveMesh2 = new THREE.Mesh(waveGeo2, waveMat2);
    waveMesh2.rotation.x = Math.PI / 3.5;
    waveMesh2.position.set(0, 24, -10);
    scene.add(waveMesh2);
    const waveVerts2 = waveGeo2.attributes.position.array as Float32Array;

    // ── Mouse tracking ────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const camTarget = { x: 0, y: 0 };
    const camCurrent = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5);
      mouse.y = (e.clientY / window.innerHeight - 0.5);
      camTarget.x = mouse.x * 5;
      camTarget.y = -mouse.y * 3.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────
    let rafId: number;
    const t0 = performance.now();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = (performance.now() - t0) / 1000;

      // Stars drift
      const stars = scene.getObjectByName("stars") as THREE.Points;
      if (stars) {
        stars.rotation.y = t * 0.006;
        stars.rotation.x = t * 0.002;
      }

      // Floating particles drift
      const pa = partGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PART_N; i++) {
        pa[i * 3]     = partBase[i * 3]     + Math.sin(t * 0.35 + partPhase[i]) * 2.5;
        pa[i * 3 + 1] = partBase[i * 3 + 1] + Math.cos(t * 0.28 + partPhase[i] + 1) * 2.5;
        pa[i * 3 + 2] = partBase[i * 3 + 2] + Math.sin(t * 0.22 + partPhase[i] + 2) * 1.5;
      }
      partGeo.attributes.position.needsUpdate = true;

      // Rotate and drift wireframe spheres (planets) in slow motion
      planets.forEach((planet) => {
        planet.wireframeMesh.rotation.x += planet.rotSpeed[0];
        planet.wireframeMesh.rotation.y += planet.rotSpeed[1];
        planet.wireframeMesh.rotation.z += planet.rotSpeed[2];

        const dx = Math.sin(t * planet.driftSpeed + planet.driftPhase) * planet.driftScale[0];
        const dy = Math.cos(t * planet.driftSpeed * 0.8 + planet.driftPhase + 1) * planet.driftScale[1];
        const dz = Math.sin(t * planet.driftSpeed * 1.2 + planet.driftPhase + 2) * planet.driftScale[2];

        planet.position.set(
          planet.basePos[0] + dx,
          planet.basePos[1] + dy,
          planet.basePos[2] + dz
        );
      });

      // Update Music Notes (comet-like movement)
      notes.forEach((note) => {
        note.baseX += note.velX * note.speed * 0.016;
        note.baseY += note.velY * note.speed * 0.016;
        note.baseZ += note.velZ * note.speed * 0.016;

        const wobbleX = Math.sin(t * note.wobbleSpeed + note.phase) * 1.8;
        const wobbleY = Math.cos(t * note.wobbleSpeed * 0.8 + note.phase) * 1.8;

        note.sprite.position.set(
          note.baseX + wobbleX,
          note.baseY + wobbleY,
          note.baseZ
        );

        note.sprite.material.rotation += note.rotSpeed * 0.016;

        // Pulse opacity slightly and fade out near boundaries
        const distFromCenter = Math.abs(note.baseX);
        const edgeFade = Math.max(0, 1.0 - distFromCenter / 75);
        note.sprite.material.opacity = (0.18 + Math.sin(t * 1.8 + note.phase) * 0.10) * edgeFade;

        // Wrap around when off-screen
        if (note.baseX > 75 || note.baseY > 55) {
          note.baseX = rand(-75, -55);
          note.baseY = rand(-55, -35);
          note.baseZ = rand(-30, 5);
          note.sprite.position.set(note.baseX, note.baseY, note.baseZ);
        }
      });

      // Orbit light orbs
      orbs.forEach(({ mesh, spec }) => {
        const angle = t * spec.speed + spec.offset;
        mesh.position.x = Math.cos(angle) * spec.orbitR;
        mesh.position.z = Math.sin(angle) * spec.orbitR - 12;
        mesh.position.y = spec.yBase + Math.sin(t * 0.4 + spec.offset) * spec.yWave;
      });

      // Animate wave mesh (bottom)
      for (let i = 0; i < waveVerts.length / 3; i++) {
        const x = waveVerts[i * 3];
        const z = waveVerts[i * 3 + 2];
        waveVerts[i * 3 + 1] = Math.sin((x + t * 1.2) * 0.12) * 2.5 + Math.cos((z + t * 0.8) * 0.12) * 2;
      }
      waveGeo.attributes.position.needsUpdate = true;

      // Animate wave mesh (top)
      for (let i = 0; i < waveVerts2.length / 3; i++) {
        const x = waveVerts2[i * 3];
        const z = waveVerts2[i * 3 + 2];
        waveVerts2[i * 3 + 1] = Math.sin((x - t * 0.9) * 0.10) * 2 + Math.cos((z + t * 1.1) * 0.10) * 1.8;
      }
      waveGeo2.attributes.position.needsUpdate = true;

      // Smooth camera parallax
      const lerpK = 0.04;
      camCurrent.x += (camTarget.x - camCurrent.x) * lerpK;
      camCurrent.y += (camTarget.y - camCurrent.y) * lerpK;

      camera.position.x = camCurrent.x + Math.sin(t * 0.07) * 1.5;
      camera.position.y = camCurrent.y + Math.cos(t * 0.05) * 1.2;
      camera.position.z = 35 + Math.sin(t * 0.04) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments || obj instanceof THREE.Sprite) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      noteTextures.forEach(t => t.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, width: "100%", height: "100%" }}
    />
  );
}
