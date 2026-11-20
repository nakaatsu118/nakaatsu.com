import { animate, hover, inView, press, scopeMotion, scroll } from 'motion';

function startMotion() {
  // HTML stays visible until JS starts an animation, including offscreen content.
  const main = document.querySelector<HTMLElement>('main');
  if (main) animate(main, { opacity: [0, 1] }, { duration: 0.3 });
  document
    .querySelectorAll<HTMLElement>('section[data-reveal]')
    .forEach((element) => {
      inView(element, () => {
        animate(element, { opacity: [0, 1] }, { duration: 0.2, delay: 0.1 });
      });
    });
  const hero = document.querySelector<HTMLElement>('.hero');
  if (hero) {
    animate(
      hero,
      { x: [400, 0], y: [200, 0], scale: [0, 1] },
      {
        type: 'spring',
        duration: 0.48,
        delay: 0.6,
        bounce: 0.3,
      },
    );
  }
  const portrait = document.querySelector<HTMLElement>('.profile img');
  if (portrait) {
    animate(
      portrait,
      { scale: [0, 1] },
      {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      },
    );
  }
  document
    .querySelectorAll<HTMLElement>('.blog-grid > li, .works > li')
    .forEach((element) => {
      const index = Array.from(element.parentElement!.children).indexOf(
        element,
      );
      inView(
        element,
        () => {
          animate(
            element,
            { x: [48, 0], y: [48, 0], scale: [0, 1] },
            {
              type: 'spring',
              duration: 0.4,
              delay: 0.1 * index,
              bounce: 0.3,
            },
          );
        },
        { margin: '120px' },
      );
    });
  document
    .querySelectorAll<HTMLElement>('.history > div')
    .forEach((element, index) => {
      inView(
        element,
        () => {
          animate(
            element,
            { x: [index % 2 ? '-100%' : '100%', '0%'], opacity: [0, 1] },
            {
              duration: 0.4 - index * 0.1,
              delay: 0.1,
            },
          );
        },
        { margin: '80px' },
      );
    });

  document
    .querySelectorAll<HTMLElement>(
      '.blog-card, .work-card, .social a, .share-link',
    )
    .forEach((element) => {
      const social = element.matches('.social a');
      const hoverScale = social
        ? 1.2
        : element.matches('.share-link')
          ? 1.1
          : 1.05;
      let hovered = false;
      let pressed = false;
      const update = () =>
        animate(
          element,
          {
            scale: pressed ? (social ? 0.8 : 0.9) : hovered ? hoverScale : 1,
            rotate: social && hovered ? 360 : 0,
          },
          { type: 'spring', stiffness: 400, damping: 11 },
        );
      hover(element, () => {
        hovered = true;
        update();
        return () => {
          hovered = false;
          update();
        };
      });
      // Bind presses to the actual link so noninteractive work cards don't gain a tab stop.
      press(
        element.matches('a') ? element : element.querySelector('a')!,
        () => {
          pressed = true;
          update();
          return () => {
            pressed = false;
            update();
          };
        },
      );
    });

  const progress = document.querySelector<HTMLElement>('.scroll-progress');
  if (progress) {
    progress.hidden = false;
    scroll(animate(progress, { scaleX: [0, 1] }, { ease: 'linear' }));
    return () => {
      progress.hidden = true;
    };
  }
}

// The scope collects every animation, listener, and gesture startMotion creates.
// When reduced motion turns on, it stops them all and restores inline styles.
scopeMotion(startMotion, { matchMedia: 'motion' });
