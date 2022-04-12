import headerStyles from '../styles/Header.module.css';

const Header = () => {
  return (
    <div>
        <h1 className={headerStyles.title}>
            <span>Countries</span>
        </h1>
        <p className={headerStyles.description}>
            This is a demo project created while learning Next.js
        </p>
    </div>
  )
}

export default Header