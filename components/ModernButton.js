import { useState } from 'react';

export function ModernButton({ href, children, variant = 'primary', className = '', onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  const createRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now();

    setRipples([...ripples, { x, y, id: rippleId }]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((r) => r.id !== rippleId));
    }, 600);
  };

  const baseStyles = "relative overflow-hidden px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-gradient-to-r from-lime-500 to-teal-600 text-white hover:from-lime-600 hover:to-teal-700 shadow-lg hover:shadow-xl",
    secondary: "glass-effect border-2 border-teal-500/30 text-gray-700 dark:text-gray-300 hover:border-teal-500/50 hover:bg-teal-500/10",
    glow: "bg-gradient-to-r from-lime-500 to-teal-600 text-white hover:from-lime-600 hover:to-teal-700 shadow-lg hover:shadow-xl glow-effect hover-glow"
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={(e) => {
        createRipple(e);
        if (onClick) onClick(e);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}

      {/* Hover glow effect */}
      {variant === 'glow' && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-teal-400/20 blur-xl" />
      )}
    </Component>
  );
}

export function FloatingActionButton({ onClick, icon, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-lime-500 to-teal-600 rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-110 ${className}`}
    >
      <span className="flex items-center justify-center text-white">
        {icon || (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </span>
      
      {isHovered && (
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
      )}
    </button>
  );
}

export function IconButton({ onClick, icon, tooltip, className = '' }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-3 rounded-lg glass-effect hover:bg-teal-500/10 transition-all duration-300 transform hover:scale-105 ${className}`}
      >
        {icon}
      </button>
      
      {showTooltip && tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}