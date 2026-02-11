export function generateNomorPengaduan(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  
  return `ADU-${year}${month}-${random}`
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace Indonesian characters
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    // Remove special characters
    .replace(/[^\w\s-]/g, '')
    // Replace spaces with dash
    .replace(/\s+/g, '-')
    // Remove multiple dashes
    .replace(/--+/g, '-')
    // Remove dash at start/end
    .replace(/^-+|-+$/g, '')
}

export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  const options: Intl.DateTimeFormatOptions = format === 'long'
    ? { day: 'numeric', month: 'long', year: 'numeric' }
    : { day: 'numeric', month: 'short', year: 'numeric' }
  
  return new Intl.DateTimeFormat('id-ID', options).format(d)
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}