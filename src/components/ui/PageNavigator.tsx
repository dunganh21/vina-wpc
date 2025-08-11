import { ButtonIcon } from './ButtonIcon';
import { cn } from '@/lib/utils';

type PageNavigatorVariant = 'white' | 'gray';

interface PageNavigatorProps {
  onPrevious?: () => void;
  onNext?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  variant?: PageNavigatorVariant;
  className?: string;
}

export default function PageNavigator({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  variant = 'white',
  className,
}: PageNavigatorProps) {
  const getButtonStyles = () => {
    if (variant === 'gray') {
      return 'bg-[#E6E6E6] border border-[#E6E6E6] hover:bg-[#D6D6D6] hover:border-[#D6D6D6] text-[#424C43] !p-2 min-h-12 h-12 w-12';
    }
    return '!p-3 min-h-12 h-12 w-12'; // Default white variant
  };

  const getButtonVariant = () => {
    return variant === 'gray' ? 'button-icon' : 'button-outline';
  };

  const getButtonTheme = () => {
    return variant === 'gray' ? 'light' : 'white';
  };

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      <ButtonIcon
        variant={getButtonVariant()}
        theme={getButtonTheme()}
        icon='arrow-left.svg'
        onClick={onPrevious}
        disabled={disablePrevious}
        className={getButtonStyles()}
      />
      <ButtonIcon
        variant={getButtonVariant()}
        theme={getButtonTheme()}
        icon='arrow-right.svg'
        onClick={onNext}
        disabled={disableNext}
        className={getButtonStyles()}
      />
    </div>
  );
}
