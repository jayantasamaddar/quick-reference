import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import Meta from '../components/Meta'
import CountriesList from '../components/CountriesList';

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Meta title="List of Countries" 
                  description="This is a test project for Next.js" 
                  keywords="countries, nextjs, test, project" 
      />
      <h1>Countries</h1>
      <CountriesList countries = {data.sort((a, b) => a.name.common > b.name.common)} />
    </div>
  );
}

// // Using fetch to get data from an API
// export const getStaticProps = async () => {
//   const res = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
//   return { props: { data: await res.json() } };
// }

//Using axios to get data from an API

export const getStaticProps = async () => {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  return { props: { data } };
}
