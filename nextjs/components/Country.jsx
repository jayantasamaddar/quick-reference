import Image from 'next/image';
import Link from 'next/link';
const Country = ({ href, name, population, capital, flag }) => {
  return (
    <tr>
        <td>
          <Link href={href} passHref>
            {name}
          </Link>
        </td>
        <td>{population}</td>
        <td>{capital}</td>
        <td><Image src={flag} alt={name} title={name} width={100} height={50} /></td>
    </tr>
  )
}

export default Country