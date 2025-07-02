import mockFreelancers from '@/services/mockData/freelancers.json'

const freelancerService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockFreelancers
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const freelancer = mockFreelancers.find(f => f.Id === id)
    if (!freelancer) {
      throw new Error('Freelancer not found')
    }
    return freelancer
  },

  async create(freelancerData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...mockFreelancers.map(f => f.Id)) + 1
    const newFreelancer = { ...freelancerData, Id: newId }
    mockFreelancers.push(newFreelancer)
    return newFreelancer
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockFreelancers.findIndex(f => f.Id === id)
    if (index === -1) {
      throw new Error('Freelancer not found')
    }
    mockFreelancers[index] = { ...mockFreelancers[index], ...updates }
    return mockFreelancers[index]
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = mockFreelancers.findIndex(f => f.Id === id)
    if (index === -1) {
      throw new Error('Freelancer not found')
    }
    const deleted = mockFreelancers.splice(index, 1)[0]
    return deleted
  }
}

export default freelancerService