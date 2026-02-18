// import './App.css'
// import { useLenis } from './hooks/useLenis'
// import { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'


// gsap.registerPlugin(ScrollTrigger)

// const TYPING_TEXT = "EPON MI TI LE EPON MI TI LE EPON MI TI LE EPON MI TI LE EPON MI TI LE "

// function App() {
//   const heroRef = useRef<HTMLHeadingElement>(null)
//   const eponRef = useRef<HTMLHeadingElement>(null)
//   const oboRef = useRef<HTMLHeadingElement>(null)
//   const taintref = useRef<HTMLHeadingElement>(null)
//   const allRef = useRef<HTMLDivElement>(null)
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const textRef = useRef<HTMLHeadingElement>(null)
//   const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
//   const pathRef = useRef<SVGPathElement>(null)
//   const drawRef = useRef<HTMLDivElement>(null)

//   const words = TYPING_TEXT.split(" ")


//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const path = pathRef.current
//       const length = path?.getTotalLength()

//       gsap.set(path, {
//         strokeDasharray: length,
//         strokeDashoffset: length
//       })

//       gsap.to(path, {
//         strokeDashoffset: 0,
//         duration: 2,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: drawRef.current,
//           start: "top 80%",
//           toggleActions: "play none none none"
//         }
//       })
//     }, drawRef)

//     return () => ctx.revert()
//   }, [])

//   useLenis()

//   useEffect(() => {
//     const context = gsap.context(() => {
//       gsap.to(heroRef.current, {
//         scale: 0.1,
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: "top top",
//           end: "+=100%",
//           scrub: true,
//           pin: true
//         }
//       })


//       gsap.to(eponRef.current, {
//         x: "-200vw",
//         ease: "none",
//         scrollTrigger: {
//           trigger: eponRef.current,
//           pin: true,
//           scrub: 1,
//           start: "top top",
//           end: () => `+=${eponRef.current?.offsetWidth}`,
//         }
//       })

//       const wordElements = wordsRef.current.filter(Boolean)
//       if (wordElements.length > 0) {
//         gsap.set(wordElements, { opacity: 0.15 })
//         gsap.to(wordElements, {
//           opacity: 1,
//           stagger: 0.1,
//           ease: "none",
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top 80%",
//             end: "top 20%",
//             scrub: true,
//           }
//         })
//       }
//     }, allRef)

//     // Word-by-word opacity typing animation on scroll



//     return () => context.revert()
//   }, [])



//   return (
//     <div ref={allRef}>
//       <div className='bg-black w-full min-h-[100vh]'>
//         <h1 ref={heroRef} className='text-5xl font-bold text-white bg-red-500 w-full min-h-[100vh] flex items-center justify-center '>FUCK ME 🍆</h1>
//       </div>


//       <div className='flex flex-row w-[300vw] min-h-[100vh] ' ref={eponRef}>
//         <h1 className='text-5xl font-bold text-white bg-blue-500 w-full min-h-[100vh] flex items-center justify-center '>Suck my Epon</h1>
//         <h1 className='text-5xl font-bold text-white bg-blue-500 w-full min-h-[100vh] flex items-center justify-center '>Suck my Epon</h1>
//         <h1 className='text-5xl font-bold text-white bg-blue-500 w-full min-h-[100vh] flex items-center justify-center '>Suck my Epon</h1>
//       </div>

//       <section ref={sectionRef} className='w-full min-h-[100vh] bg-red-500 flex items-center justify-center'>
//         <h1 ref={textRef} className="text-5xl text-white font-bold max-w-lg flex flex-wrap gap-x-3 leading-snug">
//           {words.map((word, i) => (
//             <span
//               key={i}
//               ref={(el) => { wordsRef.current[i] = el }}
//               className="inline-block transition-none"
//               style={{ opacity: 0.15 }}
//             >
//               {word}
//             </span>
//           ))}
//         </h1>
//       </section>
//       <section ref={drawRef} className='w-full min-h-[100vh] bg-red-500 flex items-center justify-center'>
//         <svg viewBox="0 0 500 200">
//           <path
//             ref={pathRef}
//             d="M10 100 Q 150 10 300 100 T 500 100"
//             stroke="white"
//             strokeWidth="4"
//             fill="none"
//           />
//         </svg>
//       </section>
//       <h1 ref={oboRef} className='text-5xl font-bold text-white bg-green-500 w-full min-h-[100vh] flex items-center justify-center '>OBO TUTU</h1>
//       <h1 ref={taintref} className='text-5xl font-bold text-white bg-yellow-500 w-full min-h-[100vh] flex items-center justify-center '>TAINTX</h1>

//     </div>
//   )
// }

// export default App


import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const signatureRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".panel")

      // HORIZONTAL SCROLL
      const totalWidth = sections.length * window.innerWidth

      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + totalWidth
        }
      })

      // FLOATING IMAGES ANIMATION
      gsap.to(".floating", {
        x: 500,
        rotation: 360,
        scrollTrigger: {
          trigger: ".gallery",
          containerAnimation: scrollTween,
          start: "left center",
          scrub: 1
        }
      })

      // SIGNATURE ANIMATION
      const path = signatureRef.current
      if (path) {
        const length = path.getTotalLength()

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        })

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".signature-section",
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none none"
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="horizontal-wrapper">

      {/* HERO */}
      <section className="panel bg-black text-white flex items-center justify-center">
        <h1 className="text-7xl font-bold tracking-widest">
          BKG CINEMATIC
        </h1>
      </section>

      {/* GALLERY */}
      <section className="panel gallery bg-neutral-900 flex items-center justify-center gap-20">
        <img
          src="https://picsum.photos/400/500?random=1"
          className="floating w-[400px] rounded-2xl"
        />
        <img
          src="https://picsum.photos/400/500?random=2"
          className="floating w-[400px] rounded-2xl"
        />
        <img
          src="https://picsum.photos/400/500?random=3"
          className="floating w-[400px] rounded-2xl"
        />
      </section>

      {/* SIGNATURE */}
      <section className="panel signature-section bg-black flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 648" version="1.1">
          <path
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            d="M 495.500 132.616 C 488.288 136.956, 476.207 147.124, 466.075 157.382 L 458.650 164.900 455.120 161.801 C 435.489 144.564, 412.792 157.645, 400.938 193.027 C 399.279 197.977, 397.677 205.059, 397.377 208.764 C 396.592 218.465, 396.343 218.848, 393.404 214.906 C 382.644 200.476, 377.180 182.014, 376.122 156.511 C 375.604 144.024, 375.239 141.472, 373.934 141.223 C 372.226 140.897, 367.414 150.399, 359.991 168.759 C 357.710 174.401, 354.324 181.541, 352.466 184.626 C 349.076 190.256, 343 203.930, 343 205.930 C 343 208.662, 340.776 206.416, 337.373 200.250 C 332.275 191.010, 327.923 185, 326.330 185 C 324.303 185, 324.729 187.137, 327.599 191.361 C 329.029 193.465, 332.330 198.876, 334.935 203.387 L 339.670 211.587 339.203 227.794 L 338.736 244 334.505 244 C 327.482 244, 320.491 245.736, 308.640 250.424 C 294.689 255.941, 288.236 257.024, 285.740 254.265 C 282.829 251.049, 281.744 242.084, 282.882 230.667 C 285.282 206.590, 286.405 178.296, 285.129 174.037 C 282.839 166.392, 276.281 166.333, 270.198 173.903 C 261.082 185.247, 254.392 200.612, 251.016 217.961 L 249.370 226.422 244.448 217.211 C 239.929 208.754, 237 205.727, 237 209.515 C 237 210.349, 239.641 216.311, 242.869 222.765 L 248.738 234.500 249.286 247.500 C 249.864 261.208, 253.509 277.151, 258.172 286.373 C 269.072 307.929, 297.715 335, 309.622 335 C 312.837 335, 312.833 330.978, 309.614 326.683 C 308.302 324.932, 306.223 321.475, 304.994 319 C 303.765 316.525, 301.333 312.700, 299.591 310.500 C 293.770 303.150, 274.342 272.663, 266.453 258.500 C 262.165 250.800, 257.391 242.250, 255.846 239.500 C 252.454 233.463, 252.273 228.940, 254.947 217 C 258.081 203.006, 260.402 196.818, 266.229 186.918 C 271.929 177.233, 276.269 172, 278.601 172 C 282.450 172, 283.005 179.562, 281.058 205.500 C 279.107 231.499, 278.716 241.569, 279.433 247.306 C 281.089 260.564, 288.396 262.331, 308.706 254.386 C 321.209 249.495, 332.831 246.669, 336.576 247.608 C 338.453 248.079, 339.112 249.407, 340.444 255.394 L 342.050 262.613 339.012 269.314 C 332.779 283.060, 331.477 295.801, 335.094 307.645 C 336.245 311.415, 337.595 314.928, 338.094 315.450 C 338.592 315.972, 339 317.349, 339 318.509 C 339 320.942, 333.014 331.294, 329.433 335.055 C 328.095 336.460, 327 338.147, 327 338.805 C 327 343.088, 335.443 335.259, 339.230 327.463 C 340.423 325.008, 341.671 323, 342.003 323 C 342.336 323, 344.158 324.619, 346.054 326.598 C 347.949 328.577, 351.918 331.277, 354.874 332.598 C 364.803 337.035, 385.197 335.234, 401 328.525 C 419.631 320.616, 438.842 309.709, 449.538 300.969 L 456.940 294.920 461.720 301.056 C 480.361 324.985, 487.329 335.793, 498.596 358.250 C 505.840 372.691, 510.555 381, 511.504 381 C 514.291 381, 513.020 377.709, 501.884 356.085 C 491.098 335.141, 482.719 322.131, 466.108 300.533 L 459.980 292.566 463.240 290.066 C 479.900 277.287, 501 249.438, 501 240.229 C 501 235.209, 498.289 232.140, 492.323 230.406 C 486.247 228.639, 482.886 228.793, 466.169 231.603 C 461.037 232.466, 456.657 232.990, 456.436 232.769 C 456.215 232.548, 458.145 227.672, 460.726 221.933 L 465.418 211.500 465.581 197.229 L 465.745 182.959 472.837 177.978 C 496.336 161.476, 515.543 134.572, 507.066 130.035 C 503.909 128.346, 501.822 128.811, 495.500 132.616 M 496.500 136.172 C 490.776 139.759, 474.229 154.026, 465.766 162.669 L 460.032 168.526 461.707 173.763 C 463.600 179.682, 463.966 179.850, 468.346 176.812 C 485.799 164.707, 505 142.825, 505 135.040 C 505 132.136, 502.384 132.484, 496.500 136.172 M 367.724 159.925 C 365.098 166.209, 363.341 171.609, 363.821 171.925 C 365.723 173.180, 365.967 178.743, 364.995 198.692 C 364.438 210.137, 364.274 223.876, 364.632 229.225 L 365.282 238.950 369.891 235.122 C 372.426 233.016, 378.443 228.682, 383.262 225.489 L 392.023 219.684 390.312 217.092 C 378.653 199.427, 374.130 184.947, 373.104 162 L 372.500 148.500 367.724 159.925 M 430.239 159.335 C 417.193 164.066, 404.018 186.693, 400.448 210.499 L 399.755 215.116 406.128 211.512 C 409.632 209.529, 416.810 205.713, 422.077 203.031 C 430.702 198.640, 432.345 197.328, 438.614 189.828 C 449.112 177.267, 455 169.505, 455 168.228 C 455 166.582, 450.123 162.189, 445.790 159.932 C 441.645 157.774, 435.224 157.527, 430.239 159.335 M 448.912 183.109 C 443.760 189.471, 441.611 192.753, 443.113 191.965 C 444.426 191.276, 448.953 188.733, 453.174 186.313 L 460.849 181.912 459.330 177.456 C 458.495 175.005, 457.651 173, 457.455 173 C 457.259 173, 453.415 177.549, 448.912 183.109 M 359.246 181.141 C 356.313 185.943, 354.274 190.947, 349.977 203.892 L 346.195 215.284 350.077 221.625 C 352.212 225.113, 355.548 231.124, 357.492 234.983 C 359.435 238.843, 361.132 242, 361.263 242.001 C 361.393 242.001, 361.368 234.689, 361.207 225.751 C 361.046 216.813, 361.306 202.975, 361.785 195 C 362.772 178.590, 362.318 176.112, 359.246 181.141 M 447.424 193.599 L 434.348 200.972 422.424 215.115 C 406.833 233.607, 407.629 232.437, 408.956 234.917 C 412.022 240.647, 422.199 241.242, 441.759 236.835 L 451.017 234.749 453.116 230.125 C 461.428 211.812, 463.858 201.954, 462.578 191.750 C 462.181 188.588, 461.551 186.051, 461.178 186.113 C 460.805 186.175, 454.616 189.544, 447.424 193.599 M 413.208 211.765 L 400.915 218.500 401.546 221.980 C 401.893 223.893, 402.732 226.519, 403.411 227.814 C 404.628 230.138, 404.722 230.080, 410.616 223.334 C 419.364 213.323, 426.296 204.998, 425.871 205.015 C 425.667 205.023, 419.968 208.060, 413.208 211.765 M 344.725 221.667 C 343.354 223.968, 342.891 233.322, 344.013 236.031 C 345.326 239.200, 353.194 245, 356.181 245 C 357.768 245, 357.404 243.774, 353.522 236.044 C 347.763 224.577, 345.345 220.625, 344.725 221.667 M 384.409 229.164 C 372.196 237.615, 366 242.978, 366 245.098 C 366 246.694, 367.265 246.915, 378.001 247.191 L 390.002 247.500 395.480 241 C 398.493 237.425, 400.968 233.794, 400.979 232.932 C 401 231.340, 395.094 223, 393.945 223 C 393.600 223, 389.309 225.774, 384.409 229.164 M 470.770 234.553 C 455.867 236.873, 454.057 237.611, 447.500 244.035 C 440.826 250.573, 436.080 253, 429.964 253 L 425.864 253 428.170 256.250 C 429.439 258.038, 434.534 263.775, 439.493 269 C 444.451 274.225, 450.591 280.949, 453.137 283.942 L 457.766 289.383 460.633 287.540 C 466.755 283.603, 485.146 263.435, 491.433 253.764 C 495.179 248.003, 497.877 239.824, 496.807 237.475 C 494.792 233.054, 486.427 232.115, 470.770 234.553 M 399.199 242.307 L 394.897 247.500 400.699 248.141 C 403.889 248.494, 408.736 248.832, 411.469 248.891 L 416.437 249 410.500 243 C 407.234 239.700, 404.324 237.026, 404.031 237.057 C 403.739 237.089, 401.564 239.451, 399.199 242.307 M 438 241.543 C 434.975 242.298, 428.684 242.934, 424.019 242.958 L 415.538 243 418.791 246.250 C 421.719 249.176, 422.617 249.497, 427.811 249.469 C 433.885 249.435, 440.379 246.554, 444.406 242.104 C 446.660 239.614, 445.971 239.553, 438 241.543 M 252.483 248.500 C 253.363 258.791, 258.380 277.827, 262.215 285.425 C 269.869 300.590, 288.977 321.511, 301.049 327.945 C 304.201 329.625, 307.014 331, 307.301 331 C 308.111 331, 298.739 316.075, 284.621 294.883 C 277.537 284.251, 267.481 267.890, 262.274 258.526 C 257.066 249.162, 252.579 241.275, 252.303 241 C 252.026 240.725, 252.107 244.100, 252.483 248.500 M 342 243.002 C 342 244.101, 342.434 245, 342.965 245 C 343.496 245, 345.544 246.417, 347.517 248.149 C 350.186 250.493, 351.392 251.008, 352.235 250.165 C 352.857 249.543, 353.172 248.887, 352.933 248.708 C 344.586 242.443, 342 241.094, 342 243.002 M 343.037 249.500 C 343.023 250.050, 343.488 252.218, 344.071 254.318 C 344.948 257.474, 345.380 257.929, 346.566 256.945 C 347.355 256.291, 348 255.385, 348 254.933 C 348 253.724, 343.068 248.324, 343.037 249.500 M 355.672 252.603 C 354.031 254.125, 353.101 255.820, 353.433 256.685 C 353.745 257.498, 354 260.346, 354 263.014 C 354 268.543, 355.195 269.418, 361 268.141 C 364.469 267.378, 364.498 267.327, 364.258 262.435 C 363.994 257.044, 361.349 250, 359.588 250 C 358.978 250, 357.216 251.171, 355.672 252.603 M 367.022 252.250 C 367.034 253.488, 367.928 256.448, 369.008 258.828 L 370.972 263.156 374.236 260.873 C 376.031 259.617, 379.422 257.004, 381.771 255.065 C 386.979 250.769, 386.142 250.174, 374.750 250.070 C 367.353 250.003, 367.001 250.102, 367.022 252.250 M 387.500 254.956 C 385.300 257.234, 381.137 260.726, 378.250 262.716 C 375.363 264.705, 373 266.720, 373 267.195 C 373 267.669, 374.377 270.784, 376.059 274.117 C 381.071 284.046, 388.996 305.258, 388.998 308.750 C 389.004 318.071, 379.922 305.846, 371.888 285.720 C 368.767 277.899, 365.715 271.545, 365.106 271.600 C 364.498 271.655, 361.750 271.767, 359 271.850 L 354 272 354 278.301 C 354 286.350, 351.166 299.310, 346.981 310.399 L 343.699 319.094 347.099 322.636 C 353.105 328.892, 359.226 331.314, 369 331.302 C 385.193 331.282, 399.919 326.351, 425.584 312.355 C 437.507 305.853, 454 293.923, 454 291.800 C 454 290.496, 445.943 280.970, 435.553 269.988 C 431.124 265.306, 425.649 259.344, 423.386 256.738 L 419.273 252 411.283 252 C 406.889 252, 400.640 251.733, 397.397 251.406 C 391.506 250.813, 391.496 250.817, 387.500 254.956 M 348.465 261.112 C 348.037 262.460, 348.374 263.802, 349.397 264.826 C 350.868 266.296, 351 266.122, 351 262.714 C 351 258.667, 349.535 257.740, 348.465 261.112 M 340.843 274.250 C 337.784 281.893, 337.540 283.346, 337.521 294 C 337.504 303.493, 337.857 306.277, 339.543 309.949 L 341.587 314.399 344.265 306.949 C 347.662 297.504, 351 282.039, 351 275.749 C 351 271.717, 350.539 270.498, 348.250 268.484 C 346.738 267.152, 345.195 266.049, 344.823 266.032 C 344.450 266.014, 342.659 269.712, 340.843 274.250 M 373.040 278.085 C 372.984 278.903, 380.535 297.363, 381.855 299.635 C 383.746 302.888, 383.098 300.593, 379.679 291.922 C 376.514 283.894, 373.126 276.833, 373.040 278.085" fill-rule="evenodd" />
        </svg>
      </section>

    </div>
  )
}

export default App

