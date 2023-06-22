import type { NextPage } from 'next'
import styles from './Who.module.css'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);
gsap.config({
  nullTargetWarn: false,
});

const Who: NextPage = () => {
  const titleRef = useRef(null);
  const descriptionContainerRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current, {
        x: -120,
      },
      {
        x: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%'
        }
      }
    )
    gsap.fromTo(
      descriptionContainerRef.current, {
        height: 0,
      }, {
        height: 'auto',
        delay: 0.1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: descriptionContainerRef.current,
          start: 'top 85%'
        }
      }
    )
    gsap.fromTo(
      descriptionRef.current, {
        opacity: 0
      }, {
        opacity: 1,
        delay: 0.6,
        duration: 0.4,
        scrollTrigger: {
          trigger: descriptionContainerRef.current,
          start: 'top 85%'
        }
      }
    )
  }, [titleRef, descriptionContainerRef, descriptionRef])

  return (
    <div id='Who' className={styles.whoContainer}>
      <div className={styles.sectionTitle}>
        <div className={styles.titleHead}></div>
        <h2 className={styles.title} ref={titleRef}><span>W</span>ho?</h2>
      </div>
      <div className={styles.whoSection}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src='/images/Icon_nakaatsu_.png'></img>
          <div className={styles.name}>
            <p>nakaatsu</p>
            <img src='/images/Polygon 3.svg'></img>
          </div>
        </div>
        <div className={styles.descriptionContainer} ref={descriptionContainerRef}>
          <div className={styles.description} ref={descriptionRef}>
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
