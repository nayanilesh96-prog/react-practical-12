import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialOrders = [
  { id: 'ORD-2847', date: 'Oct 14, 2024', customer: 'Olivia Rhye', email: 'olivia@acme.com', initials: 'OR', color: 'lavender', products: ['Headphones', 'Watch'], quantity: 2, total: 389.00, status: 'Processing' },
  { id: 'ORD-2846', date: 'Oct 14, 2024', customer: 'Phoenix Baker', email: 'phoenix@acme.com', initials: 'PB', color: 'peach', products: ['Running shoes'], quantity: 1, total: 129.00, status: 'Shipped' },
  { id: 'ORD-2845', date: 'Oct 13, 2024', customer: 'Lana Steiner', email: 'lana@acme.com', initials: 'LS', color: 'mint', products: ['Ceramic mug', 'Tote bag'], quantity: 2, total: 58.50, status: 'Processing' },
  { id: 'ORD-2844', date: 'Oct 13, 2024', customer: 'Demi Wilkinson', email: 'demi@acme.com', initials: 'DW', color: 'blue', products: ['Desk lamp'], quantity: 1, total: 84.00, status: 'Shipped' },
  { id: 'ORD-2843', date: 'Oct 12, 2024', customer: 'Candice Wu', email: 'candice@acme.com', initials: 'CW', color: 'rose', products: ['Backpack', 'Bottle'], quantity: 2, total: 156.00, status: 'Processing' },
  { id: 'ORD-2842', date: 'Oct 12, 2024', customer: 'Natali Craig', email: 'natali@acme.com', initials: 'NC', color: 'gold', products: ['Sunglasses'], quantity: 1, total: 72.00, status: 'Delivered' },
  { id: 'ORD-2841', date: 'Oct 11, 2024', customer: 'Drew Cano', email: 'drew@acme.com', initials: 'DC', color: 'mint', products: ['Wireless speaker'], quantity: 1, total: 119.00, status: 'Cancelled' },
  { id: 'ORD-2840', date: 'Oct 10, 2024', customer: 'Orlando Diggs', email: 'orlando@acme.com', initials: 'OD', color: 'peach', products: ['Notebook set'], quantity: 3, total: 45.00, status: 'Delivered' },
]

const tabs = [
  { label: 'Current orders', path: '/orders/current', key: 'current' },
  { label: 'Order history', path: '/orders/history', key: 'history' },
  { label: 'Cancelled orders', path: '/orders/cancelled', key: 'cancelled' },
]

function Icon({ name, size = 18 }) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const shapes = {
    grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
    bag: <><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h17" /><path d="m7 15 4-4 3 2 6-7" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" /><path d="m3 8v9l9 5 9-5V8" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.8Z" transform="translate(-1 -1)" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M5 17v4h14v-4" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  }

  return <svg {...shared}>{shapes[name]}</svg>
}

function getRoute() {
  const match = window.location.pathname.match(/^\/orders(?:\/(current|history|cancelled))?\/?$/)
  return match?.[1] || 'current'
}

function App() {
  const [route, setRoute] = useState(getRoute)
  const [orders, setOrders] = useState(initialOrders)
  const [query, setQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute())
    window.addEventListener('popstate', updateRoute)
    return () => window.removeEventListener('popstate', updateRoute)
  }, [])

  const counts = useMemo(() => ({
    current: orders.filter((order) => order.status === 'Processing' || order.status === 'Shipped').length,
    history: orders.filter((order) => order.status === 'Delivered').length,
    cancelled: orders.filter((order) => order.status === 'Cancelled').length,
  }), [orders])

  const visibleOrders = useMemo(() => {
    const matchingRoute = orders.filter((order) => {
      if (route === 'history') return order.status === 'Delivered'
      if (route === 'cancelled') return order.status === 'Cancelled'
      return order.status === 'Processing' || order.status === 'Shipped'
    })
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return matchingRoute
    return matchingRoute.filter((order) =>
      [order.id, order.customer, order.email, ...order.products]
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    )
  }, [orders, query, route])

  const pageCopy = {
    current: ['Current orders', 'Track and manage the orders that are on their way.'],
    history: ['Order history', 'A complete record of orders delivered to your customers.'],
    cancelled: ['Cancelled orders', 'Review orders that have been cancelled.'],
  }[route] || ['Current orders', 'Track and manage the orders that are on their way.']

  function navigate(event, path, key) {
    event.preventDefault()
    window.history.pushState({}, '', path)
    setRoute(key)
    setQuery('')
  }

  function createOrder(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const customer = formData.get('customer').trim()
    const total = Number(formData.get('total'))
    const initials = customer.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    const newOrder = {
      id: `ORD-${2848 + orders.length - initialOrders.length}`,
      date: 'Oct 15, 2024',
      customer,
      email: formData.get('email').trim(),
      initials,
      color: 'lavender',
      products: ['New order'],
      quantity: 1,
      total,
      status: 'Processing',
    }
    setOrders((current) => [newOrder, ...current])
    setShowCreateForm(false)
    window.history.pushState({}, '', '/orders/current')
    setRoute('current')
    setQuery('')
  }

  function exportOrders() {
    const rows = [
      ['Order', 'Date', 'Customer', 'Email', 'Products', 'Total', 'Status'],
      ...visibleOrders.map((order) => [order.id, order.date, order.customer, order.email, order.products.join(', '), order.total.toFixed(2), order.status]),
    ]
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${route}-orders.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/orders/current" onClick={(event) => navigate(event, '/orders/current', 'current')}>
          <span className="brand-mark"><Icon name="box" size={21} /></span>
          <span>parcel<span className="brand-dot">.</span></span>
        </a>

        <div className="workspace-switcher">
          <div className="workspace-avatar">S</div>
          <div className="workspace-copy"><strong>Studio Supply</strong><span>Pro plan</span></div>
          <span className="switcher-dots">•••</span>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#overview" className="nav-link" onClick={(event) => event.preventDefault()}><Icon name="grid" />Overview</a>
          <a href="/orders/current" className="nav-link selected" onClick={(event) => navigate(event, '/orders/current', 'current')}><Icon name="bag" />Orders<span className="nav-count">{counts.current}</span></a>
          <a href="#products" className="nav-link" onClick={(event) => event.preventDefault()}><Icon name="box" />Products</a>
          <a href="#customers" className="nav-link" onClick={(event) => event.preventDefault()}><Icon name="users" />Customers</a>
          <a href="#analytics" className="nav-link" onClick={(event) => event.preventDefault()}><Icon name="chart" />Analytics</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <strong>Need a hand?</strong>
            <span>Our team is here to help.</span>
            <a href="mailto:hello@parcel.shop">Get support <Icon name="arrow" size={14} /></a>
          </div>
          <a className="nav-link settings-link" href="#settings" onClick={(event) => event.preventDefault()}><Icon name="settings" />Settings</a>
          <div className="profile">
            <div className="profile-avatar">JD</div>
            <div className="profile-copy"><strong>Jordan Davis</strong><span>jordan@studio.co</span></div>
            <Icon name="more" />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={15} /><strong>Orders</strong></div>
          <div className="topbar-actions">
            <label className="global-search"><Icon name="search" size={17} /><input aria-label="Search anywhere" placeholder="Search anything..." /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell" /><span /></button>
            <div className="top-avatar">JD</div>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow"><span className="live-dot" />ORDER MANAGEMENT</div>
              <h1>{pageCopy[0]}</h1>
              <p>{pageCopy[1]}</p>
            </div>
            <div className="heading-actions">
              <button className="button button-secondary" onClick={exportOrders}><Icon name="download" size={17} />Export</button>
              <button className="button button-primary" onClick={() => setShowCreateForm(true)}><Icon name="plus" size={17} />Create order</button>
            </div>
          </div>

          <section className="summary-grid" aria-label="Order summary">
            <article className="summary-card">
              <div className="summary-top"><span>Orders this month</span><span className="summary-icon icon-purple"><Icon name="bag" size={17} /></span></div>
              <div className="summary-value">1,284 <span className="trend trend-up"><Icon name="arrow" size={12} />12.8%</span></div>
              <div className="summary-foot">vs. 1,138 last month</div>
              <div className="sparkline spark-purple"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="summary-card">
              <div className="summary-top"><span>Pending fulfillment</span><span className="summary-icon icon-orange"><Icon name="box" size={17} /></span></div>
              <div className="summary-value">{counts.current + 42} <span className="trend trend-neutral">Needs attention</span></div>
              <div className="summary-foot">Across all sales channels</div>
              <div className="sparkline spark-orange"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="summary-card">
              <div className="summary-top"><span>Revenue this month</span><span className="summary-icon icon-green">$</span></div>
              <div className="summary-value">$48,294 <span className="trend trend-up"><Icon name="arrow" size={12} />8.2%</span></div>
              <div className="summary-foot">vs. $44,630 last month</div>
              <div className="sparkline spark-green"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
            <article className="summary-card">
              <div className="summary-top"><span>Average order value</span><span className="summary-icon icon-blue">↗</span></div>
              <div className="summary-value">$86.40 <span className="trend trend-up"><Icon name="arrow" size={12} />4.3%</span></div>
              <div className="summary-foot">vs. $82.84 last month</div>
              <div className="sparkline spark-blue"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </article>
          </section>

          <section className="orders-panel">
            <div className="panel-heading">
              <div><h2>All orders <span className="total-pill">{counts.current + counts.history + counts.cancelled}</span></h2><p>Keep track of all your customer orders.</p></div>
              <button className="button button-filter"><Icon name="calendar" size={16} />Last 30 days<span className="filter-chevron">⌄</span></button>
            </div>

            <div className="tabs" role="tablist" aria-label="Order categories">
              {tabs.map((tab) => (
                <a
                  key={tab.key}
                  href={tab.path}
                  role="tab"
                  aria-selected={route === tab.key}
                  className={`tab ${route === tab.key ? 'active' : ''}`}
                  onClick={(event) => navigate(event, tab.path, tab.key)}
                >
                  {tab.label}<span className="tab-count">{counts[tab.key]}</span>
                </a>
              ))}
            </div>

            <div className="table-toolbar">
              <label className="table-search"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders..." /></label>
              <button className="button button-filter filter-button"><span className="filter-lines">☷</span>Filters<span className="filter-badge">2</span></button>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr><th><input type="checkbox" aria-label="Select all orders" /></th><th>ORDER</th><th>DATE</th><th>CUSTOMER</th><th>PRODUCTS</th><th>TOTAL</th><th>STATUS</th><th /></tr>
                </thead>
                <tbody>
                  {visibleOrders.length ? visibleOrders.map((order) => (
                    <tr key={order.id}>
                      <td><input type="checkbox" aria-label={`Select ${order.id}`} /></td>
                      <td><a className="order-id" href={`#${order.id}`} onClick={(event) => event.preventDefault()}>{order.id}</a></td>
                      <td className="date-cell">{order.date}</td>
                      <td><div className="customer-cell"><span className={`customer-avatar ${order.color}`}>{order.initials}</span><span><strong>{order.customer}</strong><small>{order.email}</small></span></div></td>
                      <td><div className="product-cell"><span className={`product-thumb product-${order.color}`}>{productEmoji(order.products[0])}</span><span>{order.products[0]}{order.quantity > 1 ? <small>+{order.quantity - 1} more</small> : null}</span></div></td>
                      <td className="total-cell">${order.total.toFixed(2)}</td>
                      <td><span className={`status status-${order.status.toLowerCase()}`}><i />{order.status}</span></td>
                      <td><button className="row-more" aria-label={`More options for ${order.id}`}><Icon name="more" /></button></td>
                    </tr>
                  )) : (
                    <tr><td className="empty-state" colSpan="8">No orders found. Try another search.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span>Showing <strong>{visibleOrders.length ? 1 : 0}–{visibleOrders.length}</strong> of <strong>{visibleOrders.length}</strong> results</span>
              <div><button className="pagination-button" disabled>← <span>Previous</span></button><button className="pagination-button next-button" disabled><span>Next</span> →</button></div>
            </div>
          </section>

          <footer className="page-footer"><span>© 2024 Parcel, Inc.</span><span><a href="mailto:hello@parcel.shop">Help center</a><a href="#status">System status <i className="status-online" /></a></span></footer>
        </div>
      </main>

      {showCreateForm && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowCreateForm(false) }}>
          <form className="create-modal" onSubmit={createOrder}>
            <div className="modal-heading"><div><span className="modal-icon"><Icon name="bag" /></span><h2>Create an order</h2><p>Add a new order to your workspace.</p></div><button type="button" className="modal-close" aria-label="Close" onClick={() => setShowCreateForm(false)}>×</button></div>
            <label>Customer name<input name="customer" placeholder="e.g. Alex Morgan" required /></label>
            <label>Email address<input name="email" type="email" placeholder="alex@example.com" required /></label>
            <label>Order total<input name="total" type="number" min="0.01" step="0.01" placeholder="0.00" required /></label>
            <div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setShowCreateForm(false)}>Cancel</button><button type="submit" className="button button-primary"><Icon name="plus" size={17} />Create order</button></div>
          </form>
        </div>
      )}
    </div>
  )
}

function productEmoji(product) {
  const icons = {
    Headphones: '🎧',
    'Running shoes': '👟',
    'Ceramic mug': '☕',
    'Desk lamp': '💡',
    Backpack: '🎒',
    Sunglasses: '🕶️',
    'Wireless speaker': '🔊',
    'Notebook set': '📓',
  }
  return icons[product] || '📦'
}

export default App
