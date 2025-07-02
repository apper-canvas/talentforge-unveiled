import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No results found",
  message = "Try adjusting your search criteria or browse our featured freelancers.",
  actionText = "Browse All Freelancers",
  onAction,
  icon = "Search"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <ApperIcon name={icon} className="w-16 h-16 text-white relative z-10" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-display font-bold gradient-text mb-4"
        >
          {title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 mb-8 leading-relaxed text-lg"
        >
          {message}
        </motion.p>
        
        {onAction && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onAction}
            className="btn-gradient px-8 py-4 rounded-xl font-semibold text-white hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Sparkles" className="w-5 h-5" />
            {actionText}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty