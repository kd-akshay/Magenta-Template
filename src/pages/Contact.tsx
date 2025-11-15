import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Input, Button, useToast } from '@/components/ui'

const Contact = () => {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validate()) {
      // Handle form submission here
      showToast('Message sent successfully!', 'success')
      setFormData({ name: '', email: '', message: '' })
    } else {
      showToast('Please fix the errors in the form', 'error')
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          {t('pages.contact.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t('pages.contact.description')}
        </p>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <Input
            label={t('pages.contact.form.name')}
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          
          <Input
            label={t('pages.contact.form.email')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('pages.contact.form.message')}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.message
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.message}
              </p>
            )}
          </div>
          
          <Button type="submit" className="w-full">
            {t('common.submit')}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Contact

