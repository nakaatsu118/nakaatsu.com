import type { NextPage } from 'next'
import styles from './Welcome.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);
gsap.config({
    nullTargetWarn: false,
});

const Welcome: NextPage = () => {
  const commentRef = useRef(null);
  const backgroundImgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      backgroundImgRef.current,
      {
        y: '100%',
      },
      {
        y: '0%',
        delay: 0.2,
        duration: 1.2,
        ease: 'bounce.out'
      }
    )
  }, [backgroundImgRef])

  return (
    <>
      <div id='Welcome' className={styles.welcomeContainer}>
        <div className={styles.mainTitle} ref={commentRef}>Welcome to <br />[nakaatsu.com] !</div>
        <div className={styles.myIcon}>
          <img src='/images/Icon_nakaatsu_trans.png' alt='nakaatsu' />
        </div>
        <div className={styles.scrollDownContainer}>
          <div className={styles.scrollDown} />
          <p>Scroll</p>
        </div>
        <div className={styles.backgroundImg} ref={backgroundImgRef}></div>
      </div>
      <div className={styles.triangleLeft} />
    </>
  )
}

export default Welcome
