import Meta from '../components/Meta'
import styles from '../styles/Layout.module.css'

const about = () => {
  return (
    <div className={styles.container}>
        <Meta title="About Us" 
                  description="This is the About Us Page" 
                  keywords="about" 
        />
        <h1>About Us</h1>
    </div>
  )
}

export default about