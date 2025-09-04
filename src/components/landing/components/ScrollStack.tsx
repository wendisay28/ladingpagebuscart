// src/components/landing/components/ScrollStack.tsx
import React, { useEffect, useRef, ReactNode } from "react";

interface ScrollStackProps {
  children: ReactNode;
  onStackComplete?: () => void;
  className?: string;
}

export function ScrollStack({ 
  children, 
  onStackComplete,
  className = ""
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      if (scrollTop + containerHeight >= container.scrollHeight - 100) {
        onStackComplete?.();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [onStackComplete]);

  return (
    <div 
      ref={containerRef} 
      className={`scroll-stack-scroller ${className}`}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
      <style jsx global>{`
        .scroll-stack-scroller {
          position: relative;
          width: 100%;
          height: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        
        .scroll-stack-inner {
          position: relative;
          min-height: 100%;
          padding: 2rem 1rem;
        }
        
        .scroll-stack-card-wrapper {
          margin-bottom: 2rem;
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }
        
        .scroll-stack-card {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease-out;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .scroll-stack-end {
          height: 1px;
          pointer-events: none;
        }
        
        /* Hide scrollbar */
        .scroll-stack-scroller::-webkit-scrollbar {
          display: none;
        }
        .scroll-stack-scroller {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
}

export function ScrollStackItem({ 
  children, 
  className = "" 
}: ScrollStackItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.style.transform = "translateY(0) scale(1)";
            card.style.opacity = "1";
            card.style.position = "sticky";
            card.style.top = "100px";
            card.style.zIndex = "10";
          } else {
            card.style.transform = "translateY(50px) scale(0.95)";
            card.style.opacity = "0.5";
            card.style.position = "relative";
            card.style.top = "auto";
            card.style.zIndex = "1";
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`scroll-stack-card-wrapper ${className}`}>
      <div ref={cardRef} className="scroll-stack-card">
        {children}
      </div>
    </div>
  );
}
