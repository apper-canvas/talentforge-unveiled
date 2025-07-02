import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CategorySelector = ({ categories, selectedCategory, onCategoryChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategorySelect = (category) => {
    onCategoryChange(category)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-surface border border-slate-600 rounded-xl text-slate-100 hover:bg-slate-700 transition-all duration-300 min-w-[200px] justify-between"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-medium">
          {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="ChevronDown" className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 w-full bg-surface border border-slate-600 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="w-full px-6 py-3 text-left hover:bg-slate-700 transition-colors duration-200 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className={`font-medium ${selectedCategory === category ? 'text-primary' : 'text-slate-300'}`}>
                {category === 'all' ? 'All Categories' : category}
              </span>
              {selectedCategory === category && (
                <ApperIcon name="Check" className="w-4 h-4 text-primary ml-auto" />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default CategorySelector