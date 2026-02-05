const SanityBar = ({ sanity }) => {
  const getColor = () => {
    if (sanity > 70) return 'bg-green-500';
    if (sanity > 40) return 'bg-yellow-500';
    if (sanity > 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getGlowColor = () => {
    if (sanity > 70) return 'shadow-green-500/50';
    if (sanity > 40) return 'shadow-yellow-500/50';
    if (sanity > 20) return 'shadow-orange-500/50';
    return 'shadow-red-500/50';
  };

  const getTextColor = () => {
    if (sanity > 70) return 'text-green-400';
    if (sanity > 40) return 'text-yellow-400';
    if (sanity > 20) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="flex items-center gap-2">
      {/* Icon - Smaller for mobile */}
      <div className="relative">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${getTextColor()} drop-shadow-lg`}
        >
          <path 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
            fill="currentColor"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path 
            d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" 
            fill="currentColor" 
            opacity="0.5"
          />
        </svg>
        
        {sanity < 30 && (
          <div className="absolute inset-0 animate-ping">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              className="text-red-500 opacity-75"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        )}
      </div>

      {/* Bar Container - Compact */}
      <div className="w-24 sm:w-32">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-gray-300 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase">
            SANITY
          </span>
          <span className={`text-[10px] sm:text-xs font-bold ${getTextColor()}`}>
            {sanity}%
          </span>
        </div>
        
        {/* Progress Bar - Thinner */}
        <div className="relative w-full h-2 bg-gray-900 border border-gray-700 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent animate-pulse opacity-30" />
          
          <div 
            className={`
              relative h-full ${getColor()} 
              transition-all duration-500 ease-out
              shadow-lg ${getGlowColor()}
            `}
            style={{ width: `${sanity}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
          </div>
          
          <div className="absolute inset-0 border border-gray-800 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SanityBar;