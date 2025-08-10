import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

type NavbarVariant = 'navigation-bar' | 'dark';

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
  const getTextStyles = () => {
    if (variant === 'navigation-bar') {
      return cn('text-neutral hover:text-primary', isActive && 'text-primary');
    }

    return cn('text-white hover:text-primary', isActive && 'text-primary');
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center h6 px-3 py-2 transition-colors duration-200',
        getTextStyles()
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

export function Navbar({ className, variant = 'dark' }: NavbarProps) {
  return (
    <header
      className={cn(
        'navbar h-[78px] px-4 lg:px-[108px] py-0',
        variant === 'navigation-bar'
          ? 'bg-white border-b border-neutral-200'
          : 'bg-base-100 border-b border-white/10',
        className
      )}
    >
      {/* Left Navigation - Hidden on mobile, show on lg+ */}
      <div className='navbar-start'>
        <div className='dropdown lg:hidden'>
          <div tabIndex={0} role='button' className='btn btn-ghost'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
            <li>
              <NavItem href='#products' variant={variant}>
                Sản phẩm
              </NavItem>
            </li>
            <li>
              <NavItem href='#about' variant={variant}>
                Giới thiệu
              </NavItem>
            </li>
            <li>
              <NavItem href='#blog' variant={variant}>
                Blog
              </NavItem>
            </li>
          </ul>
        </div>
        <div className='hidden lg:flex'>
          <ul className='menu menu-horizontal px-1 gap-2'>
            <li>
              <NavItem href='#products' variant={variant}>
                Sản phẩm
              </NavItem>
            </li>
            <li>
              <NavItem href='#about' variant={variant}>
                Giới thiệu
              </NavItem>
            </li>
            <li>
              <NavItem href='#blog' variant={variant}>
                Blog
              </NavItem>
            </li>
          </ul>
        </div>
      </div>

      {/* Center Logo */}
      <div className='navbar-center'>
        <Link href='/' className='inline-flex items-center justify-center'>
          <Logo
            type={variant === 'navigation-bar' ? 'default' : 'white'}
            width={88}
            height={62}
            className='w-16 h-11 lg:w-[88px] lg:h-[62px]'
          />
        </Link>
      </div>

      {/* Right Actions */}
      <div className='navbar-end h-full'>
        <div className='hidden lg:flex gap-0 h-full'>
          <Button
            variant='button-outline'
            mode={variant === 'navigation-bar' ? 'light' : 'dark'}
            icon='search.svg'
            className='h-full px-6 border-t-0 border-b-0'
          >
            <span className='hidden xl:inline'>Tìm kiếm</span>
          </Button>

          <Button
            variant='button-outline'
            mode={variant === 'navigation-bar' ? 'light' : 'dark'}
            icon='shopping_cart.svg'
            className='h-full px-6 border-t-0 border-b-0 border-l-0'
          >
            <span className='hidden xl:inline'>Giỏ hàng</span>
          </Button>

          <Button
            variant='button'
            mode={variant === 'navigation-bar' ? 'light' : 'dark'}
            className='h-full px-6 border-t-0 border-b-0'
          >
            Liên hệ
          </Button>
        </div>

        {/* Mobile actions */}
        <div className='flex lg:hidden gap-1'>
          <Button
            variant='button-outline'
            mode='light'
            icon='search.svg'
            iconOnly
            className='btn-sm'
          />
          <Button
            variant='button-outline'
            mode='light'
            icon='shopping_cart.svg'
            iconOnly
            className='btn-sm'
          />
          <Button variant='button' mode='light' className='btn-sm'>
            Liên hệ
          </Button>
        </div>
      </div>
    </header>
  );
}
