import "./App.css";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 2, 2] }}>
        {/* <BoxRotation /> */}
        {/* 环境光 */}
        <ambientLight args={[0xffffff, 1]} intensity={0.5} />
        {/* 平行光 */}
        <directionalLight
          args={[0xffffff]}
          position={[0, 5, 5]}
          intensity={0.5}
        />
        <OrbitControls autoRotate />
        {/* <InfoThree /> */}
        <Suspense fallback={null}>
          <Model />
          <Environment files={"./assets/texture/024.hdr"} background />
        </Suspense>
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

function Model() {
  const gltf = useLoader(GLTFLoader, "./assets/model/pad.gltf");
  return <primitive object={gltf.scene} />;
}

function InfoThree() {
  const { camera, gl } = useThree();
  console.log(camera, gl);
  return null;
}

export default App;
