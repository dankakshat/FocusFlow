export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-40 disabled:cursor-not-allowed'
  const variants = {
    primary:  'bg-accent hover:bg-accent-hover text-white',
    ghost:    'bg-transparent hover:bg-surface-3 text-subtle hover:text-primary',
    danger:   'bg-danger/10 hover:bg-danger/20 text-danger',
    outline:  'border border-surface-4 hover:border-accent/50 text-subtle hover:text-primary',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}