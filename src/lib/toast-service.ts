'use client';

// Simple toast service that works without context dependencies
let toastId = 0;

export interface SimpleToast {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export function showToast(options: Omit<SimpleToast, 'id'>) {
  const toast: SimpleToast = {
    ...options,
    id: `toast-${++toastId}`,
    duration: options.duration || 3000,
  };

  // Create toast container if it doesn't exist
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast toast-bottom toast-end';
    container.style.zIndex = '9999';
    container.style.position = 'fixed';
    container.style.bottom = '1.5rem';
    container.style.right = '1.5rem';
    container.style.maxWidth = '320px';
    document.body.appendChild(container);
  }

  // Create toast element using DaisyUI classes
  const toastElement = document.createElement('div');
  toastElement.id = toast.id;
  
  const alertClass = toast.type === 'success' ? 'alert-success' : 
                    toast.type === 'error' ? 'alert-error' : 'alert-info';
  
  const icon = toast.type === 'success' 
    ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" style="color: #3c5f3e"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" stroke="currentColor" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    : toast.type === 'error'
    ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" style="color: #f57f41"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" stroke="currentColor" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" style="color: #2a332b"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" stroke="currentColor" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

  // Apply VINA WPC branding and design tokens
  const brandedAlertClass = toast.type === 'success' 
    ? 'bg-white border border-primary text-primary shadow-elevated' 
    : toast.type === 'error' 
    ? 'bg-white border border-secondary text-secondary shadow-elevated'
    : 'bg-white border border-neutral text-neutral shadow-elevated';
  
  toastElement.className = `alert ${brandedAlertClass} mb-3 font-primary rounded-none`;
  toastElement.style.maxWidth = '340px';
  toastElement.innerHTML = `
    ${icon}
    <div class="flex-1 min-w-0">
      <div class="h6 font-semibold leading-tight" style="color: #2a332b">${toast.title}</div>
      <div class="body-3 mt-1 leading-tight" style="color: #424c43">${toast.message}</div>
    </div>
  `;

  container.appendChild(toastElement);

  // Auto remove after duration
  setTimeout(() => {
    if (toastElement.parentNode) {
      toastElement.remove();
    }
  }, toast.duration);

  return toast.id;
}

export function showCartSuccess(productName: string) {
  return showToast({
    title: 'Đã thêm vào giỏ hàng',
    message: `${productName} đã được thêm vào giỏ hàng của bạn`,
    type: 'success',
    duration: 3000,
  });
}