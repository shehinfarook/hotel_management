const STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  preparing: '#8b5cf6',
  ready: '#10b981',
  delivered: '#6b7280',
  cancelled: '#ef4444'
}

const StatusBadge = ({ status }) => (
  <span
    style={{
      backgroundColor: STATUS_COLORS[status] || '#ccc',
      color: '#fff',
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
      textTransform: 'capitalize'
    }}
  >
    {status}
  </span>
)

export default StatusBadge
