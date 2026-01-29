import { Star, ShieldCheck } from 'lucide-react';

interface BadgeProps {
  type: 'featured' | 'verified';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ type, size = 'md' }: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (type === 'featured') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-yellow-100 text-yellow-800 rounded-full font-semibold`}>
        <Star className={`${iconSizes[size]} fill-yellow-800`} />
        Featured
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-green-100 text-green-800 rounded-full font-semibold`}>
      <ShieldCheck className={iconSizes[size]} />
      Verified
    </span>
  );
}
