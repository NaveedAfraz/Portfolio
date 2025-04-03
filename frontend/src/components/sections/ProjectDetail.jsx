import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { GradientText } from '../magicui/gradient-text';
import { Spotlight } from '../magicui/spotlight';
import { projectsData } from '../../config/projectsData';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the project with the matching ID
    const foundProject = projectsData.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  // Use gradientFrom and gradientTo for background if available, otherwise fallback to color
  const bgStyle = project.gradientFrom && project.gradientTo
    ? { background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }
    : { backgroundColor: project.color || '#333' };

  return (
    <div className="min-h-screen" style={bgStyle}>
      <Spotlight className="w-full min-h-screen py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white sour-gummy">
                <GradientText 
                  gradient="from-white to-white/80"
                  className="text-3xl md:text-5xl font-bold"
                >
                  {project.title}
                </GradientText>
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-white/15 text-white text-sm rounded-full hover:bg-white/25 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <p className="text-white/90 text-lg mb-8">
                {project.detailedDescription || project.description}
              </p>
              
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-white text-black hover:bg-white/90 transition-colors">
                    Visit Project
                  </Button>
                </a>
              )}
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.src = '/images/placeholder-project.png';
                }}
              />
            </div>
          </div>
        </div>
      </Spotlight>
    </div>
  );
};

export default ProjectDetail;
