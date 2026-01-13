// src/payload/components/ClearDiscountUsagesButton.tsx
'use client'

import React, { useState } from 'react'

export const ClearDiscountUsagesButton: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (
      !window.confirm(
        'Сигурни ли сте? Това ще изтрие всички записи за опити за прилагане на ВАУЧЕР КОД.',
      )
    ) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/discount-code-attempt/clear-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // keep cookies/auth
      })

      if (!res.ok) throw new Error('Request failed')

      window.alert('Всички записи за опити за прилагане на ВАУЧЕР КОД са изтрити.')
    } catch (err) {
      console.error(err)
      window.alert('Грешка при изтриване на записите.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '1rem', borderRadius: 8, border: '1px solid #ddd' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>
        Нулиране на всички записи за опити за прилагане на ваучер кодове
      </h3>
      <p style={{ marginBottom: '1rem' }}>
        Този бутон изтрива всички документи от колекцията <strong>Discount Code Attempts</strong>.
      </p>
      <button type="button" onClick={handleClick} disabled={loading}>
        {loading ? 'Изтриване…' : 'Изтрий всички'}
      </button>
    </div>
  )
}
