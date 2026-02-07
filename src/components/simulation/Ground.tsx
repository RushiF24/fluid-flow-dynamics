const Ground = () => {
  return (
    <group>
      {/* Main ground surface — starts at cutaway edge and extends right */}
      <mesh position={[3.5, -0.05, 0]} receiveShadow>
        <boxGeometry args={[17, 0.1, 14]} />
        <meshStandardMaterial color="#3d6b35" />
      </mesh>

      {/* Cross-section face — earth layers */}
      {/* Topsoil */}
      <mesh position={[-2.5, -0.25, 0]}>
        <boxGeometry args={[0.25, 0.5, 14]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Clay */}
      <mesh position={[-2.5, -1.2, 0]}>
        <boxGeometry args={[0.25, 1.4, 14]} />
        <meshStandardMaterial color="#795548" />
      </mesh>
      {/* Rock */}
      <mesh position={[-2.5, -2.9, 0]}>
        <boxGeometry args={[0.25, 2, 14]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>

      {/* Underground floor */}
      <mesh position={[-5.5, -3.95, 0]} receiveShadow>
        <boxGeometry args={[6, 0.1, 14]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>

      {/* Back wall underground */}
      <mesh position={[-8.5, -2, 0]}>
        <boxGeometry args={[0.1, 4, 14]} />
        <meshStandardMaterial color="#4e342e" />
      </mesh>
    </group>
  );
};

export default Ground;
