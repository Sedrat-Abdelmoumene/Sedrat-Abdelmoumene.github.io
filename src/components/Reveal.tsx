import { useEffect, useRef, type ReactNode } from 'react'
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && entry.target.classList.add('visible'), { threshold: .12 }); const node = ref.current; if (node) observer.observe(node); return () => observer.disconnect() }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}
