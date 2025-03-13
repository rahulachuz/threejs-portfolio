import { useEffect, useRef, useState } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const loadFBX = (path) => {
  const loader = new FBXLoader();
  return new Promise((resolve, reject) => {
    loader.load(path, resolve, undefined, reject);
  });
};

const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef();
  const { scene } = useGLTF('/models/animations/developer.glb');
  const clone = scene ? SkeletonUtils.clone(scene) : null;
  const { nodes, materials } = useGraph(clone || { nodes: {}, materials: {} });

  // ✅ Store animations in state to prevent re-render issues
  const [animationsList, setAnimationsList] = useState([]);

  useEffect(() => {
    const loadAnimations = async () => {
      const animations = await Promise.all([
        loadFBX('/models/animations/idle.fbx'),
        loadFBX('/models/animations/salute.fbx'),
        loadFBX('/models/animations/clapping.fbx'),
        loadFBX('/models/animations/victory.fbx'),
      ]);

      const loadedAnimations = animations
        .map((anim, index) => {
          if (anim.animations[0]) anim.animations[0].name = ['idle', 'salute', 'clapping', 'victory'][index];
          return anim.animations[0] || null;
        })
        .filter(Boolean);

      setAnimationsList(loadedAnimations);
    };

    loadAnimations();
  }, []);

  const { actions } = useAnimations(animationsList, group);

  useEffect(() => {
    if (actions && actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
      return () => {
        actions[animationName].fadeOut(0.5);
        actions[animationName].stop();
      };
    }
  }, [animationName, actions]);

  if (!clone) return null;

  return (
    <group ref={group} {...props} dispose={null}>
      {nodes?.Hips && <primitive object={nodes.Hips} />}
      {[
        'Wolf3D_Hair',
        'Wolf3D_Glasses',
        'Wolf3D_Body',
        'Wolf3D_Outfit_Bottom',
        'Wolf3D_Outfit_Footwear',
        'Wolf3D_Outfit_Top',
        'EyeLeft',
        'EyeRight',
        'Wolf3D_Head',
        'Wolf3D_Teeth',
      ].map((name) =>
        nodes?.[name] ? (
          <skinnedMesh
            key={name}
            name={name}
            geometry={nodes[name]?.geometry}
            material={materials[nodes[name]?.material?.name]}
            skeleton={nodes[name]?.skeleton}
            morphTargetDictionary={nodes[name]?.morphTargetDictionary}
            morphTargetInfluences={nodes[name]?.morphTargetInfluences}
          />
        ) : null,
      )}
    </group>
  );
};

useGLTF.preload('/models/animations/developer.glb');

export default Developer;
