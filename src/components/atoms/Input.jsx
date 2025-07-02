import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ 
  label, 
  type = 'text', 
  icon = null, 
  error = null, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="w-5 h-5 text-slate-400" />
          </div>
        )}
        <motion.input
          type={type}
          className={`
            w-full px-4 py-3 bg-surface border border-slate-600 rounded-xl
            text-slate-100 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all duration-300
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-error focus:ring-error' : ''}
            ${className}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error flex items-center gap-2"
        >
          <ApperIcon name="AlertCircle" className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default Input