import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
function App() {
  return (
    <div className="App">
      <Canvas>
        <BoxRotation />
        {/* 环境光 */}
        <ambientLight args={[0xffffff, 1]} intensity={0.5} />
        {/* 平行光 */}
        <directionalLight
          args={[0xffffff]}
          position={[0, 5, 5]}
          intensity={0.5}
        />
        <OrbitControls autoRotate />
        <InfoThree />
      </Canvas>
    </div>
  );
}

function BoxRotation() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.getElapsedTime();
    mesh.current.rotation.y = clock.getElapsedTime();
  });
  const handleClick = (event) => {
    console.log(event);
    event.eventObject.material.color.set("red");
  };
  return (
    <mesh ref={mesh} onClick={handleClick}>
      <boxGeometry />
      <meshBasicMaterial />
    </mesh>
  );
}

function InfoThree() {
  const { camera, gl } = useThree();
  console.log(camera, gl);
  return null;
}

export default App;
