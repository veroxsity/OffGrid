interface OffGridLogoProps {
  className?: string;
}

export function OffGridLogo({ className = "w-8 h-8" }: OffGridLogoProps) {
  return (
    <div className={`bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg ${className}`}>
      <span className="text-white font-bold text-lg">⚡</span>
    </div>
  );
}
