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
  const ref = useRef(null);

  useEffect(() => {
    gsap.to(ref.current, {
      y: 100,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      duration: 1
    })
  }, [ref]);

  return (
    <>
      <div id='Welcome' className={styles.welcomeContainer}>
        <div className={styles.mainTitle} ref={ref}><p>Welcome to <br />[nakaatsu.com] !</p></div>
        <div className={styles.myIcon}>
          <img src='/images/Icon_nakaatsu_trans.png' alt='nakaatsu' />
        </div>
        <div className={styles.scrollDownContainer}>
          <div className={styles.scrollDown} />
          <p>Scroll</p>
        </div>
        <div className={styles.backgroundImg}></div>
      </div>
      <div className={styles.triangleLeft} />
    </>
  )
}

export default Welcome
