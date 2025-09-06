'use client';

import { TextArea } from '@/components/ui';
import { useState } from 'react';

export default function TextAreaTestPage() {
  const [basicValue, setBasicValue] = useState('');
  const [withHelperValue, setWithHelperValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [prefilledValue, setPrefilledValue] = useState('Mạo danh cơ quan nhà nước, lừa đảo có kịch bản, mọi người cẩn thận');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">TextArea Component Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic TextArea */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic TextArea (Default State)</h2>
            <TextArea
              data-testid="basic-textarea"
              value={basicValue}
              onChange={(e) => setBasicValue(e.target.value)}
              placeholder="Viết bình luận"
            />
            <p className="text-sm text-gray-600">
              State: Default → Focus (click to focus)
            </p>
          </div>

          {/* TextArea with Helper Text */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">With Helper Text</h2>
            <TextArea
              data-testid="helper-textarea"
              value={withHelperValue}
              onChange={(e) => setWithHelperValue(e.target.value)}
              placeholder="Viết bình luận"
              helperText="Nhập nội dung bình luận của bạn"
            />
            <p className="text-sm text-gray-600">
              Helper text displayed below
            </p>
          </div>

          {/* TextArea with Error */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Error State</h2>
            <TextArea
              data-testid="error-textarea"
              value={errorValue}
              onChange={(e) => setErrorValue(e.target.value)}
              placeholder="Viết bình luận"
              error="Nội dung không được để trống"
            />
            <p className="text-sm text-gray-600">
              Red border and pink background in error state
            </p>
          </div>

          {/* Disabled TextArea */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Disabled State</h2>
            <TextArea
              data-testid="disabled-textarea"
              value="Disabled content"
              placeholder="Viết bình luận"
              disabled
            />
            <p className="text-sm text-gray-600">
              Gray background, reduced opacity, no interaction
            </p>
          </div>

          {/* Prefilled TextArea (Active/Filled State) */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Prefilled Content (Active State)</h2>
            <TextArea
              data-testid="prefilled-textarea"
              value={prefilledValue}
              onChange={(e) => setPrefilledValue(e.target.value)}
              placeholder="Viết bình luận"
            />
            <p className="text-sm text-gray-600">
              Shows filled state with content
            </p>
          </div>

          {/* Character Limit Test */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Character Limit (50 chars)</h2>
            <TextArea
              data-testid="char-limit-textarea"
              value=""
              onChange={() => {}}
              placeholder="Viết bình luận"
              maxLength={50}
              helperText="Test typing to see character counter"
            />
            <p className="text-sm text-gray-600">
              Max 50 characters, counter updates in real-time
            </p>
          </div>
        </div>

        {/* Test Controls */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              data-testid="clear-all-btn"
              onClick={() => {
                setBasicValue('');
                setWithHelperValue('');
                setErrorValue('');
                setPrefilledValue('');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All
            </button>
            
            <button
              data-testid="fill-basic-btn"
              onClick={() => setBasicValue('Test content for basic textarea')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Fill Basic
            </button>
            
            <button
              data-testid="fill-helper-btn"
              onClick={() => setWithHelperValue('Test content with helper text')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Fill Helper
            </button>
            
            <button
              data-testid="fill-error-btn"
              onClick={() => setErrorValue('Error test content')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Fill Error
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}