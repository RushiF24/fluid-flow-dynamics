import { Text } from '@react-three/drei';

const labels: { text: string; position: [number, number, number] }[] = [
  { text: 'UGR Tank', position: [-5, 0.9, 2] },
  { text: 'Submersible Pump', position: [-5, -3.5, 0] },
  { text: 'Flow Meter', position: [-3, 1.4, 0] },
  { text: 'Pressure TX', position: [-1, 1.4, 0] },
  { text: 'Actuated Valve', position: [1.5, 1.3, 0] },
  { text: 'Bypass Line', position: [1.25, 2.15, 0] },
  { text: 'Discharge Line', position: [4, 1.2, 0] },
  { text: 'Building', position: [6, 8.6, 0] },
];

const Labels = () => (
  <group>
    {labels.map(({ text, position }) => (
      <Text
        key={text}
        position={position}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        {text}
      </Text>
    ))}
  </group>
);

export default Labels;
