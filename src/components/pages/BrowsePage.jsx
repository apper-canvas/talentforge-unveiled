import { useState } from 'react'
import { motion } from 'framer-motion'
import FreelancerGrid from '@/components/organisms/FreelancerGrid'
import SearchBar from '@/components/molecules/SearchBar'
import CategorySelector from '@/components/molecules/CategorySelector'
import ApperIcon from '@/components/ApperIcon'

const BrowsePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const categories = [
    'all',
    'Design',
    'Development',
    'Writing',
    'Marketing',
    'Photography',
    'Video Editing',
    'Consulting'
  ]

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'rate', label: 'Lowest Rate' },
    { value: 'experience', label: 'Most Experience' }
  ]

  return (
    <div className="min-h-screen bg-background text-slate-100">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Discover
              <span className="gradient-text block">Exceptional Talent</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with world-class freelancers who bring your vision to life. 
              Browse portfolios, read reviews, and find the perfect match for your project.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search by name, skill, or expertise..."
              className="mb-8"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400"
          >
            <span>Popular:</span>
            {['React Developer', 'UI/UX Designer', 'Content Writer', 'Digital Marketer'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-2 bg-surface/50 hover:bg-surface rounded-full transition-colors duration-300 hover:text-white"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              <div className="flex items-center gap-3">
                <ApperIcon name="ArrowUpDown" className="w-5 h-5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-surface border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Available Now</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>Verified Profiles</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Freelancers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FreelancerGrid
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
          />
        </div>
      </section>
    </div>
  )
}

export default BrowsePage