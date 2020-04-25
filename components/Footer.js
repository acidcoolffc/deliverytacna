import { useContext } from 'react'
import LanguageSelector, { LanguageContext } from './LanguageSelector'
import Link from 'next/link'
import useBreakpoint from '../hooks/useBreakpoint'

const pageContent = {
  'da-DK': {
    prefix: 'Et initiativ af',
    and: 'og',
    built: 'Udviklet af',
    os: 'Det er open source',
    dinePrefix: 'Spis i',
  },
  'en-GB': {
    prefix: 'Adaptado y Desplegado por',
    and: 'y',
    built: 'Desarrollado originalmente por',
    os: "It's open source",
    dinePrefix: 'Inspirado en',
  },
}

export default () => {
  const breakpoint = useBreakpoint()
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]
  return (
    <footer className="px-3">
      <div className="max-w-6xl mx-auto">
        <div className="border-t-2 border-sand pt-10 mb-4">
          <LanguageSelector />
        </div>
        <p className="mb-4">
          {content.prefix}{' '}
          {
            //<a href="https://negociostacna.com" target="_blank" rel="noopener"/>
          }
          <a href="https://negociostacna.com" target="_blank" rel="noopener">
            NegociosTacna.com
          </a>
          {
            // </a>
          }{' '}
          {content.and}{' '}
          <a
            href="https://negocien.com"
            target="_blank"
            rel="noopener"
          >
            Negocien.com
          </a>
          {'. '}
          {content.built}{' '}
          <a
            href="https://www.sebastianwinther.com"
            target="_blank"
            rel="noopener"
          >
            Sebastian Winther
          </a>
          .
        </p>
        <p className="mb-12">
          {content.dinePrefix}{' '}
          <a href="https://dineinberlin.com" target="_blank" rel="noopener">
            Berlin
          </a>
          {', '}
          <a href="https://jantarada.pt" target="_blank" rel="noopener">
            Portugal
          </a>
          {', '}
          <a href="https://llegamosatucasa.com" target="_blank" rel="noopener">
            Lima
          </a>
          {', '}
          <a href="https://vamosatucasa.com/" target="_blank" rel="noopener">
            Honduras
          </a>
        </p>
        <p className="border-t-2 border-sand py-8">
          {content.os}
          {' ⟶ '}
          <a
            className="ml-1"
            href="https://github.com/covid19-group/dinecph"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
