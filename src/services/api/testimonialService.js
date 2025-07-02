import mockTestimonials from '@/services/mockData/testimonials.json'

const testimonialService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockTestimonials
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const testimonial = mockTestimonials.find(t => t.Id === id)
    if (!testimonial) {
      throw new Error('Testimonial not found')
    }
    return testimonial
  },

  async getByFreelancerId(freelancerId) {
    await new Promise(resolve => setTimeout(resolve, 250))
    return mockTestimonials.filter(t => t.freelancerId === freelancerId)
  },

  async create(testimonialData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...mockTestimonials.map(t => t.Id)) + 1
    const newTestimonial = { ...testimonialData, Id: newId }
    mockTestimonials.push(newTestimonial)
    return newTestimonial
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockTestimonials.findIndex(t => t.Id === id)
    if (index === -1) {
      throw new Error('Testimonial not found')
    }
    mockTestimonials[index] = { ...mockTestimonials[index], ...updates }
    return mockTestimonials[index]
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = mockTestimonials.findIndex(t => t.Id === id)
    if (index === -1) {
      throw new Error('Testimonial not found')
    }
    const deleted = mockTestimonials.splice(index, 1)[0]
    return deleted
  }
}

export default testimonialService