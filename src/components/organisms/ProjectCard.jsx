import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const ProjectCard = ({ project, index = 0 }) => {
  const { title, description, images, technologies, link, completedDate } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden card-hover group"
    >
      {/* Project Image */}
      <div className="image-reveal relative h-48">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="ExternalLink" className="w-5 h-5 text-white" />
          </motion.a>
        )}
      </div>

      <div className="p-6">
        {/* Project Info */}
        <div className="mb-4">
          <h3 className="text-xl font-display font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-3">
            {description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="default" size="xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <Badge variant="secondary" size="xs">
                +{technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Completion Date */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <ApperIcon name="Calendar" className="w-4 h-4" />
          Completed {completedDate}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard