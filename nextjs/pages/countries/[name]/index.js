// import { useRouter } from "next/router"
import axios from 'axios';

const country = ({ data: { name, region, capital } }) => {
    // const router = useRouter();
    // const { name } = router.query;
    return (
        <div>
            <p>
                {name.common}, officially known as {name.official}, is a country belonging to the continent 
        of {region}. It has it's capital at {capital.join(', ')}.
        </p>
        </div>
    )
}

// SSR - Serverside Rendering - Using getServerSideProps
export const getServerSideProps = async (ctx) => {
    const { data } = await axios.get(`https://restcountries.com/v3.1/name/${ctx.params.name}`);
    return { props: { data: data[0] } };
}



// SSG - Static Site Generation - Using getStaticProps and getStaticPaths
// export const getStaticProps = async (ctx) => {
//     const { data } = await axios.get(`https://restcountries.com/v3.1/name/${ctx.params.name}`);
//     return { props: { data: data[0] } };
// }

// export const getStaticPaths = async () => {
//     const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
//     const names = data.map(country => country.name.common);
//     const paths = names.map(name => ({ params: { name } }));
//     return { paths, fallback: false };
// }

export default country