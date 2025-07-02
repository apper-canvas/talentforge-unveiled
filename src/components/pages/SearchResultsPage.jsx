import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import FreelancerGrid from "@/components/organisms/FreelancerGrid";
import SearchBar from "@/components/molecules/SearchBar";
import CategorySelector from "@/components/molecules/CategorySelector";

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')

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
useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    setSearchParams(params)
  }, [searchQuery, selectedCategory, setSearchParams])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
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
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {(searchQuery || selectedCategory !== 'all') && (
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
        />
    </div>
  )
}

export default SearchResultsPage