'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { ButtonIcon } from '@/components/ui/ButtonIcon';

type NavbarVariant = 'light' | 'dark';

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  variant?: NavbarVariant;
}

function NavItem({
  children,
  href = '#',
  isActive = false,
  onClick,
  variant = 'dark',
}: NavItemProps) {
  const getStyles = () => {
    const baseStyles = cn(
      'inline-flex items-center justify-center',
      'px-4 py-2 rounded-[5px]',
      'font-inter font-semibold text-[15px] leading-[1.27] tracking-[0.01em]',
      'transition-all duration-200 ease-in-out',
      'hover:scale-[1.02] active:scale-[0.98] active:opacity-85'
    );

    if (variant === 'light') {
      if (isActive) {
        return cn(baseStyles, 'text-primary bg-transparent');
      }
      return cn(
        baseStyles,
        'text-[#2A332B] hover:text-primary',
        'hover:bg-primary/5'
      );
    }

    if (isActive) {
      return cn(baseStyles, 'text-white bg-transparent');
    }
    return cn(baseStyles, 'text-white/85 hover:text-white', 'hover:bg-white/5');
  };

  return (
    <Link href={href} onClick={onClick} className={getStyles()}>
      {children}
    </Link>
  );
}

interface NavbarProps {
  className?: string;
  variant?: NavbarVariant;
}

export function Header({ className }: Omit<NavbarProps, 'variant'>) {
  const [variant, setVariant] = useState<NavbarVariant>('light');
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateVariant = (heroSentinel: Element | null) => {
      if (!heroSentinel) {
        setVariant('light');
        return;
      }

      const rect = heroSentinel.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      const isAtTop = scrollY < 50;
      const isSentinelVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      setVariant(isAtTop || isSentinelVisible ? 'dark' : 'light');
    };

    const initialize = () => {
      const heroSentinel = document.getElementById('hero-sentinel');
      
      // Update variant immediately
      updateVariant(heroSentinel);
      
      // Setup observer only if sentinel exists
      if (heroSentinel) {
        observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            setVariant(entry.isIntersecting ? 'dark' : 'light');
          },
          {
            threshold: 0,
            rootMargin: '0px 0px 50px 0px',
          }
        );
        
        observer.observe(heroSentinel);
      }
    };

    // Small delay to ensure DOM is ready after navigation
    timeoutId = setTimeout(initialize, 50);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 left-0 z-50 w-full py-0 pt-safe lg:h-[78px]',
        'transition-all duration-500 ease-in-out',
        variant === 'light'
          ? 'border-y border-neutral-200 bg-white'
          : 'border-y border-white/10 bg-transparent',
        className
      )}
    >
      <div className="page-container flex lg:h-full">
        <div className="navbar-start">
          {/* Mobile Left Actions */}
          <div className="flex lg:hidden">
            <div className="dropdown">
              <ButtonIcon
                tabIndex={0}
                role="button"
                variant="button-outline"
                theme={variant === 'light' ? 'light' : 'dark'}
                icon="menu.svg"
                className="h-[46px] w-[46px] border-y-0"
              />
              <ul className="dropdown-content menu z-[1] mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow">
                <li>
                  <NavItem href="/products" variant={variant}>
                    Sản phẩm
                  </NavItem>
                </li>
                <li>
                  <NavItem href="#about" variant={variant}>
                    Giới thiệu
                  </NavItem>
                </li>
                <li>
                  <NavItem href="#blog" variant={variant}>
                    Blog
                  </NavItem>
                </li>
              </ul>
            </div>

            <ButtonIcon
              variant="button-outline"
              theme={variant === 'light' ? 'light' : 'dark'}
              icon="search.svg"
              className="h-[46px] w-[46px] border-y-0 border-l-0 text-white"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal gap-2 px-1">
              <li>
                <NavItem href="/products" variant={variant}>
                  Sản phẩm
                </NavItem>
              </li>
              <li>
                <NavItem href="#about" variant={variant}>
                  Giới thiệu
                </NavItem>
              </li>
              <li>
                <NavItem href="#blog" variant={variant}>
                  Blog
                </NavItem>
              </li>
            </ul>
          </div>
        </div>

        {/* Center Logo */}
        <div className="navbar-center">
          <Link href="/" className="inline-flex items-center justify-center">
            <Logo type={variant === 'light' ? 'default' : 'white'} />
          </Link>
        </div>

        {/* Right Actions */}
        <div className="navbar-end lg:h-full">
          {/* Desktop Right Actions */}
          <div className="hidden h-full gap-0 lg:flex">
            <Button
              variant="button-outline"
              mode={variant === 'light' ? 'light' : 'dark'}
              icon="search.svg"
              className="h-full border-t-0 border-b-0 px-6"
            >
              <span className="hidden xl:inline">Tìm kiếm</span>
            </Button>

            <Button
              variant="button-outline"
              mode={variant === 'light' ? 'light' : 'dark'}
              icon="shopping-cart.svg"
              className="h-full border-t-0 border-b-0 border-l-0 px-6"
            >
              <span className="hidden xl:inline">Giỏ hàng</span>
            </Button>

            <Button
              variant="button"
              mode={variant === 'light' ? 'light' : 'dark'}
              className="h-full border-t-0 border-b-0 px-6"
            >
              Liên hệ
            </Button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex lg:hidden">
            <ButtonIcon
              variant="button-outline"
              theme={variant === 'light' ? 'light' : 'dark'}
              icon="shopping-cart.svg"
              className="h-[46px] w-[46px] border-y-0 border-r-0"
            />

            <ButtonIcon
              variant="button-icon"
              theme={variant === 'light' ? 'light' : 'dark'}
              icon="send.svg"
              className="h-[46px] w-[46px] border-y-0"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
