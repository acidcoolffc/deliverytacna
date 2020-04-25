import { useContext, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'react-feather'

import useBreakpoint from '../hooks/useBreakpoint'
import { LanguageContext } from './LanguageSelector'
import Logo from './Logo'

const content = {
  restaurants: {
    'da-DK': {
      label: 'Restauranter',
      map: 'Se på kort',
      list: 'Se på liste',
    },
    'en-GB': {
      label: 'Deliverys',
      map: 'Vista Mapa',
      list: 'Mostrar Negocios',
    },
  },
  about: { 'da-DK': 'Om os', 'en-GB': 'Nosotros' },
  forRestaurants: {
    'da-DK': {
      label: 'For restauranter',
      resources: 'Ressourcer',
      submit: 'Tilføj',
    },
    'en-GB': {
      label: 'Para Negocios',
      resources: 'Recursos',
      submit: 'Agregar Delivery',
    },
  },
  submit: {
    'da-DK': 'Tilføj',
    'en-GB': 'Agregar',
  },
}

export default () => {
  const breakpoint = useBreakpoint()
  const { language } = useContext(LanguageContext)

  const [isLogoHovered, setIsLogoHovered] = useState(false)

  return (
    <nav className="px-3 py-6">
      <div className="max-w-6xl flex items-center mx-auto">
        <div className="flex-auto flex items-center -mx-3">
          <Link href="/">
            <a
              onMouseOver={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              className="inline-flex items-center ml-3 sm:mr-6"
            >
              <Logo
                isHovered={isLogoHovered}
                className="stroke-none text-3xl sm:mr-1"
              />
              <h2 className="hidden sm:inline-block font-extrabold text-2xl">
                Delivery Tacna
              </h2>
            </a>
          </Link>
          <NavLink href="/list" label={content.restaurants[language].list} />
          <NavLink href="/about" label={content.about[language]} />
        </div>
        <div className="-mx-3">
          {breakpoint.sm ? (
            <Dropdown
              align="right-0"
              items={[
                {
                  href: '/resources',
                  label: content.forRestaurants[language].resources,
                },
                {
                  href: '/submit',
                  label: content.forRestaurants[language].submit,
                },
              ]}
              label={content.forRestaurants[language].label}
            />
          ) : (
            <NavLink href="/submit" label={content.submit[language]} />
          )}
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, label }) => (
  <Link href={href}>
    <a className="font-medium mx-3">{label}</a>
  </Link>
)

const Dropdown = ({ align, items, label }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <>
      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          className="fixed inset-0 z-10"
        />
      )}
      <div className="flex flex-col mx-3">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex items-center font-medium"
        >
          {label}
          <ChevronDown
            style={{ transform: 'translateY(1px)' }}
            className="text-navy-light ml-2"
          />
        </button>
        <div className="relative">
          <AnimatePresence>
            {showDropdown && (
              <motion.ul
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 8 }}
                exit={{ opacity: 0, y: 0 }}
                className={
                  (align ? align + ' ' : 'left-0 ') +
                  'absolute top-0 z-20 w-48 bg-sand-light border border-sand'
                }
              >
                {items.map(({ href, label }) => (
                  <li key={label} className="w-full">
                    <Link href={href}>
                      <a
                        onClick={() => setShowDropdown(false)}
                        className="group flex font-medium px-3 py-2 my-2"
                      >
                        {label}
                        <span className="flex-auto text-right text-sand-light group-hover:text-navy-light transition-color duration-150 ease-in-out">
                          ⟶
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
