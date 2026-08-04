import { useState } from 'react'
import { Plus } from 'lucide-react'
import HomepageSectionHeading from './HomepageSectionHeading'
import './FAQ.css'

const faqs = [
  {
    question: 'What types of projects do you take on?',
    answer: 'AningDesign works on marketing websites, WordPress builds, React web apps, startup MVPs, branding, and supporting digital design work.'
  },
  {
    question: 'Can you work with an existing website or brand?',
    answer: 'Yes. An existing website can be redesigned, improved, or extended, and established brand assets can be used where they are clear and ready to apply.'
  },
  {
    question: 'Do you build both WordPress and React websites?',
    answer: 'Yes. WordPress is a practical option for content-led sites that need simple editing, while React is suited to custom interactive experiences and web applications.'
  },
  {
    question: 'What do you need from me before we start?',
    answer: 'A short outline of your business or product, the problem the project should solve, any existing content or brand assets, and the timeline you are working toward are a useful starting point.'
  },
  {
    question: 'How do I request a quote?',
    answer: 'Use the project enquiry form below to share the scope, goals, and any helpful links. You will receive a response with the most practical next step.'
  }
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleItem = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index))
  }

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-section__inner">
        <HomepageSectionHeading
          description="Clear answers to the questions that usually come up before a website or design project begins."
          eyebrow="FAQ"
          title="Questions before we work together"
          titleId="faq-title"
        />

        <div className="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-answer-${index}`
            const triggerId = `faq-question-${index}`

            return (
              <article className="faq-accordion__item" key={faq.question}>
                <h3 className="faq-accordion__heading">
                  <button
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className="faq-accordion__trigger type-h4"
                    id={triggerId}
                    onClick={() => toggleItem(index)}
                    type="button"
                  >
                    <span>{faq.question}</span>
                    <Plus aria-hidden="true" className="faq-accordion__icon" size={20} strokeWidth={2} />
                  </button>
                </h3>
                <div
                  aria-labelledby={triggerId}
                  className="faq-accordion__panel"
                  hidden={!isOpen}
                  id={panelId}
                  role="region"
                >
                  <p className="type-body">{faq.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
