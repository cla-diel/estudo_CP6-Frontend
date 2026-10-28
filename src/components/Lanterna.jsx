// Lanterna de madeira e vidro presa à parede interna da torre.
export default function Lanterna() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="lanterna-prendida absolute left-[17%] top-[-7%] w-21.5 -translate-x-1/2">
        <div className="lanterna-corrente absolute left-1/2 top-0 w-1 -translate-x-1/2" />
        <svg
          viewBox="0 0 90 140"
          className="lanterna-svg absolute bottom-0 left-1/2 h-31.5 w-21.5 -translate-x-1/2 overflow-visible"
        >
          <defs>
            <radialGradient id="luz-fogo-lanterna">
              <stop offset="0" stopColor="#ffe59a" stopOpacity=".78" />
              <stop offset=".48" stopColor="#ffba52" stopOpacity=".38" />
              <stop offset="1" stopColor="#ff9d39" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M30 13V8a15 15 0 0 1 30 0v5"
            fill="none"
            stroke="#573a2d"
            strokeWidth="5"
          />
          <path
            d="M25 14h40l-5 10H30z"
            fill="#76513a"
            stroke="#3b2b26"
            strokeWidth="3"
          />
          <path
            d="M29 25h32l8 13v59l-9 13H30l-9-13V38z"
            fill="#523b32"
            stroke="#342722"
            strokeWidth="4"
          />
          <path
            d="M34 31h22l6 10v50l-6 10H34l-6-10V41z"
            fill="#f3bf59"
            fillOpacity=".42"
            stroke="#c58b45"
            strokeWidth="2"
          />
          <ellipse
            cx="48"
            cy="72"
            rx="26"
            ry="31"
            fill="url(#luz-fogo-lanterna)"
            className="lanterna-fogo-glow"
          />
          <path
            d="M45 77c-12-10 2-17 1-28 13 12 13 20 8 28 7-5 8-11 8-11 8 21-1 32-16 32-13 0-19-10-12-22 1 6 5 9 11 11z"
            fill="#ffe59a"
            className="lanterna-chama"
          />
          <path
            d="M31 31v62m28-62v62M22 39h8m32 0h8M22 91h8m32 0h8"
            stroke="#8a6142"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M24 111h42l-4 9H28z"
            fill="#76513a"
            stroke="#3b2b26"
            strokeWidth="3"
          />
          <path
            d="M34 121h22l-5 8H39z"
            fill="#523b32"
            stroke="#342722"
            strokeWidth="3"
          />
          <path
            d="M27 18h36"
            stroke="#bd8a58"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
