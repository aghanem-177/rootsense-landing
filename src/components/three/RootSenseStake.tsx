import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

interface RootSenseStakeProps {
  explodeState?: number
  autoRotate?: boolean
  rotateSpeed?: number
}

/* PBR material helpers */
function ceramicMaterial() {
  return new THREE.MeshStandardMaterial({
    color: '#C47A4A',
    roughness: 0.75,
    metalness: 0.0,
  })
}

function steelMaterial() {
  return new THREE.MeshStandardMaterial({
    color: '#C0C0C8',
    roughness: 0.2,
    metalness: 0.85,
  })
}

function housingMaterial() {
  return new THREE.MeshStandardMaterial({
    color: '#5A6B3A',
    roughness: 0.6,
    metalness: 0.1,
  })
}

function brassMaterial() {
  return new THREE.MeshStandardMaterial({
    color: '#C5A54E',
    roughness: 0.3,
    metalness: 0.8,
  })
}

function tubingMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    roughness: 0.1,
    metalness: 0.0,
    transmission: 0.85,
    thickness: 0.5,
    transparent: true,
    opacity: 0.4,
  })
}

function lcdMaterial() {
  return new THREE.MeshStandardMaterial({
    color: '#1A2A1A',
    roughness: 0.3,
    metalness: 0.1,
    emissive: '#2A4A2A',
    emissiveIntensity: 0.5,
  })
}

/* Geometries */
function createConeGeometry() {
  // Tapered cone tip
  return new THREE.ConeGeometry(0.18, 1.0, 64)
}

function createShaftGeometry() {
  return new THREE.CylinderGeometry(0.2, 0.2, 2.5, 64)
}

function createHousingGeometry() {
  // Rounded housing body using a capsule-like shape
  const shape = new THREE.Shape()
  const w = 0.55
  const h = 0.7
  const r = 0.15
  shape.moveTo(-w + r, -h)
  shape.lineTo(w - r, -h)
  shape.quadraticCurveTo(w, -h, w, -h + r)
  shape.lineTo(w, h - r)
  shape.quadraticCurveTo(w, h, w - r, h)
  shape.lineTo(-w + r, h)
  shape.quadraticCurveTo(-w, h, -w, h - r)
  shape.lineTo(-w, -h + r)
  shape.quadraticCurveTo(-w, -h, -w + r, -h)

  const extrudeSettings = { depth: 0.8, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 8 }
  return new THREE.ExtrudeGeometry(shape, extrudeSettings)
}

export default function RootSenseStake({
  explodeState = 0,
  autoRotate = true,
  rotateSpeed = 0.5,
}: RootSenseStakeProps) {
  const groupRef = useRef<Group>(null)
  const coneRef = useRef<Group>(null)
  const shaftRef = useRef<Group>(null)
  const housingRef = useRef<Group>(null)
  const lcdRef = useRef<Group>(null)
  const fittingsRef = useRef<Group>(null)

  // Explode offsets for each state
  const explodeOffsets = useMemo(() => ({
    cone:     [0, 0, 0, 0, 0, 0],
    shaft:    [0, 0, 0, 0, 0, 0],
    housing:  [0, 0, 0, 0, 0, 0],
    lcd:      [0, 0, 0, 0, 0, 0],
    fittings: [0, 0, 0, 0, 0, 0],
  }), [])

  // Target positions based on explode state
  const targets = useMemo(() => {
    switch (explodeState) {
      case 1: // Ceramic Cone exploded
        return { cone: -2.0, shaft: 0, housing: 0, lcd: 0, fittings: 0 }
      case 2: // Steel Shaft exploded
        return { cone: -2.0, shaft: -0.8, housing: 0.8, lcd: 0.8, fittings: 0.8 }
      case 3: // Sensor Head exploded
        return { cone: -2.0, shaft: -0.8, housing: 2.0, lcd: 2.0, fittings: 2.0 }
      case 4: // LCD zoom
        return { cone: -2.5, shaft: -1.5, housing: 2.5, lcd: 2.5, fittings: 2.5 }
      case 5: // Brass fittings exploded
        return { cone: -2.5, shaft: -1.5, housing: 1.5, lcd: 1.5, fittings: 3.5 }
      default: // Assembled
        return { cone: 0, shaft: 0, housing: 0, lcd: 0, fittings: 0 }
    }
  }, [explodeState])

  void explodeOffsets // suppress unused warning

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate && explodeState === 0) {
      groupRef.current.rotation.y += delta * rotateSpeed
    }

    // Smooth lerp to target positions
    const lerpSpeed = 4
    if (coneRef.current) {
      coneRef.current.position.y = THREE.MathUtils.lerp(
        coneRef.current.position.y,
        -1.75 + targets.cone,
        delta * lerpSpeed
      )
    }
    if (shaftRef.current) {
      shaftRef.current.position.y = THREE.MathUtils.lerp(
        shaftRef.current.position.y,
        0 + targets.shaft,
        delta * lerpSpeed
      )
    }
    if (housingRef.current) {
      housingRef.current.position.y = THREE.MathUtils.lerp(
        housingRef.current.position.y,
        1.6 + targets.housing,
        delta * lerpSpeed
      )
    }
    if (lcdRef.current) {
      lcdRef.current.position.y = THREE.MathUtils.lerp(
        lcdRef.current.position.y,
        1.85 + targets.lcd,
        delta * lerpSpeed
      )
    }
    if (fittingsRef.current) {
      fittingsRef.current.position.y = THREE.MathUtils.lerp(
        fittingsRef.current.position.y,
        2.0 + targets.fittings,
        delta * lerpSpeed
      )
    }
  })

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0.15]} scale={0.8}>
      {/* Ceramic Cone Tip */}
      <group ref={coneRef} position={[0, -1.75, 0]}>
        <mesh geometry={createConeGeometry()} material={ceramicMaterial()} castShadow>
          <meshStandardMaterial
            color="#C47A4A"
            roughness={0.75}
            metalness={0.0}
          />
        </mesh>
      </group>

      {/* Stainless Steel Shaft */}
      <group ref={shaftRef} position={[0, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 2.5, 64]} />
          <meshStandardMaterial
            color="#C0C0C8"
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>
        {/* Transition ring at top of shaft */}
        <mesh position={[0, 1.25, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.22, 0.1, 64]} />
          <meshStandardMaterial color="#C5A54E" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Sensor Head Housing */}
      <group ref={housingRef} position={[0, 1.6, 0]}>
        {/* Main body */}
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.35, 0.6, 16, 32]} />
          <meshStandardMaterial
            color="#5A6B3A"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        {/* Handle/grip extension */}
        <mesh castShadow position={[0.5, 0.4, 0]} rotation={[0, 0, -0.7]}>
          <capsuleGeometry args={[0.18, 0.5, 8, 32]} />
          <meshStandardMaterial
            color="#5A6B3A"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* LCD Display */}
      <group ref={lcdRef} position={[0, 1.85, 0.36]}>
        <mesh>
          <planeGeometry args={[0.4, 0.25]} />
          <meshStandardMaterial
            color="#0A1A0A"
            roughness={0.3}
            metalness={0.1}
            emissive="#1A3A1A"
            emissiveIntensity={0.8}
          />
        </mesh>
        <Text
          position={[0, 0.03, 0.01]}
          fontSize={0.06}
          color="#4AE04A"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          pH 6.8 | EC 2.4
        </Text>
        <Text
          position={[0, -0.05, 0.01]}
          fontSize={0.05}
          color="#3BC03B"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          MOISTURE OK
        </Text>
      </group>

      {/* Brass Fittings & Tubing connectors */}
      <group ref={fittingsRef} position={[0, 2.0, 0]}>
        {/* Top fitting */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.15, 0.15, 32]} />
          <meshStandardMaterial color="#C5A54E" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Side fitting */}
        <mesh position={[0.6, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.2, 32]} />
          <meshStandardMaterial color="#C5A54E" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Tubing from top */}
        <mesh position={[0, 0.55, 0]}>
          <tubeGeometry
            args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0.1, 0.3, 0.1),
                new THREE.Vector3(0.3, 0.5, 0.15),
                new THREE.Vector3(0.5, 0.6, 0),
              ]),
              32,
              0.04,
              8,
              false,
            ]}
          />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.0}
            transmission={0.85}
            thickness={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Tubing from side */}
        <mesh position={[0.7, 0.15, 0]}>
          <tubeGeometry
            args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0.2, -0.1, 0.1),
                new THREE.Vector3(0.4, -0.3, 0),
                new THREE.Vector3(0.5, -0.5, -0.1),
              ]),
              32,
              0.035,
              8,
              false,
            ]}
          />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.0}
            transmission={0.85}
            thickness={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  )
}

// Suppress unused material factory warnings in build
void ceramicMaterial
void steelMaterial
void housingMaterial
void brassMaterial
void tubingMaterial
void lcdMaterial
void createShaftGeometry
void createHousingGeometry
