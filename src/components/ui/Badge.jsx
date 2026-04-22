export default function Badge({ children, color = '#7c6ff7' }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: color + '20', color }}
    >
      {children}
    </span>
  )
}