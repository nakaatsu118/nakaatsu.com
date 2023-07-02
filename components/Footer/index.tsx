import { NextPage } from "next";
import styles from './Footer.module.css'

const Footer: NextPage = () => {
  return (
    <div id="Footer" className={styles.footer}>
      <div>
        <a className="link text-white" href="https://twitter.com/nakaatsu" target="_blank" rel='noopener noreferrer'>@nakaatsu</a>
      </div>
    </div>
  )
}

export default Footer
