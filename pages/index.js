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
        <main className="flex-auto px-3 md:pr-0 pt-8 lg:pt-0 pb-16">
          <div className="max-w-6xl flex items-center md:overflow-hidden mx-auto">
            <div className="flex-auto w-128 md:flex-shrink-0 md:pr-16">
              <h1 className="max-w-xl font-extrabold text-3xl sm:text-5xl leading-none mb-6">
                {content.titleBlue} <br className="hidden sm:inline" />
                <span className="text-pink">{content.titlePink}</span>
              </h1>
              <p className="max-w-xl text-navy-light text-base sm:text-lg md:text-xl mb-8">
                {content.description}
              </p>
              <div className="sm:-m-2">
                <Link href="/list">
                  <a className="w-full sm:w-auto h-12 btn btn-primary inline-flex items-center mb-3 sm:m-2">
                    {content.find}
                    <span className="inline sm:hidden flex-auto text-right">
                      ⟶
                    </span>
                  </a>
                </Link>
                <Link href="/submit">
                  <a className="w-full sm:w-auto h-12 btn btn-secondary inline-flex items-center sm:m-2">
                    {content.add}
                    <span className="inline sm:hidden flex-auto text-right">
                      ⟶
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            <img
              src="/assets/hero-illu-alt.webp"
              alt="Repartidor"
              className="hidden md:block w-128 h-128"
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

const pageContent = {
  'da-DK': {
    titleBlue: 'Støt restauranter i København ved at',
    titlePink: 'købe take-away',
    description: `Dine lokale spisesteder er ramt af den nuværende krise—men de laver stadig mad! Hjælp dem til at forblive åbne ved at købe take-away fra de bedste restauranter i København.`,
    find: 'Find restauranter',
    add: 'Tilføj din restaurant',
  },
  'en-GB': {
    titleBlue: 'Encuentra los negocios que hacen delivery en Tacna',
    titlePink: 'durante la cuarentena',
    description: `Este directorio ha sido creado para ayudar a todos los negocios que tienen permiso para distribuir sus productos vía delivery y a todas las familias que saben lo importante que es respetar la cuarentena. #yomequedoencasa`,
    find: 'Encuentra Delivery',
    add: 'Agrega Delivery',
  },
}
