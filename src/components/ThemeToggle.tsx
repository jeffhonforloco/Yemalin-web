
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      aria-label="Toggle theme"
      className={cn(
        "border rounded-full w-12 h-6 p-0 relative transition-colors",
        theme === 'dim' ? "bg-yemalin-grey-800 border-yemalin-grey-700" : "bg-yemalin-cream border-yemalin-sand",
        className
      )}
      pressed={theme === 'dim'}
      onPressedChange={toggleTheme}
    >
      <div 
        className={cn(
          "absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-200",
          theme === 'dim' 
            ? "bg-yemalin-grey-500 translate-x-6" 
            : "bg-yemalin-accent translate-x-0.5"
        )}
      />
      <span className="sr-only">
        {theme === 'dim' ? 'Switch to light mode' : 'Switch to dim mode'}
      </span>
      {theme === 'dim' ? (
        <Moon className="h-3 w-3 absolute right-1.5 top-1.5 text-white" />
      ) : (
        <Sun className="h-3 w-3 absolute left-1.5 top-1.5 text-white" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
