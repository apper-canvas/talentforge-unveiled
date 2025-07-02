import mockProjects from '@/services/mockData/projects.json'

const projectService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockProjects
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const project = mockProjects.find(p => p.Id === id)
    if (!project) {
      throw new Error('Project not found')
    }
    return project
  },

  async getByFreelancerId(freelancerId) {
    await new Promise(resolve => setTimeout(resolve, 250))
    return mockProjects.filter(p => p.freelancerId === freelancerId)
  },

  async create(projectData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...mockProjects.map(p => p.Id)) + 1
    const newProject = { ...projectData, Id: newId }
    mockProjects.push(newProject)
    return newProject
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockProjects.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    mockProjects[index] = { ...mockProjects[index], ...updates }
    return mockProjects[index]
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = mockProjects.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    const deleted = mockProjects.splice(index, 1)[0]
    return deleted
  }
}

export default projectService