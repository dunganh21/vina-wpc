import React from 'react';
import Link from 'next/link';
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

export function Header({ className, variant = 'dark' }: NavbarProps) {
  return (
    <header
      className={cn(
        'absolute top-0 left-0 z-50 navbar h-[78px] w-full px-4 py-0 lg:px-[108px]',
        variant === 'light'
          ? 'border-b border-neutral-200 bg-white'
          : 'border-b border-white/10 bg-transparent',
        className
      )}
    >
      {/* Left Navigation - Hidden on mobile, show on lg+ */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="dropdown-content menu z-[1] mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow">
            <li>
              <NavItem href="#products" variant={variant}>
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
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            <li>
              <NavItem href="#products" variant={variant}>
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
          <Logo
            type={variant === 'light' ? 'default' : 'white'}
            width={88}
            height={62}
            className="h-11 w-16 lg:h-[62px] lg:w-[88px]"
          />
        </Link>
      </div>

      {/* Right Actions */}
      <div className="navbar-end h-full">
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

        {/* Mobile actions */}
        <div className="flex gap-1 lg:hidden">
          <ButtonIcon
            variant="button-outline"
            theme="light"
            icon="search.svg"
            className="btn-sm"
          />
          <ButtonIcon
            variant="button-outline"
            theme="light"
            icon="shopping-cart.svg"
            className="btn-sm"
          />
          <Button variant="button" mode="light" className="btn-sm">
            Liên hệ
          </Button>
        </div>
      </div>
    </header>
  );
}
