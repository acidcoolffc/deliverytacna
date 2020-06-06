import { useContext, useState } from 'react'
import Promise from 'promise-polyfill'
import fetch from 'isomorphic-unfetch'

import { LanguageContext } from '../components/LanguageSelector'
import Head from '../components/Head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'

const pageContent = {
  'da-DK': {
    title: 'Restauranter',
    neighbourhoodLabel: 'Nabolag',
    neighbourhoods: {
      ['Nørrebro']: 'Nørrebro',
      ['Østerbro']: 'Østerbro',
      ['Vesterbro']: 'Vesterbro',
      ['Inner city']: 'Indre by',
      ['Amager']: 'Amager',
      ['Frederiksberg']: 'Frederiksberg',
    },
    offersLabel: 'Tilbud',
    offers: {
      Food: 'Mad',
      Wine: 'Vin',
      Drinks: 'Drikkevarer',
      Giftcards: 'Gavekort',
    },
    delivery: 'Levering',
    orderLabel: 'Besøg og bestil',
  },
  'en-GB': {
    title: 'Negocios con Delivery',
    neighbourhoodLabel: 'Distritos',
    neighbourhoods: {
      ['Cercado']: 'Tacna',
      ['Pocollay']: 'Pocollay',
      ['Gregorio Albarracin']: 'Gregorio Albarracin',
      ['Alto de la Alianza']: 'Alto de la Alianza',
      ['Ciudad Nueva']: 'Ciudad Nueva',
    },
    offersLabel: 'Productos',
    offers: {
      Food: 'Food',
      Wine: 'Wine',
      Drinks: 'Drinks',
      Giftcards: 'Giftcards',
    },
    delivery: 'Delivery',
    orderLabel: 'Ordenar',
  },
}

const ListItem = ({ restaurant, content }) => {
  const name = restaurant.name || undefined
  const address = restaurant.address || undefined
  const description = restaurant.description || undefined
  const neighbourhoods = restaurant.neighbourhoods || undefined
  const offers = restaurant.offerings || undefined
  const delivery = restaurant.delivery || false
  const phone = restaurant.phone || undefined
  const phonee = restaurant.phonee || undefined
  const url = restaurant.url || undefined
  const imagenes = restaurant.foto || undefined

  return (
    <li className="w-full md:w-1/2 p-3">
      <div className="relative h-full flex flex-col items-start border border-sand overflow-hidden p-4 sm:p-8 lg:px-12">
        <div className="flex-auto">
          {name && <h3 className="text-xl sm:text-2xl">{name}</h3>}
          {neighbourhoods && !!neighbourhoods.length && (
            <ul className="-m-1 mb-6">
              {neighbourhoods.map(neighbourhood => (
                <li
                  key={neighbourhood}
                  className="inline-block font-medium text-xs sm:text-sm bg-sand px-2 py-1 m-1"
                >
                  {neighbourhood}
                </li>
              ))}
            </ul>
          )}
          {address && <p className="text-xs sm:text-sm mb-2">{address}</p>}
          {phone && <p className="text-sm mb-4">{phone + ' - ' + phonee}</p>}
          {description && (
            <pre className="max-w-xl text-sm sm:text-base mb-4">{description}</pre>
          )}
          {offers && !!offers.length && (
            <ul className="-m-1 mb-6">
              {offers.map(offer => (
                <li
                  key={offer}
                  className="inline-block font-medium text-xs sm:text-sm bg-sand px-2 py-1 m-1"
                >
                  {offer}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          {imagenes && !!offers.length && (
            <ul>
              {imagenes.map(imagen =>(
                <pre>
                  {imagen}
                </pre>
              ))}
            </ul>
          )}
        </div>
        {url && (
          <a
            href={url.includes('http') ? url : 'https://' + url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm sm:text-base"
          >
            {"Visitar Página Web"}&nbsp;&nbsp;&nbsp;⟶
          </a>
        )}
        {phone && (
          <a
            href={'https://api.whatsapp.com/send?phone=' + phone + '&text=Visto%20de%20la%20p%C3%A1gina%20deliverytacna.com,%20por%20favor%20enviarme%20los%20productos%20que%20ofrece%20y%20sus%20precios.'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm sm:text-base"
          >
            {"Ordenar Por WhatsApp"}&nbsp;&nbsp;&nbsp;⟶
          </a>
        )}
      </div>
    </li>
  )
}

const FilterLabel = ({ handleChange, isChecked, label }) => (
  <label
    className={
      'inline-block font-medium border-2 border-navy cursor-pointer px-2 py-1 m-1' +
      (isChecked ? ' text-sand-light bg-navy' : ' text-navy')
    }
  >
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      className="sr-only"
    />
    <span className="select-none">{label}</span>
  </label>
)

export default ({ restaurants }) => {
  const { language } = useContext(LanguageContext)
  const content = pageContent[language]

  const [filterOffers, setFilterOffers] = useState([])
  const [filterNeighbourhoods, setFilterNeighbourhoods] = useState([])

  if (restaurants && !!restaurants.length)
    return (
      <>
        <Head />
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-auto px-3 pt-8 sm:pt-16 pb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="flex-auto font-extrabold text-2xl sm:text-3xl leading-none mb-4 sm:mb-6">
                {content.title}
              </h2>           
              <div className="w-full flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.neighbourhoodLabel}
                </p>
                {['Cercado', 'Gregorio Albarracin', 'Pocollay', 'Alto de la Alianza', 'Ciudad Nueva','Calana','Pachia','Los Palos','Boca del Rio','CPM Leguia', 'Para Chico', 'Natividad'].map(neighbourhood => {
                  const isChecked = filterNeighbourhoods.includes(neighbourhood)
                  const handleChange = () => {
                    if (isChecked) {
                      const newNeighbourhoods = [...filterNeighbourhoods]
                      newNeighbourhoods.splice(newNeighbourhoods.indexOf(neighbourhood), 1)
                      setFilterNeighbourhoods(newNeighbourhoods)
                    } else {
                      setFilterNeighbourhoods([...filterNeighbourhoods, neighbourhood])
                    }
                  }
                  return (
                    <FilterLabel
                      key={neighbourhood}
                      handleChange={handleChange}
                      isChecked={isChecked}
                      label={neighbourhood}
                    />
                  )
                })}
              </div>
              <div className="w-full flex flex-wrap items-center -m-1 mb-4">
                <p className="w-full md:w-auto font-medium m-1 mr-2">
                  {content.offersLabel}
                </p>
                {['Abarrotes', 'Bebidas sin Alcohol', 'Café', 'Carne','Comida Preparada','Courrier/Transporte','Cuidado Personal','Frutas','Frutos Secos','Gas','Huevos','Limpieza','Lácteos','Mascarillas, Gel etc','Mascotas','Medicamentos','Otros','Panadería','Pizza y Pastas','Pescados y Mariscos','Pollo','Postres y Dulces','Quesos y Embutidos','Saludable y Orgánico','Verduras','Vinos y Licores','Útiles Escolares y Oficina','Pollo a la Brasa','Sanguches', 'Cilindrada', 'Carnes a la Brasa', 'Parrillas'].map(offer => {
                  const isChecked = filterOffers.includes(offer)
                  const handleChange = () => {
                    if (isChecked) {
                      const newOffers = [...filterOffers]
                      newOffers.splice(newOffers.indexOf(offer), 1)
                      setFilterOffers(newOffers)
                    } else {
                      setFilterOffers([...filterOffers, offer])
                    }
                  }
                  return (
                    <FilterLabel
                      key={offer}
                      handleChange={handleChange}
                      isChecked={isChecked}
                      label={offer}
                    />
                  )
                })}
              </div>
              <ul className="flex flex-wrap -m-3">
                {restaurants
                  // Filter for necessary content
                  .filter(
                    restaurant =>
                      restaurant.display &&
                      restaurant.name &&
                      restaurant.description
                  )
                  // Filter for neighbourhood
                  .filter(restaurant =>
                    filterNeighbourhoods && filterNeighbourhoods.length
                      ? filterNeighbourhoods.every(neighbourhood =>
                          restaurant.neighbourhoods.includes(neighbourhood)
                        )
                      : true
                  )
                  // Filter for offers
                  .filter(restaurant =>
                    filterOffers && filterOffers.length
                      ? filterOffers.every(offer =>
                          restaurant.offerings.includes(offer)
                        )
                      : true
                  )
                  // Filter for delivery
                  .map(restaurant => (
                    <ListItem
                      key={restaurant.name}
                      restaurant={restaurant}
                      content={content}
                    />
                  ))}
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )//listo25/04
  return (
    <div className="w-full h-full flex items-center justify-center text-3xl text-pink">
      <LoadingSpinner />
    </div>
  )
}

export async function getStaticProps() {
  const airtableApiKey = process.env.AIRTABLE_API_KEY
  const airtableBaseKey = process.env.AIRTABLE_BASE_KEY

  const Airtable = require('airtable')
  const airtable = new Airtable({
    apiKey: airtableApiKey,
  }).base(airtableBaseKey)
  const base = await airtable('Restaurants')
  const records = await base
    .select({
      maxRecords: 999999, // don't want to paginate...
      view: 'Grid view', // NOTE: changing the view name will break things
    })
    .all()
  const restaurants = await Promise.all(
    records.sort(() => 0.5 - Math.random()).map(record => record.fields)
  )

  return {

    revalidate: 14400,
    props: { restaurants } 

  }
}
