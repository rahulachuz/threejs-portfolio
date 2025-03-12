import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

// Updated projects: Flipkart Clone, Netflix Clone, Figma Landing Pages
const myProjects = [
  {
    title: 'Flipkart Clone',
    desc: 'A full-stack e-commerce platform inspired by Flipkart, featuring product listings, authentication, and a cart system.',
    subdesc: 'Built with React, Redux, Node.js, Express, and MongoDB.',
    tags: [
      { name: 'React', path: '/assets/react.svg' },
      { name: 'Redux', path: '/assets/redux.svg' },
      { name: 'MongoDB', path: '/assets/mongodb.svg' },
    ],
    spotlight: '/assets/flipkart-preview.png',
    logo: '/assets/flipkart-logo.png',
    logoStyle: { backgroundColor: '#2874f0' },
    href: 'https://flipkart-clone.example.com',
    texture: '/assets/flipkart-texture.jpg',
  },
  {
    title: 'Netflix Clone',
    desc: 'A video streaming web app that mimics Netflix UI with authentication and API-based movie listings.',
    subdesc: 'Developed using React, Firebase Authentication, and TMDB API.',
    tags: [
      { name: 'React', path: '/assets/react.svg' },
      { name: 'Firebase', path: '/assets/firebase.svg' },
      { name: 'TMDB API', path: '/assets/api.svg' },
    ],
    spotlight: '/assets/netflix-preview.png',
    logo: '/assets/netflix-logo.png',
    logoStyle: { backgroundColor: '#E50914' },
    href: 'https://netflix-clone.example.com',
    texture: '/assets/netflix-texture.jpg',
  },
  {
    title: 'Figma Landing Pages',
    desc: 'Designed and developed responsive landing pages from Figma mockups.',
    subdesc: 'Converted high-fidelity Figma designs into pixel-perfect Tailwind CSS and React components.',
    tags: [
      { name: 'Figma', path: '/assets/figma.svg' },
      { name: 'Tailwind CSS', path: '/assets/tailwind.svg' },
      { name: 'React', path: '/assets/react.svg' },
    ],
    spotlight: '/assets/figma-preview.png',
    logo: '/assets/figma-logo.png',
    logoStyle: { backgroundColor: '#0ACF83' },
    href: 'https://figma-landing-page.example.com',
    texture: '/assets/figma-texture.jpg',
  },
];

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text">Projects I`ve Worked On</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer">
              <p>View Project</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>

            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
