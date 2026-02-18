import './App.css'
import { useLenis } from './hooks/useLenis'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

const TYPING_TEXT = "EPON MI TI LE EPON MI TI LE EPON MI TI LE EPON MI TI LE EPON MI TI LE "

function App() {
  const heroRef = useRef<HTMLHeadingElement>(null)
  const eponRef = useRef<HTMLHeadingElement>(null)
  const oboRef = useRef<HTMLHeadingElement>(null)
  const taintref = useRef<HTMLHeadingElement>(null)
  const allRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
  const pathRef = useRef<SVGPathElement>(null)
  const drawRef = useRef<HTMLDivElement>(null)

  const words = TYPING_TEXT.split(" ")


  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current
      const length = path?.getTotalLength()

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      })

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: drawRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      })
    }, drawRef)

    return () => ctx.revert()
  }, [])

  useLenis()

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(heroRef.current, {
        scale: 0.1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true
        }
      })


      gsap.to(eponRef.current, {
        x: "-200vw",
        ease: "none",
        scrollTrigger: {
          trigger: eponRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${eponRef.current?.offsetWidth}`,
        }
      })

      const wordElements = wordsRef.current.filter(Boolean)
      if (wordElements.length > 0) {
        gsap.set(wordElements, { opacity: 0.15 })
        gsap.to(wordElements, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          }
        })
      }
    }, allRef)

    // Word-by-word opacity typing animation on scroll



    return () => context.revert()
  }, [])



  return (
    <div ref={allRef}>
      <div className='bg-black w-full min-h-[100vh]'>
        <h1 ref={heroRef} className='text-5xl font-bold text-white bg-red-500 w-full min-h-[100vh] flex items-center justify-center '>FUCK ME 🍆</h1>
      </div>


      <div className='flex flex-row w-[300vw] min-h-[100vh] ' ref={eponRef}>
        <h1 className='text-5xl font-bold text-white bg-blue-500 w-full min-h-[100vh] flex items-center justify-center '>Suck my Epon</h1>
        <h1 className='text-5xl font-bold text-white bg-blue-500 w-full min-h-[100vh] flex items-center justify-center '>Suck my Epon</h1>
        <h1 className='text-5xl font-bold text-white bg-blue-500 w-full min-h-[100vh] flex items-center justify-center '>Suck my Epon</h1>
      </div>

      <section ref={sectionRef} className='w-full min-h-[100vh] bg-red-500 flex items-center justify-center'>
        <h1 ref={textRef} className="text-5xl text-white font-bold max-w-lg flex flex-wrap gap-x-3 leading-snug">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el }}
              className="inline-block transition-none"
              style={{ opacity: 0.15 }}
            >
              {word}
            </span>
          ))}
        </h1>
      </section>
      <section ref={drawRef} className='w-full min-h-[100vh] bg-red-500 flex items-center justify-center'>
        <svg viewBox="0 0 500 200">
          <path
            ref={pathRef}
            d="M10 100 Q 150 10 300 100 T 500 100"
            stroke="white"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </section>
      <h1 ref={oboRef} className='text-5xl font-bold text-white bg-green-500 w-full min-h-[100vh] flex items-center justify-center '>OBO TUTU</h1>
      <h1 ref={taintref} className='text-5xl font-bold text-white bg-yellow-500 w-full min-h-[100vh] flex items-center justify-center '>TAINTX</h1>

    </div>
  )
}

export default App




