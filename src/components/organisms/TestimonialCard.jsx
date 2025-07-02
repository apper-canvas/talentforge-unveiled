import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const TestimonialCard = ({ testimonial, index = 0 }) => {
  const { clientName, clientCompany, rating, feedback, date } = testimonial

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <ApperIcon
        key={i}
        name="Star"
        className={`w-4 h-4 ${
          i < rating ? 'text-warning fill-current' : 'text-slate-600'
        }`}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-2xl p-6 card-hover"
    >
      {/* Quote Icon */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
          <ApperIcon name="Quote" className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-slate-400">({rating}.0)</span>
          </div>
        </div>
      </div>

      {/* Testimonial Content */}
      <blockquote className="text-slate-300 mb-6 leading-relaxed">
        "{feedback}"
      </blockquote>

      {/* Client Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">{clientName}</div>
          <div className="text-sm text-slate-400">{clientCompany}</div>
        </div>
        <div className="text-sm text-slate-500">{date}</div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard