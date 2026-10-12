import { animate, hover, inView, press, scroll } from 'framer-motion/dom';

const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

function startMotion() {
  const cleanups: (() => void)[] = [];
  const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
  const elements = new Set<HTMLElement>();
  const play = (
    element: HTMLElement,
    keyframes: Parameters<typeof animate>[1],
    options: Parameters<typeof animate>[2] = {},
  ) => {
    elements.add(element);
    animations.get(element)?.stop();
    const animation = animate(element, keyframes, options);
    animations.set(element, animation);
    void animation.then(() => {
      if (animations.get(element) === animation) animations.delete(element);
    });
    return animation;
  };

  // HTML stays visible until JS starts an animation, including offscreen content.
  const main = document.querySelector<HTMLElement>('main');
  if (main) play(main, { opacity: [0, 1] }, { duration: 0.3 });
  document
    .querySelectorAll<HTMLElement>('section.section')
    .forEach((element) => {
      cleanups.push(
        inView(element, () => {
          play(element, { opacity: [0, 1] }, { duration: 0.2, delay: 0.1 });
        }),
      );
    });
  const hero = document.querySelector<HTMLElement>('.hero');
  if (hero) {
    play(
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
    play(
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
      cleanups.push(
        inView(
          element,
          () => {
            play(
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
        ),
      );
    });
  document
    .querySelectorAll<HTMLElement>('.history > div')
    .forEach((element, index) => {
      cleanups.push(
        inView(
          element,
          () => {
            play(
              element,
              { x: [index % 2 ? '-100%' : '100%', '0%'], opacity: [0, 1] },
              {
                duration: 0.4 - index * 0.1,
                delay: 0.1,
              },
            );
          },
          { margin: '80px' },
        ),
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
        play(
          element,
          {
            scale: pressed ? (social ? 0.8 : 0.9) : hovered ? hoverScale : 1,
            rotate: social && hovered ? 360 : 0,
          },
          { type: 'spring', stiffness: 400, damping: 11 },
        );
      cleanups.push(
        hover(element, () => {
          hovered = true;
          update();
          return () => {
            hovered = false;
            update();
          };
        }),
      );
      // Bind presses to the actual link so noninteractive work cards don't gain a tab stop.
      cleanups.push(
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
        ),
      );
    });

  const progress = document.querySelector<HTMLElement>('.scroll-progress');
  if (progress) {
    progress.hidden = false;
    const animation = play(progress, { scaleX: [0, 1] }, { ease: 'linear' });
    cleanups.push(scroll(animation));
    cleanups.push(() => {
      progress.hidden = true;
    });
  }
  return () => {
    cleanups.forEach((cleanup) => cleanup());
    animations.forEach((animation) => animation.stop());
    elements.forEach((element) => {
      element.style.removeProperty('transform');
      element.style.removeProperty('opacity');
    });
  };
}

let stopMotion = () => {};
function applyPreference() {
  stopMotion();
  stopMotion = preference.matches ? () => {} : startMotion();
}
applyPreference();
preference.addEventListener('change', applyPreference);
