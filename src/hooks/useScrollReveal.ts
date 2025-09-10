'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  animationClass?: string;
  once?: boolean; // Default true for one-time animations
  elementType?: 'text' | 'image' | 'card' | 'background' | 'ui'; // Different timing profiles
}

interface ScrollRevealHook<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
}

// Single shared Intersection Observer for performance
class ScrollRevealManager {
  private static instance: ScrollRevealManager;
  private observer: IntersectionObserver | null = null;
  private elements = new Map<Element, () => void>();

  static getInstance(): ScrollRevealManager {
    if (!ScrollRevealManager.instance) {
      ScrollRevealManager.instance = new ScrollRevealManager();
    }
    return ScrollRevealManager.instance;
  }

  private constructor() {
    this.createObserver();
  }

  private createObserver() {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = this.elements.get(entry.target);
            if (callback) {
              callback();
            }
          }
        });
      },
      {
        threshold: 0.3, // Require 30% of element to be visible
        rootMargin: '0px 0px -100px 0px', // Start animation when element is 100px inside viewport
      }
    );
  }

  observe(
    element: Element,
    callback: () => void,
    options?: UseScrollRevealOptions
  ) {
    if (!this.observer) return;

    // Update observer options if needed
    if (options?.threshold !== undefined || options?.rootMargin !== undefined) {
      this.observer.disconnect();
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const callback = this.elements.get(entry.target);
              if (callback) {
                callback();
              }
            }
          });
        },
        {
          threshold: options?.threshold ?? 0.1,
          rootMargin: options?.rootMargin ?? '0px 0px -50px 0px',
        }
      );

      // Re-observe all existing elements
      this.elements.forEach((_, el) => {
        this.observer?.observe(el);
      });
    }

    this.elements.set(element, callback);
    this.observer.observe(element);
  }

  unobserve(element: Element) {
    if (!this.observer) return;

    this.observer.unobserve(element);
    this.elements.delete(element);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.elements.clear();
    }
  }
}

// Helper function to get timing based on element type
function getTimingForElementType(elementType?: string) {
  switch (elementType) {
    case 'background':
      return { threshold: 0.1, rootMargin: '0px 0px 0px 0px' }; // Start early for backgrounds
    case 'image':
      return { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }; // Start early for images
    case 'card':
      return { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }; // Start much earlier for cards
    case 'text':
      return { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }; // Text can start closer
    case 'ui':
      return { threshold: 0.2, rootMargin: '0px 0px -20px 0px' }; // UI elements start closest
    default:
      return { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }; // Default balanced timing
  }
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {}
): ScrollRevealHook<T> {
  const {
    staggerDelay = 0,
    animationClass = 'animate-on-scroll',
    once = true,
    elementType,
  } = options;

  // Get timing based on element type, but allow manual override
  const timing = getTimingForElementType(elementType);
  const threshold = options.threshold ?? timing.threshold;
  const rootMargin = options.rootMargin ?? timing.rootMargin;

  const ref = useRef<T>(null);
  const hasAnimatedRef = useRef(false);

  const handleIntersection = useCallback(() => {
    if (!ref.current) return;

    // If once is true and already animated, skip
    if (once && hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;

    const element = ref.current;

    // Apply animation with stagger delay
    const applyAnimation = () => {
      element.classList.add('animate-in');

      // Clean up after animation completes
      const cleanup = () => {
        element.classList.add('animation-complete');
        element.removeEventListener('transitionend', cleanup);
        element.removeEventListener('animationend', cleanup);

        // Remove will-change for performance
        element.style.willChange = 'auto';
      };

      element.addEventListener('transitionend', cleanup, { once: true });
      element.addEventListener('animationend', cleanup, { once: true });
    };

    if (staggerDelay > 0) {
      setTimeout(applyAnimation, staggerDelay);
    } else {
      applyAnimation();
    }

    // Unobserve after first animation if once is true
    if (once) {
      const manager = ScrollRevealManager.getInstance();
      manager.unobserve(element);
    }
  }, [staggerDelay, once]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add base animation class
    element.classList.add(animationClass);

    const manager = ScrollRevealManager.getInstance();
    manager.observe(element, handleIntersection, { threshold, rootMargin });

    return () => {
      if (element) {
        manager.unobserve(element);
      }
    };
  }, [animationClass, handleIntersection, threshold, rootMargin]);

  return {
    ref,
  };
}

