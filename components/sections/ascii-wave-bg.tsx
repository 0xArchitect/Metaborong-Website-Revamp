'use client'

export function AsciiWaveBg() {
  return (
    <>
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="blue-dense-threshold">
            <feColorMatrix
              type="matrix"
              values="
                0 0 0 0 0.1607 
                0 0 0 0 0.4352 
                0 0 0 0 0.9411 
                33 33 33 0 -2
              "
            />
          </filter>
        </defs>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hands-ascii.png"
        alt="ASCII Hands"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        style={{ filter: 'url(#blue-dense-threshold)' }}
      />
    </>
  )
}
