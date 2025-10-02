'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { ShoppingCart } from '@/components/ui/ShoppingCart';
import { SearchModal } from '@/components/ui/SearchModal';

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
      'h6',
      'transition-all duration-200 ease-in-out',
      'hover:scale-[1.02] active:scale-[0.98]',
      'no-underline'
    );

    if (variant === 'light') {
      if (isActive) {
        return cn(baseStyles, 'text-primary bg-transparent');
      }
      return cn(
        baseStyles,
        'text-neutral hover:text-primary',
        'hover:bg-primary/5 active:!bg-primary/10 active:!text-primary'
      );
    }

    if (isActive) {
      return cn(baseStyles, 'text-white bg-transparent');
    }
    return cn(
      baseStyles,
      'lg:text-white/85 lg:hover:text-white',
      'lg:hover:bg-white/5 active:!bg-white/10 lg:active:!text-white'
    );
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        getStyles(),
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
      )}
    >
      {children}
    </Link>
  );
}

interface NavbarProps {
  className?: string;
  variant?: NavbarVariant;
}

function CartBadge({
  count,
  variant,
}: {
  count: number;
  variant: NavbarVariant;
}) {
  if (count === 0) return null;

  return (
    <span
      className={cn(
        'absolute top-0.5 right-0.5 flex h-3 min-w-[5px] items-center justify-center rounded-full px-1 text-[10px] font-semibold lg:top-2 lg:right-3 lg:h-5 lg:min-w-4 lg:text-sm',
        variant === 'light' ? 'bg-primary text-white' : 'bg-white text-primary'
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}

export function Header({ className }: Omit<NavbarProps, 'variant'>) {
  const [variant, setVariant] = useState<NavbarVariant>('dark');
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { itemCount } = useCart();
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
      const isSentinelVisible =
        rect.top < window.innerHeight && rect.bottom > 0;

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
          ? 'border-y border-base-300 bg-white'
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
                aria-label="Open navigation menu"
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu z-[1] mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow transition-all duration-300"
              >
                <li>
                  <NavItem
                    href="/products"
                    variant={variant}
                    onClick={() => {
                      setTimeout(() => {
                        const elem = document.activeElement as HTMLElement;
                        elem?.blur();
                      }, 200);
                    }}
                  >
                    Sản phẩm
                  </NavItem>
                </li>
                <li>
                  <NavItem
                    href="/about"
                    variant={variant}
                    onClick={() => {
                      setTimeout(() => {
                        const elem = document.activeElement as HTMLElement;
                        elem?.blur();
                      }, 200);
                    }}
                  >
                    Giới thiệu
                  </NavItem>
                </li>
                <li>
                  <NavItem
                    href="/blogs"
                    variant={variant}
                    onClick={() => {
                      setTimeout(() => {
                        const elem = document.activeElement as HTMLElement;
                        elem?.blur();
                      }, 200);
                    }}
                  >
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
              aria-label="Search products"
              onClick={() => {
                setShowSearch(true);
                setShowCart(false); // Ensure cart modal is closed
              }}
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
                <NavItem href="/about" variant={variant}>
                  Giới thiệu
                </NavItem>
              </li>
              <li>
                <NavItem href="/blogs" variant={variant}>
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
              aria-label="Search products"
              onClick={() => {
                setShowSearch(true);
                setShowCart(false); // Ensure cart modal is closed
              }}
            >
              <span className="hidden xl:inline">Tìm kiếm</span>
            </Button>

            <div className="relative">
              <Button
                variant="button-outline"
                mode={variant === 'light' ? 'light' : 'dark'}
                icon="shopping-cart.svg"
                className="h-full border-t-0 border-b-0 border-l-0 px-6"
                aria-label="View shopping cart"
                onClick={() => {
                  setShowCart(true);
                  setShowSearch(false); // Ensure search modal is closed
                }}
              >
                <span className="hidden xl:inline">Giỏ hàng</span>
              </Button>
              <CartBadge count={itemCount} variant={variant} />
            </div>

            <Link href="/contact">
              <Button
                variant="button"
                mode={variant === 'light' ? 'light' : 'dark'}
                // Cần phải dùng màu thay đổi mọt chút này để fix lỗi constrast
                className={`h-full border-t-0 border-b-0 px-6 ${variant === 'dark' && 'bg-[#CC4712]'}`}
              >
                Liên hệ
              </Button>
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex lg:hidden">
            <div className="relative">
              <ButtonIcon
                variant="button-outline"
                theme={variant === 'light' ? 'light' : 'dark'}
                icon="shopping-cart.svg"
                className="h-[46px] w-[46px] border-y-0 border-r-0"
                aria-label="View shopping cart"
                onClick={() => {
                  setShowCart(true);
                  setShowSearch(false); // Ensure search modal is closed
                }}
              />
              <CartBadge count={itemCount} variant={variant} />
            </div>

            <Link href="/contact" aria-label="Contact us">
              <ButtonIcon
                variant="button-icon"
                theme={variant === 'light' ? 'light' : 'dark'}
                icon="send.svg"
                className="h-[46px] w-[46px] border-y-0"
                aria-label="Contact us"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Shopping Cart Modal */}
      <ShoppingCart
        showCart={showCart}
        onClose={useCallback(() => {
          setShowCart(false);
        }, [])}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearch}
        variant={variant}
        onClose={useCallback(() => {
          setShowSearch(false);
        }, [])}
      />
    </header>
  );
}
