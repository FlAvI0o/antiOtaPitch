import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

function WindowPanel({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.35, 0.45, 0.05]} />
      <meshStandardMaterial
        color="#c8d4e8"
        emissive="#446688"
        emissiveIntensity={0.35}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  )
}

function Step({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#1c1c1c" roughness={0.55} metalness={0.15} />
    </mesh>
  )
}

export function ApartmentScene() {
  const root = useRef<Group>(null)

  useFrame((_, delta) => {
    if (root.current) {
      root.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group ref={root}>
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.4, 1.6]} />
        <meshStandardMaterial color="#242424" roughness={0.45} metalness={0.25} />
      </mesh>

      <mesh position={[0, 2.55, 0]} castShadow>
        <boxGeometry args={[1.4, 0.35, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.2} />
      </mesh>

      <WindowPanel position={[-0.55, 1.35, 0.82]} />
      <WindowPanel position={[0.55, 1.35, 0.82]} />
      <WindowPanel position={[0, 0.75, 0.82]} />

      <Step position={[-1.35, 0.15, 0.4]} size={[0.55, 0.3, 0.7]} />
      <Step position={[-1.35, 0.45, 0.55]} size={[0.55, 0.3, 0.85]} />
      <Step position={[-1.35, 0.75, 0.7]} size={[0.55, 0.3, 1]} />
      <Step position={[-1.35, 1.05, 0.85]} size={[0.55, 0.3, 1.15]} />

      <mesh position={[0.95, 0.08, 0.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
    </group>
  )
}
