import type { NextPage } from 'next'
import styles from './Who.module.css'

const Who: NextPage = () => {
  return (
    <div id='Who' className={styles.whoContainer}>
      <div className={styles.sectionTitle}>
        <div className={styles.titleHead}></div>
        <h2 className={styles.title}><span>W</span>ho?</h2>
      </div>
      <div className={styles.whoSection}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src='/images/Icon_nakaatsu_.png'></img>
          <div className={styles.name}>
            <p>nakaatsu</p>
            <img src='/images/Polygon 3.svg'></img>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>
          革新的な問題解決に情熱を持つソフトウェアエンジニア。複雑な課題にも冷静に取り組み、効率的なソリューションを提供することに専念しています。
          </div>
          <div className={styles.socialIcons}>
            <img src='/images/logo/github.png' ></img>
            <img src='/images/logo/twitter.svg' ></img>
          </div>
        </div>
      </div>
      <div className={styles.backgroundImg}></div>
    </div>
  )
}

export default Who
