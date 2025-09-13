'use client';

import React from 'react';
import { Logo } from '@/components/ui/Logo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Footer() {
  const router = useRouter();
  
  return (
    <footer className="relative bg-white/85">
      {/* Upper section with background image */}
      <div className="relative overflow-hidden bg-primary">
        <div className="relative h-[80px] w-full bg-white/85 lg:absolute lg:top-0 lg:left-0 lg:h-full">
          {/* Background Image */}
          <Image
            src="/images/footer-background.png"
            alt=""
            fill
            className="object-cover object-left-top"
            sizes="(max-width: 1024px) 400w, 1920w"
            priority
          />
        </div>

        {/* Content overlay */}
        <div className="page-container relative">
          {/* Main footer content */}
          <div className="px-2 py-6 lg:px-15 lg:pt-16 lg:pb-10 lg:pl-[30%]">
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-12 xl:gap-16">
              {/* Company Information */}
              <div className="space-y-3 lg:space-y-6">
                <h4 className="text-white">
                  Công ty cổ phần đầu tư & <br />
                  phát triển gỗ nhựa Việt Nam
                </h4>

                <div className="space-y-2 lg:space-y-4">
                  <div>
                    <p className="subtitle-4 text-white/85">Địa chỉ</p>
                    <p className="h6 text-white">
                      Khu 8, xã Gia Thanh, Phú Thọ, Việt Nam
                    </p>
                  </div>

                  <div>
                    <p className="subtitle-4 text-white/85">Điện thoại</p>
                    <p className="h6 text-white">(+84) 964 452 566</p>
                  </div>

                  <div>
                    <p className="subtitle-4 text-white/85">Email</p>
                    <a
                      href="mailto:gonhuawpc@gmail.com"
                      className="h6 text-white underline transition-colors hover:text-white/90"
                    >
                      gonhuawpc@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="h-px w-[85%] bg-white/30 lg:hidden"
                aria-hidden="true"
              />

              {/* Products */}
              <div className="flex gap-12 lg:flex-col lg:gap-8">
                <div className="space-y-2 lg:space-y-4">
                  <p className="subtitle-4 text-white/85">Sản phẩm</p>
                  <div className="space-y-2 lg:space-y-3">
                    <p 
                      className="h5-footer cursor-pointer transition-colors hover:text-white/90" 
                      onClick={() => router.push('/products?category=san-go-noi-that')}
                    >
                      Sàn gỗ nội thất
                    </p>
                    <p 
                      className="h5-footer cursor-pointer transition-colors hover:text-white/90" 
                      onClick={() => router.push('/products?category=tran-nha-trang-tri')}
                    >
                      Trần nhà & trần trang trí
                    </p>
                    <p 
                      className="h5-footer cursor-pointer transition-colors hover:text-white/90" 
                      onClick={() => router.push('/products?category=op-tuong-ngoai-that')}
                    >
                      Ốp tường ngoại thất
                    </p>
                    <p 
                      className="h5-footer cursor-pointer transition-colors hover:text-white/90" 
                      onClick={() => router.push('/products?category=san-ngoai-troi')}
                    >
                      Sàn ngoài trời
                    </p>
                  </div>
                </div>
                <div className="space-y-2 lg:space-y-4">
                  <p className="subtitle-4 text-white/85">VINA WPC</p>
                  <div className="space-y-2 lg:space-y-3">
                    <Link
                      href="/about"
                      className="h5-footer block cursor-pointer text-white transition-colors hover:text-white/90"
                    >
                      Về chúng tôi
                    </Link>

                    <Link
                      href="/contact"
                      className="h5-footer block cursor-pointer text-white transition-colors hover:text-white/90"
                    >
                      Liên hệ
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="h-px w-[85%] bg-white/30 lg:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-7">
                <div className="space-y-3">
                  <p className="subtitle-4 text-white/85">
                    Nhận ưu đãi từ chúng tôi
                  </p>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      className="body-3 w-full border border-white/30 bg-transparent px-5 py-4 text-white placeholder-white/75 transition-colors focus:border-white/50 focus:outline-none"
                    />
                    <button className="absolute top-1/2 right-4 -translate-y-1/2 text-white/75 transition-colors hover:text-white">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 5 10"
                      >
                        <path d="M4.1972 3.25386L1.1372 0.193862C1.01229 0.0696943 0.843323 0 0.667199 0C0.491075 0 0.322107 0.0696943 0.197199 0.193862C0.134713 0.255837 0.0851172 0.329571 0.0512714 0.41081C0.0174257 0.49205 0 0.579187 0 0.667195C0 0.755203 0.0174257 0.84234 0.0512714 0.923579C0.0851172 1.00482 0.134713 1.07855 0.197199 1.14053L3.26387 4.19386C3.32635 4.25584 3.37595 4.32957 3.40979 4.41081C3.44364 4.49205 3.46107 4.57919 3.46107 4.66719C3.46107 4.7552 3.44364 4.84234 3.40979 4.92358C3.37595 5.00482 3.32635 5.07855 3.26387 5.14053L0.197199 8.19386C0.0716631 8.31851 0.00078661 8.48793 0.000161489 8.66483C-0.000463632 8.84174 0.0692144 9.01166 0.193866 9.13719C0.318518 9.26273 0.487933 9.3336 0.664842 9.33423C0.841751 9.33486 1.01166 9.26518 1.1372 9.14052L4.1972 6.08053C4.57173 5.70553 4.78211 5.1972 4.78211 4.66719C4.78211 4.13719 4.57173 3.62886 4.1972 3.25386V3.25386Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between lg:flex-col lg:items-start">
                  {/* Social Media */}
                  <div className="space-y-1">
                    <p className="subtitle-4 text-white/85">
                      Kết nối với chúng tôi
                    </p>
                    <div className="flex items-center gap-2 px-0.5">
                      {/* Facebook */}
                      <a
                        href="https://www.facebook.com/vinawpc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-5 w-5 transition-opacity hover:opacity-80"
                      >
                        <Image
                          src="/icons/facebook.svg"
                          alt="Facebook"
                          width={20}
                          height={21}
                          className="h-full w-full"
                        />
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/vinawpc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-5 w-5 transition-opacity hover:opacity-80"
                      >
                        <Image
                          src="/icons/instagram.svg"
                          alt="Instagram"
                          width={20}
                          height={21}
                          className="h-full w-full"
                        />
                      </a>

                      {/* YouTube */}
                      <a
                        href="https://www.youtube.com/@vinawpc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-6 w-6 transition-opacity hover:opacity-80"
                      >
                        <Image
                          src="/icons/youtube.svg"
                          alt="YouTube"
                          width={25}
                          height={25}
                          className="h-full w-full"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Legal Links */}
                  <div>
                    <p className="body-3 cursor-pointer text-white transition-colors hover:text-white/90">
                      Privacy Policy
                    </p>
                    <p className="body-3 cursor-pointer text-white transition-colors hover:text-white/90">
                      Terms and Conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower section with white background */}
      <div className="flex min-h-[150px] py-3 lg:min-h-[400px] lg:py-8">
        <div className="page-container relative">
          <div className="flex justify-between lg:h-full lg:items-end">
            <Logo type="default" className="lg:scale-150" />

            <div className="body-3 text-right">
              © Bản quyền VINA WPC 2025
              <br />
              Thiết kế bởi Dun.creative
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-primary text-[clamp(4rem,12vw,11.5rem)] leading-none font-semibold tracking-tight whitespace-nowrap text-[#3c5f3e]">
            VINA WPC
          </div>
        </div>
      </div>
    </footer>
  );
}
