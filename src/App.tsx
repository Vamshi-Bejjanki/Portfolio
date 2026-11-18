import About from './components/About';
import Background from './components/Background';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
