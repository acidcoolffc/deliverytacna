import Link from 'next/link'
import { useContext } from 'react'

import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default () => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  return (
    <>
      <Head />
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-auto px-3 pt-8 sm:pt-16 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-extrabold text-2xl sm:text-3xl leading-none mb-6">
              {content.title}
            </h2>
            <p className="max-w-xl text-navy-light text-lg mb-4">
              {content.description}
            </p>
            <p className="max-w-xl text-navy-light text-lg mb-4">
              {content.contact}
              <a href="mailto:admin@negocien.com">admin@negocien.com</a>.
            </p>
            <p className="max-w-xl text-navy-light text-lg">
              {content.webmaster}
              <a href="mailto:admin@negocien.com">
                admin@negocien.com
              </a>
              .
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

const pageContent = {
  'da-DK': {
    title: 'Nosotros',
    description: `COVID-19 krisen har ramt restaurant-scenen i København. Mange af dem er begyndt at tilbyde take-away som en respons. Vi har lavet den her side for at sprede ordet – inspireret af `,
    contact: 'De fleste henvendelser til ',
    webmaster: 'Ris og ros til hjemmesiden til ',
  },
  'en-GB': {
    title: 'Nosotros',
    description: `Este directorio ha sido creado para ayudar a todos los negocios que tienen permiso para distribuir sus productos vía delivery y a todas las familias que saben lo importante que es respetar la cuarentena. #yomequedoencasa`,
    contact: 'Para consultas y sugerencias: ',
    webmaster: 'Para Digitalizar tu negocio contactanos a: ',
  },
}
