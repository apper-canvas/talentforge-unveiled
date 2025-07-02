import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import FreelancerGrid from '@/components/organisms/FreelancerGrid'
import SearchBar from '@/components/molecules/SearchBar'
import CategorySelector from '@/components/molecules/CategorySelector'
import ApperIcon from '@/components/ApperIcon'

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name')

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

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (sortBy !== 'name') params.set('sort', sortBy)
    setSearchParams(params)
  }, [searchQuery, selectedCategory, sortBy, setSearchParams])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSortBy('name')
  }

  return (
    <div className="min-h-screen bg-background text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass rounded-2xl p-8">
            <h1 className="text-3xl font-display font-bold gradient-text mb-6">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse All Freelancers'}
            </h1>
            
            <SearchBar
              onSearch={handleSearch}
              placeholder="Refine your search..."
              className="mb-6"
            />

            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
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

              {(searchQuery || selectedCategory !== 'all' || sortBy !== 'name') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <FreelancerGrid
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
        />
      </div>
    </div>
  )
}

export default SearchResultsPage