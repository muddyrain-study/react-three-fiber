import "./App.css";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 4, 4] }}>
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
          {/* <Environment files={"./assets/texture/024.hdr"} background /> */}
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
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    THREE.TextureLoader,
    [
      "/assets/texture/PavingStones092_1K_Color.jpg",
      "/assets/texture/PavingStones092_1K_Displacement.jpg",
      "/assets/texture/PavingStones092_1K_Normal.jpg",
      "/assets/texture/PavingStones092_1K_Roughness.jpg",
      "/assets/texture/PavingStones092_1K_AmbientOcclusion.jpg",
    ]
  );
  // const gltf = useLoader(GLTFLoader, "./assets/model/pad.gltf");
  // return <primitive object={gltf.scene} />;
  return (
    <mesh>
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial
        map={colorMap}
        displacementScale={0.3}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  );
}

function InfoThree() {
  const { camera, gl } = useThree();
  console.log(camera, gl);
  return null;
}

export default App;
