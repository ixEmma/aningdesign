function Services() {
  const services = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="service-icon"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      ),
      title: 'Graphic Design',
      prices: [
        { level: 'Entry Level', amount: '$50 - $100', className: 'price-entry' },
        { level: 'Intermediate', amount: '$150 - $300', className: 'price-intermediate' },
        { level: 'Advanced', amount: '$350+', className: 'price-advanced' }
      ]
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="service-icon"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
      title: 'Website Design',
      prices: [
        { level: 'Entry Level', amount: '$250 - $400', className: 'price-entry' },
        { level: 'Intermediate', amount: '$500 - $750', className: 'price-intermediate' },
        { level: 'Advanced', amount: '$850+', className: 'price-advanced' }
      ]
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="service-icon"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: 'Frontend Development',
      prices: [
        { level: 'Entry Level', amount: '$350 - $550', className: 'price-entry' },
        { level: 'Intermediate', amount: '$600 - $900', className: 'price-intermediate' },
        { level: 'Advanced', amount: '$1200+', className: 'price-advanced' }
      ]
    }
  ]

  return (
    <>
      <div className="services-section" id="services">
        <h1 className="services-title">SERVICES</h1>
        <p className="services-subtitle">Choose the perfect package for your project needs</p>
      </div>
      <div className="flexContainer">
        {services.map((service, index) => (
          <div key={index} className="mydivname">
            {service.icon}
            <h2>{service.title}</h2>
            {service.prices.map((price, priceIndex) => (
              <div key={priceIndex} className="price-range">
                <p className={price.className}>{price.level}</p>
                <p className="price-amount">{price.amount}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Services

