'use client';

import { Input } from '@/components/ui/Input';
import { useState } from 'react';

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-gray-400"
  >
    <path
      d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function InputTestPage() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('Nguyễn Hà Linh');
  const [value4, setValue4] = useState('Input label');
  const [value5, setValue5] = useState('Nguyễn Hà Linh');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="h2">Input Component Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Default State */}
          <div className="space-y-4">
            <h3 className="h4">Default State</h3>
            <Input
              label="Input label"
              helperText="Helper text"
              icon={<SearchIcon />}
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              data-testid="input-default"
            />
          </div>

          {/* Typing/Active State */}
          <div className="space-y-4">
            <h3 className="h4">Typing State</h3>
            <Input
              label="Type something..."
              helperText="Helper text"
              icon={<SearchIcon />}
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              variant="active"
              data-testid="input-typing"
            />
          </div>

          {/* Active with Value */}
          <div className="space-y-4">
            <h3 className="h4">Active with Value</h3>
            <Input
              label="Name"
              helperText="Helper text"
              icon={<SearchIcon />}
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
              variant="active"
              data-testid="input-active-value"
            />
          </div>

          {/* Error State */}
          <div className="space-y-4">
            <h3 className="h4">Error State</h3>
            <Input
              label="Input label"
              error="This is warning text"
              icon={<SearchIcon />}
              value={value4}
              onChange={(e) => setValue4(e.target.value)}
              data-testid="input-error"
            />
          </div>

          {/* Error with Value */}
          <div className="space-y-4">
            <h3 className="h4">Error with Value</h3>
            <Input
              label="Name"
              error="This is warning text"
              icon={<SearchIcon />}
              value={value5}
              onChange={(e) => setValue5(e.target.value)}
              data-testid="input-error-value"
            />
          </div>

          {/* Disabled State */}
          <div className="space-y-4">
            <h3 className="h4">Disabled State</h3>
            <Input
              label="Input label"
              helperText="Helper text"
              icon={<SearchIcon />}
              value="Disabled input"
              disabled
              data-testid="input-disabled"
            />
          </div>

          {/* Without Icon */}
          <div className="space-y-4">
            <h3 className="h4">Without Icon</h3>
            <Input
              label="Input without icon"
              helperText="Helper text"
              value="No icon here"
              data-testid="input-no-icon"
            />
          </div>

          {/* Email Type */}
          <div className="space-y-4">
            <h3 className="h4">Email Input</h3>
            <Input
              type="email"
              label="Email address"
              helperText="Enter your email"
              value="test@example.com"
              data-testid="input-email"
            />
          </div>

        </div>
      </div>
    </div>
  );
}