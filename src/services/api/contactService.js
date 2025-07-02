import mockContacts from '@/services/mockData/contacts.json'

const contactService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockContacts
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const contact = mockContacts.find(c => c.Id === id)
    if (!contact) {
      throw new Error('Contact message not found')
    }
    return contact
  },

  async getByFreelancerId(freelancerId) {
    await new Promise(resolve => setTimeout(resolve, 250))
    return mockContacts.filter(c => c.freelancerId === freelancerId)
  },

  async create(contactData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newId = Math.max(...mockContacts.map(c => c.Id)) + 1
    const newContact = { 
      ...contactData, 
      Id: newId, 
      timestamp: new Date().toISOString() 
    }
    mockContacts.push(newContact)
    return newContact
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockContacts.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Contact message not found')
    }
    mockContacts[index] = { ...mockContacts[index], ...updates }
    return mockContacts[index]
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const index = mockContacts.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Contact message not found')
    }
    const deleted = mockContacts.splice(index, 1)[0]
    return deleted
  }
}

export default contactService