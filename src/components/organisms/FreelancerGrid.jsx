import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FreelancerCard from '@/components/organisms/FreelancerCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import freelancerService from '@/services/api/freelancerService'

const FreelancerGrid = ({ searchQuery = '', selectedCategory = 'all', sortBy = 'name' }) => {
  const [freelancers, setFreelancers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadFreelancers = async () => {
    setLoading(true)
    setError('')
    
    try {
      const data = await freelancerService.getAll()
      let filteredData = data

      // Filter by search query
      if (searchQuery) {
        filteredData = filteredData.filter(freelancer =>
          freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          freelancer.skills.some(skill => 
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      }

      // Filter by category
      if (selectedCategory !== 'all') {
        filteredData = filteredData.filter(freelancer =>
          freelancer.skills.some(skill => 
            skill.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        )
      }

      // Sort results
      filteredData.sort((a, b) => {
        switch (sortBy) {
          case 'rate':
            return a.hourlyRate - b.hourlyRate
          case 'experience':
            return b.experience - a.experience
          default:
            return a.name.localeCompare(b.name)
        }
      })

      setFreelancers(filteredData)
    } catch (err) {
      setError('Failed to load freelancers. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFreelancers()
  }, [searchQuery, selectedCategory, sortBy])

  if (loading) return <Loading type="grid" count={6} />
  if (error) return <Error message={error} onRetry={loadFreelancers} />
  if (freelancers.length === 0) {
    return (
      <Empty
        title="No freelancers found"
        message="Try adjusting your search criteria or browse all available talent."
        actionText="Clear Filters"
        onAction={() => window.location.reload()}
        icon="Users"
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {freelancers.map((freelancer, index) => (
        <FreelancerCard
          key={freelancer.Id}
          freelancer={freelancer}
          index={index}
        />
      ))}
    </motion.div>
  )
}

export default FreelancerGrid