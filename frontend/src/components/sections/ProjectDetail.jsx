import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { GradientText } from '../magicui/gradient-text';
import { Spotlight } from '../magicui/spotlight';

// Project data - matching your screenshots
const projectsData = [
  {
    id: 'carf-curacao',
    title: 'CARF Curacao',
    logo: 'amigo',
    color: '#FFA500', // Orange background
    description: 'Transformed an outdated WordPress site (with a clunky 1945-era ShelterManager API) into a modern dog-adoption funnel. Implemented filters for adoptable dogs, sanctuary dogs, and highly adoptable dogs. Introduced a Tinder-style swiping mechanism to match prospective adopters with dogs quickly, and a global WhatsApp CTA for immediate contact with the shelter. All built over a single weekend using Next.js, Tailwind, Shadcn, and Supabase for storing swipes.',
    technologies: ['Next.js', 'Shadcn', 'Tailwind', 'Supabase', 'Weekend Build', 'ShelterManager'],
    image: '/carf-project.png',
    link: 'https://example.com/carf'
  },
  {
    id: 'watt-watt',
    title: 'Watt Watt',
    logo: 'wattwatt',
    color: '#4CAF50', // Green background
    description: 'Developed WattWatt.nl website based on Figma designs. Coded with Next.js and Tailwind, including form integrations with Zapier and Google Sheets for backend functionality.',
    technologies: ['Next.js', 'Tailwind CSS', 'Figma Implementation'],
    image: '/watt-project.png',
    link: 'https://wattwatt.nl'
  },
  {
    id: 'daccs',
    title: 'Daccs',
    logo: 'daccs',
    color: '#2196F3', // Blue background
    description: 'UI Development and full-stack implementation with MySQL database integration. Built on AWS infrastructure for scalability and reliability.',
    technologies: ['Node.js', 'UI Development', 'MySQL', 'AWS'],
    image: '/daccs-project.png',
    link: 'https://example.com/daccs'
  },
  {
    id: 'perspectivity',
    title: 'Perspectivity',
    logo: 'perspectivity',
    color: '#9C27B0', // Purple background
    description: 'Full software lifecycle implementation with Python and NLP capabilities. Developed cloud infrastructure and extensive data processing pipelines.',
    technologies: ['Python', 'NLP', 'Cloud Infrastructure', 'Full Software Lifecycle'],
    image: '/perspectivity-project.png',
    link: 'https://example.com/perspectivity'
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    // Find the project that matches the ID
    const foundProject = projectsData.find(p => p.id === id);
    setProject(foundProject);
    
    // Set background color based on project
    if (foundProject) {
      document.body.style.backgroundColor = foundProject.color;
      // Add a class to handle text color contrast
      document.body.classList.add('project-detail-open');
    }
    
    // Cleanup function
    return () => {
      document.body.style.backgroundColor = '';
      document.body.classList.remove('project-detail-open');
    };
  }, [id]);
  
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <Spotlight
      className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8"
      spotlightClassName="bg-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to projects
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2 text-white">
                <GradientText 
                  gradient="from-white to-white/70"
                  className="text-4xl md:text-5xl font-bold"
                >
                  {project.title}
                </GradientText>
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-white text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 text-lg">{project.description}</p>
            </div>
            
            <div className="mt-8">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  className="bg-white text-black hover:bg-white/90 transition-colors"
                >
                  View Live Project
                </Button>
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <img 
                src={project.image || '/placeholder-project.png'} 
                alt={project.title}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.src = '/placeholder-project.png';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Spotlight>
  );
};

export default ProjectDetail;
