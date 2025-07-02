import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon = null, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl relative overflow-hidden'
  
  const variants = {
    primary: 'btn-gradient text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-surface hover:bg-slate-700 text-slate-100 border border-slate-600 hover:border-slate-500',
    outline: 'border-2 border-primary hover:bg-primary text-primary hover:text-white',
    ghost: 'hover:bg-surface text-slate-300 hover:text-white',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={iconSizes[size]}
        >
          <ApperIcon name="Loader2" className={iconSizes[size]} />
        </motion.div>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <ApperIcon name={icon} className={`${iconSizes[size]} mr-2`} />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <ApperIcon name={icon} className={`${iconSizes[size]} ml-2`} />
          )}
        </>
      )}
    </motion.button>
  )
}

export default Button