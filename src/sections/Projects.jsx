import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

// 📌 Project Data
const myProjects = [
  {
    title: 'Flipkart Clone',
    desc: 'A full-stack e-commerce platform inspired by Flipkart, featuring product listings, authentication, and a cart system.',
    subdesc: 'Built with React,Context Api, Tailwind CSS, JavaScript',
    tags: [
      { name: 'React', path: '/assets/react.svg' },
      { name: 'Tailwind', path: '/assets/tailwindcss.png' },
      { name: 'JavaScript', path: '/assets/javascript.png' },
    ],
    spotlight: '/assets/spotlight1.png',
    logo: '/assets/flipkart.png',
    logoStyle: { backgroundColor: '#FEF3C7' },
    href: 'https://cart-router.vercel.app',
    texture: '/assets/flipkart-texture.jpg',
  },
  {
    title: 'Netflix Clone Deployment - DevSecOps Project',
    desc: 'Dockerized the application for scalable deployment. Integrated SonarQube & Trivy for CI/CD security checks. Automated CI/CD with Jenkins for efficient deployment. Installed Prometheus & Grafana for real-time monitoring. Set up a scalable EKS cluster with node groups. Utilized Helm charts for streamlined deployment & monitoring. Leveraged ArgoCD for declarative continuous delivery.',
    subdesc: '',
    tags: [
      { name: 'AWS', path: '/assets/aws.png' },
      { name: 'Docker', path: '/assets/docker.png', logoStyle: { backgroundColor: '#000000' } },
      { name: 'Jenkins', path: '/assets/jenkins.png' },
      { name: 'Grafana', path: '/assets/grafana.png' },
    ],

    spotlight: '/assets/spotlight2.png',
    logo: '/assets/netflix.png',
    logoStyle: { backgroundColor: '#000000' },
    href: '',
    texture: '/assets/netflix-texture.jpg',
  },
  {
    title: 'Educational Platform Landing Page - Built with HTML, CSS & Tailwind CSS',

    desc: 'Designed and developed a responsive educational platform landing page using HTML, CSS, and Tailwind CSS. The page features a modern UI with seamless navigation, interactive course listings, and a structured layout optimized for user engagement. Ensured mobile responsiveness and accessibility for an enhanced learning experience.',
    subdesc: '',
    tags: [
      { name: 'HTML', path: '/assets/html.png' },
      { name: 'CSS', path: '/assets/css.png' },
      { name: 'Tailwind CSS', path: '/assets/tailwindcss.png' },
    ],
    spotlight: '/assets/figma.png',
    logo: '/assets/figma.png',
    logoStyle: { backgroundColor: '#000000' },
    href: 'https://rahulachuz.neocities.org/askmeproject/',
    texture: '/assets/figma-texture.jpg',
  },
  {
    title: 'Brainwave.io – Modern SaaS Landing Page',

    desc: 'Brainwave.io is a sleek and responsive SaaS landing page built using HTML, CSS, Tailwind CSS, and React. This project features a modern UI with intuitive navigation, engaging content sections, and a fully responsive layout. It includes key sections such as project management, time tracking, testimonials, and pricing plans. Optimized for performance and usability, Brainwave.io provides a seamless experience for users looking to explore and engage with the platform',
    subdesc: '',
    tags: [
      { name: 'React', path: '/assets/react.svg' },
      { name: 'HTML', path: '/assets/html.png' },
      { name: 'CSS', path: '/assets/css.png' },
      { name: 'Tailwind CSS', path: '/assets/tailwindcss.png' },
    ],
    spotlight: '/assets/figma.png',
    logo: '/assets/figma.png',
    logoStyle: { backgroundColor: '#000000' },
    href: 'https://trail-examples.vercel.app/#',
    texture: '/assets/figma-texture.jpg',
  },
  {
    title: 'Trabook – Travel Booking & Tour Management Platform',

    desc: 'Trabook is a dynamic and user-friendly travel booking platform built using HTML, CSS, Tailwind CSS, and React. This project features an intuitive UI for seamless travel planning, including destination selection, tour packages, pricing comparisons, and exclusive travel offers. It provides a smooth user experience with interactive elements for trip booking, customer testimonials, and travel blogs. Designed for performance and responsiveness, Trabook ensures an engaging and hassle-free journey for travelers worldwide.',
    subdesc: '',
    tags: [
      { name: 'HTML', path: '/assets/html.png' },
      { name: 'CSS', path: '/assets/css.png' },
      { name: 'Tailwind CSS', path: '/assets/tailwindcss.png' },
    ],
    spotlight: '/assets/figma.png',
    logo: '/assets/figma.png',
    logoStyle: { backgroundColor: '#000000' },
    href: 'https://rahulachuz.neocities.org/trabook/',
    texture: '/assets/figma-texture.jpg',
  },
];

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const textRef = useRef(null);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useEffect(() => {
    console.log('Current project:', myProjects[selectedProjectIndex]);
  }, [selectedProjectIndex]);

  useGSAP(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out', delay: 0.3 },
      );
    }
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text">Projects I`ve Worked On</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        {/* Left Section: Project Info */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          {/* Spotlight Image */}
          <div className="absolute top-0 right-0">
            <img src="/assets/spotlight1.png" alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
          </div>

          {/* Logo */}
          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img
              className="w-10 h-10 shadow-sm"
              src={currentProject.logo || 'https://via.placeholder.com/40'}
              alt="logo"
            />
          </div>

          {/* Project Info */}
          <div className="flex flex-col gap-5 text-white-600 my-5" ref={textRef}>
            <p className="text-white text-2xl font-semibold">{currentProject.title}</p>
            <p>{currentProject.desc}</p>
            <p>{currentProject.subdesc}</p>
          </div>

          {/* Tags */}
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img
                    src={tag.path}
                    alt={tag.name}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/30')}
                  />
                </div>
              ))}
            </div>

            {/* View Project Button */}
            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer">
              <p>View Project</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-7">
            <button className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="left arrow" />
            </button>
            <button className="arrow-btn" onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Section: 3D Model */}
        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  {console.log('Rendering DemoComputer with texture:', currentProject.texture)}
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
