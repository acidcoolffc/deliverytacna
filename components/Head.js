import Head from 'next/head'

export default ({ children }) => {
  const title = 'Delivery Tacna - Encuentra negocios con Delivery'
  const description =
    "Este directorio ha sido creado para ayudar a todos los negocios que tienen permiso para distribuir sus productos vía delivery y a todas las familias que saben lo importante que es respetar la cuarentena. #yomequedoencasa"
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="https://deliverytacna.com/favicon.png" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://deliverytacna.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="" /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://deliverytacna.com/og-image.png" />
      {children}
    </Head>
  )
}
