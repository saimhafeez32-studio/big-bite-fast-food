import { createElement, useEffect, useState } from 'react';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsExiting(true);

    window.setTimeout(() => {
      onComplete();
    }, 500);
  };

  const introClassName = isExiting
    ? 'bigbite-intro bigbite-intro--exit'
    : 'bigbite-intro';

  return createElement(
    'div',
    {
      className: introClassName,
      'aria-label': 'Big Bite loading',
      role: 'status',
    },
    createElement(
      'div',
      {
        className: 'bigbite-intro__content',
      },
      createElement(
        'div',
        {
          className: 'bigbite-intro__brand',
          'aria-label': 'Big Bite',
        },
        createElement(
          'span',
          {
            className: 'bigbite-intro__brand-big',
          },
          'BIG'
        ),
        createElement(
          'span',
          {
            className: 'bigbite-intro__brand-bite',
          },
          'BITE'
        )
      ),
      createElement(
        'div',
        {
          className: 'bigbite-intro__loader',
        },
        createElement('div', {
          className: 'bigbite-intro__loader-line',
          onAnimationEnd: handleLoadingComplete,
        })
      )
    )
  );
}