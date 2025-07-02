import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const FreelancerCard = ({ freelancer, index = 0 }) => {
  const {
    Id,
    name,
    title,
    avatar,
    skills,
    hourlyRate,
    availability,
    location,
    experience
  } = freelancer

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-2xl p-6 card-hover group"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gradient-primary"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-display font-bold text-white mb-1">
            {name}
          </h3>
          <p className="text-slate-300 mb-2">{title}</p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <ApperIcon name="MapPin" className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Clock" className="w-4 h-4" />
              {experience}y exp
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="default" size="sm">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="secondary" size="sm">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      {/* Rate & Availability */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-2xl font-display font-bold gradient-text">
            ${hourlyRate}/hr
          </div>
          <div className="text-sm text-slate-400">Starting rate</div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${
            availability === 'Available' ? 'text-success' : 
            availability === 'Busy' ? 'text-warning' : 'text-error'
          }`}>
            {availability}
          </div>
          <div className="text-sm text-slate-400">Status</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Link to={`/freelancer/${Id}`} className="flex-1">
          <Button
            variant="primary"
            size="md"
            icon="Eye"
            className="w-full group-hover:shadow-xl transition-all duration-300"
          >
            View Portfolio
          </Button>
        </Link>
        <motion.button
          className="p-3 bg-surface hover:bg-slate-700 rounded-xl transition-all duration-300 border border-slate-600 hover:border-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Save for later"
        >
          <ApperIcon name="Heart" className="w-5 h-5 text-slate-400 hover:text-primary" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default FreelancerCard