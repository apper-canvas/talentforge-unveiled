import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import contactService from '@/services/api/contactService'

const ContactForm = ({ freelancerId, onSuccess }) => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.senderName.trim()) {
      newErrors.senderName = 'Name is required'
    }
    
    if (!formData.senderEmail.trim()) {
      newErrors.senderEmail = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.senderEmail)) {
      newErrors.senderEmail = 'Please enter a valid email'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    try {
      await contactService.create({
        freelancerId,
        ...formData
      })
      
      toast.success('Message sent successfully! The freelancer will get back to you soon.')
      setFormData({ senderName: '', senderEmail: '', message: '' })
      onSuccess?.()
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
          <span className="text-2xl">💬</span>
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold gradient-text">Get in Touch</h3>
          <p className="text-slate-400">Start a conversation about your project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Your Name"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            error={errors.senderName}
            icon="User"
            placeholder="John Doe"
          />
          <Input
            label="Email Address"
            name="senderEmail"
            type="email"
            value={formData.senderEmail}
            onChange={handleChange}
            error={errors.senderEmail}
            icon="Mail"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Details
          </label>
          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`
              w-full px-4 py-3 bg-surface border border-slate-600 rounded-xl
              text-slate-100 placeholder-slate-400 resize-none
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all duration-300
              ${errors.message ? 'border-error focus:ring-error' : ''}
            `}
            placeholder="Tell me about your project, timeline, and budget..."
            whileFocus={{ scale: 1.01 }}
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-error mt-2"
            >
              {errors.message}
            </motion.p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          loading={loading}
          icon="Send"
          className="w-full"
        >
          Send Message
        </Button>
      </form>
    </motion.div>
  )
}

export default ContactForm