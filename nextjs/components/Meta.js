import headerStyles from '../styles/Header.module.css';
import Head from 'next/head'

const Meta = ({ title, description, keywords}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta