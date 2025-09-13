'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProductTooltipCard } from '@/components/ui/ProductTooltipCard';
import type { Product } from '@/types/product';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  variant?: 'light' | 'dark';
}

// Recent search tags - can be dynamic from localStorage or API
const recentSearchTags = [
  'Gỗ nhựa WPC',
  'Tin xuất khẩu',
  'Sự kiện',
  'Giải thưởng',
  'Hoạt động xã hội',
  'Lifestyle',
];

export function SearchModal({
  isOpen,
  onClose,
  className,
  variant = 'light',
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  // Handle modal open/close
  useEffect(() => {
    const modal = document.getElementById('search_modal') as HTMLDialogElement;
    if (!modal) return;

    if (isOpen) {
      modal.showModal();
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      modal.close();
    }
  }, [isOpen]);

  // Handle modal close event separately
  useEffect(() => {
    const modal = document.getElementById('search_modal') as HTMLDialogElement;
    if (!modal) return;

    const handleClose = () => {
      onClose();
    };

    modal.addEventListener('close', handleClose);
    return () => {
      modal.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setShowResults(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle search action
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      setShowResults(false);

      try {
        // Search products only via API
        const response = await fetch(
          `/api/search/products?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        console.log('[DEBUG] / handleSearch / data:', data);

        if (response.ok) {
          setSearchResults(data.products || []);
        } else {
          console.error('Search API error:', data.error);
          setSearchResults([]);
        }
        setIsLoading(false);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        setIsLoading(false);
        setShowResults(true);
      }
    }
  };

  // Handle tag click
  const handleTagClick = async (tag: string) => {
    setSearchQuery(tag);
    setIsLoading(true);
    setShowResults(false);

    try {
      // Search products with the tag via API
      const response = await fetch(
        `/api/search/products?q=${encodeURIComponent(tag)}`
      );
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data.products || []);
      } else {
        console.error('Tag search API error:', data.error);
        setSearchResults([]);
      }
      setIsLoading(false);
      setShowResults(true);
    } catch (error) {
      console.error('Tag search error:', error);
      setSearchResults([]);
      setIsLoading(false);
      setShowResults(true);
    }
  };

  return (
    <dialog
      id="search_modal"
      ref={modalRef}
      className={cn('modal m-0 modal-top p-0', className)}
      onClick={(e) => {
        // Close modal when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-box mx-auto w-11/12 max-w-[108rem] rounded-none bg-white p-0 shadow-lg">
        {/* Search Bar Section */}
        <div className="py-0">
          <div className="flex h-12 items-center gap-0 lg:h-19">
            {/* Search Input - matches Figma design */}
            <div className="h-full flex-1">
              <Input
                ref={inputRef}
                type="search"
                placeholder="Bạn đang cần tìm kiếm gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                icon={
                  <div
                    className="h-6 w-6 bg-current"
                    style={{
                      maskImage: 'url(/icons/search.svg)',
                      WebkitMaskImage: 'url(/icons/search.svg)',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                    }}
                  />
                }
                className="h-full rounded-none border border-[#e6e6e6] focus-within:!border-2 focus-within:!border-[#e6e6e6]"
              />
            </div>

            {/* Search Button - Matches header search button variant */}
            <Button
              variant="button"
              mode={variant === 'light' ? 'light' : 'dark'}
              onClick={handleSearch}
              disabled={isLoading}
              className="h-full rounded-none border-0 px-8 transition-all duration-200 active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'h-4 w-4 animate-spin rounded-full border-2',
                      variant === 'light'
                        ? 'border-primary/30 border-t-primary'
                        : 'border-white/30 border-t-white'
                    )}
                  ></div>
                  Đang tìm...
                </div>
              ) : (
                'Tìm kiếm'
              )}
            </Button>
          </div>
        </div>

        {/* Recent Search Section - only show when no search results and not loading */}
        {!showResults && !isLoading && (
          <div className="animate-in fade-in slide-in-from-bottom-2 p-5 duration-500">
            <div className="flex flex-col gap-[7px]">
              {/* Section Title */}
              <div className="subtitle-4 text-[#424c43] uppercase">
                Tìm kiếm gần đây
              </div>

              {/* Recent Search Tags */}
              <div className="flex flex-wrap gap-1">
                {recentSearchTags.map((tag, index) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={cn(
                      'body-2 bg-[#f0f0f0] px-2.5 py-1.5 text-[#424c43] transition-all duration-200 ease-out',
                      'hover:scale-105 hover:bg-[#e6e6e6] hover:shadow-sm active:scale-95',
                      'animate-in fade-in slide-in-from-bottom-1'
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationDuration: '400ms',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="animate-in fade-in zoom-in-95 flex items-center justify-center p-12 duration-300">
            <div className="flex flex-col items-center gap-4">
              <span
                className={cn(
                  'loading loading-lg loading-spinner',
                  variant === 'light' ? 'text-primary' : 'text-[#f57f41]'
                )}
              ></span>
              <p className="body-2 text-[#424c43]/70">
                Đang tìm kiếm sản phẩm...
              </p>
            </div>
          </div>
        )}

        {/* Search Results Section */}
        {showResults && (
          <div className="animate-in fade-in slide-in-from-bottom-4 p-5 duration-500">
            <div className="flex flex-col gap-[7px]">
              {/* Results Section Title */}
              <div className="subtitle-4 animate-in fade-in slide-in-from-left-2 text-[#424c43] uppercase duration-300">
                Sản phẩm
              </div>

              {/* Product Results Grid */}
              <div className="flex flex-col gap-4 lg:flex-row">
                {searchResults.slice(0, 3).map((product, index) => (
                  <div
                    key={product.slug}
                    className={cn(
                      'animate-in fade-in slide-in-from-bottom-2 flex-1',
                      'transition-transform duration-200 ease-out hover:scale-[1.02]'
                    )}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationDuration: '600ms',
                    }}
                  >
                    <ProductTooltipCard
                      id={product.slug}
                      image={
                        product.gallery[0] || '/images/product-placeholder.jpg'
                      }
                      title={product.title}
                      subtitle={product.collection}
                      price={product.price || 'Liên hệ'}
                      dimensions={
                        product.dimensions?.[0] || 'Đa dạng kích thước'
                      }
                      slug={product.slug}
                      className="w-full border border-[#dcdcdc] transition-all duration-200 hover:border-[#f57f41]/30 hover:shadow-lg"
                    />
                  </div>
                ))}
              </div>

              {searchResults.length === 0 && (
                <div className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-center py-8 text-center duration-500">
                  <div className="mb-4 text-4xl opacity-50">🔍</div>
                  <p className="body-2 text-[#424c43]/70">
                    Không tìm thấy sản phẩm nào cho &quot;{searchQuery}&quot;
                  </p>
                  <p className="body-3 mt-1 text-[#424c43]/50">
                    Hãy thử từ khóa khác
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal backdrop form for closing */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
