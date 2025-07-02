import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ProjectCard from '@/components/organisms/ProjectCard'
import TestimonialCard from '@/components/organisms/TestimonialCard'
import ContactForm from '@/components/molecules/ContactForm'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import freelancerService from '@/services/api/freelancerService'
import projectService from '@/services/api/projectService'
import testimonialService from '@/services/api/testimonialService'

const PortfolioDetailPage = () => {
  const { id } = useParams()
  const [freelancer, setFreelancer] = useState(null)
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showContactForm, setShowContactForm] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setError('')
    
    try {
      const [freelancerData, projectsData, testimonialsData] = await Promise.all([
        freelancerService.getById(parseInt(id)),
        projectService.getByFreelancerId(parseInt(id)),
        testimonialService.getByFreelancerId(parseInt(id))
      ])
      
      setFreelancer(freelancerData)
      setProjects(projectsData)
      setTestimonials(testimonialsData)
    } catch (err) {
      setError('Failed to load freelancer details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  if (loading) return <Loading type="detail" />
  if (error) return <Error message={error} onRetry={loadData} />
  if (!freelancer) return <Error message="Freelancer not found" />

  return (
    <div className="min-h-screen bg-background text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            Back to Browse
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 lg:p-12 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <motion.img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-gradient-primary"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-3">
                    {freelancer.name}
                  </h1>
                  <p className="text-xl text-slate-300 mb-4">{freelancer.title}</p>
                  
                  <div className="flex flex-wrap gap-4 text-slate-400 mb-6">
                    <div className="flex items-center gap-2">
                      <ApperIcon name="MapPin" className="w-5 h-5" />
                      {freelancer.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Clock" className="w-5 h-5" />
                      {freelancer.experience} years experience
                    </div>
                    <div className={`flex items-center gap-2 ${
                      freelancer.availability === 'Available' ? 'text-success' : 
                      freelancer.availability === 'Busy' ? 'text-warning' : 'text-error'
                    }`}>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      {freelancer.availability}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="text-right">
                    <div className="text-4xl font-display font-bold gradient-text">
                      ${freelancer.hourlyRate}/hr
                    </div>
                    <div className="text-slate-400">Starting rate</div>
                  </div>
                  
                  <Button
                    onClick={() => setShowContactForm(true)}
                    size="lg"
                    icon="MessageCircle"
                    className="min-w-[200px]"
                  >
                    Start Conversation
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {freelancer.skills.map((skill) => (
                  <Badge key={skill} variant="primary" size="md">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-display font-semibold mb-4">About</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {freelancer.bio}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        {projects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-display font-bold gradient-text">
                Featured Projects
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent"></div>
              <span className="text-slate-400">{projects.length} projects</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.Id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-display font-bold gradient-text">
                Client Testimonials
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-accent to-transparent"></div>
              <div className="flex items-center gap-2 text-slate-400">
                <ApperIcon name="Star" className="w-5 h-5 text-warning fill-current" />
                <span>5.0 average rating</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.Id}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Form */}
        {showContactForm && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ContactForm
              freelancerId={freelancer.Id}
              onSuccess={() => setShowContactForm(false)}
            />
          </motion.section>
        )}
      </div>
    </div>
  )
}

export default PortfolioDetailPage