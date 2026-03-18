const Services = () => {
  const whatsappNumber = '233557066467'

  const buildWhatsappLink = (serviceTitle, plan) => {
    const message = [
      `Hi Emmanuel, I'm interested in your ${serviceTitle} service.`,
      '',
      `Selected plan: ${plan.title}`,
      `Price range: ${plan.price}`,
      '',
      'This plan includes:',
      ...plan.features.map((feature) => `- ${feature}`),
      '',
      `CTA clicked: ${plan.cta}`
    ].join('\n')

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  const websitePlans = [
    {
      title: 'Starter Website',
      price: '$300 - $450',
      features: [
        '1-5 Pages',
        'Mobile Responsive',
        'Basic SEO Setup',
        'Fast Loading Optimization'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      title: 'Business Website',
      price: '$600 - $1000',
      features: [
        '5-10 Pages',
        'Custom UI Design (Elementor-style)',
        'Speed Optimization',
        'Contact Forms + Integrations',
        'Basic Animations'
      ],
      cta: 'Most Popular',
      popular: true
    },
    {
      title: 'Advanced / Custom Build',
      price: '$1200+',
      features: [
        'Unlimited Pages',
        'Custom Features (Booking, Dashboard, etc.)',
        'Advanced Animations',
        'Performance + SEO Optimization',
        'Ongoing Support'
      ],
      cta: 'Request Quote',
      popular: false
    }
  ]

  const graphicDesignPlans = [
    {
      title: 'Starter Design',
      price: '$50 - $150',
      features: [
        'Social Media Post (1-2)',
        'Flyer or Simple Poster',
        'Basic Revisions (2x)',
        'Fast Delivery'
      ],
      cta: 'Order Now',
      popular: false
    },
    {
      title: 'Brand Essentials',
      price: '$200 - $400',
      features: [
        'Logo or Brand Assets',
        'Social Media Kit (3-5 designs)',
        'Flyer / Poster Design',
        '3-5 Revisions',
        'High-Quality Export'
      ],
      cta: 'Most Popular',
      popular: true
    },
    {
      title: 'Premium Brand Package',
      price: '$500+',
      features: [
        'Full Brand Identity',
        'Logo + Variations',
        'Social Media Kit (10+)',
        'Packaging / Advanced Design',
        'Unlimited Revisions',
        'Source Files Included'
      ],
      cta: 'Get Started',
      popular: false
    }
  ]

  const serviceSections = [
    {title: 'Website Design', plans: websitePlans},
    {title: 'Graphic Design', plans: graphicDesignPlans}
  ]

  return (
    <section className="services-pricing-root" id="services">
      <style>{`
        .services-pricing-root {
          --brand-green: #00fb64;
          --brand-cyan: #00c9ff;
          --brand-mint: #9af7a3;
          --bg-1: #0d0d0d;
          --bg-2: #1a1a1a;
          --text-main: #ffffff;
          --text-soft: #dcdcdc;
          --card-bg: linear-gradient(135deg, rgba(17, 17, 17, 0.95), rgba(30, 30, 30, 0.95));

          padding: 72px 20px;
          background:
            radial-gradient(circle at 12% 18%, rgba(0, 251, 100, 0.08), transparent 45%),
            radial-gradient(circle at 88% 85%, rgba(0, 201, 255, 0.12), transparent 45%),
            linear-gradient(180deg, var(--bg-1), var(--bg-2));
          color: var(--text-main);
        }

        .services-pricing-wrap {
          max-width: 1160px;
          margin: 0 auto;
          
        }
        .services-main-title {
          margin: 0 0 56px;
          text-align: center;
          font-size: clamp(2.2rem, 3.6vw, 3.2rem);
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: -0.03em;
          font-family: 'Switzer', 'Segoe UI', sans-serif;
          color: var(--text-main);
          text-shadow: 0 0 20px rgba(0, 201, 255, 0.16);
        }
        .pricing-service-section + .pricing-service-section {
          margin-top: 150px;
          margin-bottom: 120px;
        }

        .service-title {
          margin: 0;
          text-align: center;
          font-size: clamp(2rem, 3vw, 2.8rem);
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.02em;
          font-family: 'Switzer', 'Segoe UI', sans-serif;
          background: linear-gradient(90deg, rgba(230, 246, 255, 1) 1%, rgba(225, 252, 252, 1) 50%, rgba(240, 251, 252, 1) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(0, 201, 255, 0.16);
        }

        .pricing-grid {
          margin-top: 36px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .pricing-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          background: var(--card-bg);
          border: 1px solid rgba(154, 247, 163, 0.22);
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          overflow: hidden;
        }

        .pricing-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 19px;
          pointer-events: none;
          background: linear-gradient(120deg, rgba(0, 251, 100, 0.12), rgba(0, 201, 255, 0.14), transparent 70%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .pricing-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 201, 255, 0.45);
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.45), 0 0 20px rgba(0, 201, 255, 0.14);
        }

        .pricing-card:hover::after {
          opacity: 1;
        }

        .pricing-card.popular {
          transform: scale(1.03);
          border-color: rgba(0, 251, 100, 0.55);
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.55), 0 0 24px rgba(0, 251, 100, 0.22);
        }

        .pricing-card.popular:hover {
          transform: scale(1.03) translateY(-8px);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.58), 0 0 28px rgba(0, 251, 100, 0.3);
        }

        .popular-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 0.72rem;
          letter-spacing: 0.03em;
          font-weight: 700;
          color: #05120a;
          background: linear-gradient(90deg, var(--brand-green), var(--brand-cyan));
          box-shadow: 0 0 14px rgba(0, 251, 100, 0.35);
        }

        .card-title {
          margin: 0;
          font-size: 1.28rem;
          line-height: 1.35;
          font-weight: 700;
          color: var(--text-main);
          font-family: 'Switzer', 'Segoe UI', sans-serif;
        }

        .card-price {
          margin: 10px 0 0;
          font-size: clamp(1.55rem, 2vw, 1.85rem);
          font-weight: 800;
          color: var(--brand-cyan);
          letter-spacing: -0.02em;
        }

        .features-list {
          list-style: none;
          margin: 20px 0 24px;
          padding: 0;
          display: grid;
          gap: 10px;
        }

        .feature-item {
          position: relative;
          padding-left: 24px;
          color: var(--text-soft);
          font-size: 0.95rem;
          line-height: 1.45;
        }

        .feature-item::before {
          content: '';
          width: 9px;
          height: 9px;
          border-radius: 50%;
          position: absolute;
          top: 0.42em;
          left: 0;
          background: linear-gradient(90deg, var(--brand-green), var(--brand-cyan));
          box-shadow: 0 0 8px rgba(0, 251, 100, 0.45);
        }

        .card-button {
          margin-top: auto;
          width: 100%;
          border: 1px solid rgba(0, 201, 255, 0.45);
          border-radius: 12px;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.28);
          color: var(--text-main);
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          text-decoration: none;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .card-button:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 201, 255, 0.8);
          background: rgba(0, 201, 255, 0.08);
          box-shadow: 0 0 14px rgba(0, 201, 255, 0.2);
        }

        .pricing-card.popular .card-button {
          border-color: rgba(0, 251, 100, 0.65);
          background: linear-gradient(90deg, var(--brand-green), var(--brand-cyan));
          color: #07111f;
          box-shadow: 0 0 14px rgba(0, 251, 100, 0.3);
        }

        .pricing-card.popular .card-button:hover {
          border-color: rgba(154, 247, 163, 0.95);
          box-shadow: 0 0 18px rgba(0, 251, 100, 0.4);
        }

        .mobile-combined-card {
          display: none;
          margin-top: 28px;
          background: var(--card-bg);
          border: 1px solid rgba(154, 247, 163, 0.28);
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.42), 0 0 16px rgba(0, 201, 255, 0.12);
        }

        .mobile-plan-block + .mobile-plan-block {
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px solid rgba(154, 247, 163, 0.22);
        }

        .mobile-plan-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 2px;
        }

        .mobile-plan-title {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.35;
          font-weight: 700;
          color: var(--text-main);
          font-family: 'Switzer', 'Segoe UI', sans-serif;
        }

        .mobile-popular-pill {
          border-radius: 999px;
          padding: 4px 9px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #05120a;
          background: linear-gradient(90deg, var(--brand-green), var(--brand-cyan));
          white-space: nowrap;
        }

        .mobile-price {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--brand-cyan);
        }

        .mobile-features {
          list-style: none;
          margin: 12px 0 14px;
          padding: 0;
          display: grid;
          gap: 8px;
        }

        .mobile-feature {
          position: relative;
          padding-left: 20px;
          font-size: 0.92rem;
          color: var(--text-soft);
          line-height: 1.4;
        }

        .mobile-feature::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: 0.42em;
          background: linear-gradient(90deg, var(--brand-green), var(--brand-cyan));
          box-shadow: 0 0 8px rgba(0, 251, 100, 0.35);
        }

        .mobile-plan-button {
          width: 100%;
          border: 1px solid rgba(0, 201, 255, 0.45);
          border-radius: 10px;
          padding: 10px 12px;
          background: rgba(0, 0, 0, 0.3);
          color: var(--text-main);
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .mobile-plan-block.popular .mobile-plan-button {
          border-color: rgba(0, 251, 100, 0.65);
          background: linear-gradient(90deg, var(--brand-green), var(--brand-cyan));
          color: #07111f;
        }

        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pricing-card.popular,
          .pricing-card.popular:hover {
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .services-pricing-root {
            padding: 60px 16px;
          }

          .services-main-title {
            margin-bottom: 48px;
          }

          .pricing-grid {
            display: none;
          }

          .mobile-combined-card {
            display: block;
          }

          .pricing-service-section + .pricing-service-section {
            margin-top: 60px;
          }
        }

        @media (max-width: 480px) {
          .services-pricing-root {
            padding: 52px 12px;
          }

          .services-main-title {
            font-size: 2rem;
            margin-bottom: 40px;
          }
        .pricing-service-section + .pricing-service-section {
          margin-top: 150px;
          margin-bottom: 120px;
        }

        .service-title {
            font-size: 1.8rem;
          }

          .mobile-combined-card {
            padding: 14px;
            border-radius: 14px;
          }

          .mobile-plan-title {
            font-size: 1rem;
          }

          .mobile-price {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <div className="services-pricing-wrap">
        <h1 className="services-main-title">Pricing Plans</h1>
        {serviceSections.map((section) => (
          <section key={section.title} className="pricing-service-section">
            <h2 className="service-title">{section.title}</h2>

            <div className="pricing-grid">
              {section.plans.map((plan) => (
                <article key={plan.title} className={`pricing-card${plan.popular ? ' popular' : ''}`}>
                  {plan.popular && <span className="popular-badge">Most Popular</span>}
                  <h3 className="card-title">{plan.title}</h3>
                  <p className="card-price">{plan.price}</p>

                  <ul className="features-list">
                    {plan.features.map((feature) => (
                      <li key={feature} className="feature-item">{feature}</li>
                    ))}
                  </ul>

                  <a href={buildWhatsappLink(section.title, plan)} target="_blank" rel="noopener noreferrer" className="card-button">{plan.cta}</a>
                </article>
              ))}
            </div>

            <article className="mobile-combined-card" aria-label={`${section.title} plans for mobile`}>
              {section.plans.map((plan) => (
                <section key={`mobile-${section.title}-${plan.title}`} className={`mobile-plan-block${plan.popular ? ' popular' : ''}`}>
                  <div className="mobile-plan-title-row">
                    <h3 className="mobile-plan-title">{plan.title}</h3>
                    {plan.popular && <span className="mobile-popular-pill">Most Popular</span>}
                  </div>
                  <p className="mobile-price">{plan.price}</p>

                  <ul className="mobile-features">
                    {plan.features.map((feature) => (
                      <li key={`mobile-${section.title}-${plan.title}-${feature}`} className="mobile-feature">{feature}</li>
                    ))}
                  </ul>

                  <a href={buildWhatsappLink(section.title, plan)} target="_blank" rel="noopener noreferrer" className="mobile-plan-button">{plan.cta}</a>
                </section>
              ))}
            </article>
          </section>
        ))}
      </div>
    </section>
  )
}

export default Services















