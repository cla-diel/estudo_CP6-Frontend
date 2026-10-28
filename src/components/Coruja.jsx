import Celebracao from "./Celebracao.jsx";

// Coruja-das-torres desenhada em SVG.
// Props: expressao = 'normal' | 'feliz' | 'triste' | 'surpresa'
//        cenaId    = muda a cada cena para reiniciar a "inclinadinha" de cabeça
//        gesto     = gesto ocioso: 'olhar' | 'penas' | 'pulinho' | 'bocejo' | 'contente' | 'coracao' | null
//        festa     = 0 (nada), 1 (festa) ou 2 (festa grande) quando a pessoa volta
export default function Coruja({
  expressao = "normal",
  cenaId,
  gesto = null,
  festa = 0,
}) {
  const feliz = expressao === "feliz" || festa > 0 || gesto === "contente";
  const surpresa = expressao === "surpresa";
  const raioOlho = surpresa ? 18 : 15;

  return (
    <div
      className={`coruja-wrap relative ${feliz ? "coruja-feliz" : ""} ${
        festa > 0 ? "gesto-festa" : gesto ? `gesto-${gesto}` : ""
      }`}
      role="img"
      aria-label={`Owlbert, coruja-das-torres, com expressão ${expressao}`}
    >
      <svg
        viewBox="0 0 300 360"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter id="grain-corpo" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".72"
              numOctaves="2"
              seed="12"
              result="grao"
            />
            <feColorMatrix
              in="grao"
              type="saturate"
              values="0"
              result="grao-cinza"
            />
            <feComponentTransfer in="grao-cinza" result="grao-suave">
              <feFuncA type="table" tableValues="0 .12" />
            </feComponentTransfer>
            <feComposite
              in="grao-suave"
              in2="SourceAlpha"
              operator="in"
              result="grao-mascarado"
            />
            <feBlend
              in="SourceGraphic"
              in2="grao-mascarado"
              mode="soft-light"
            />
          </filter>
          <pattern
            id="texturaPenas"
            width="18"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M3 2q6 5 0 11m9-9q6 5 0 11"
              fill="none"
              stroke="#8f603b"
              strokeWidth="1.5"
              opacity=".42"
            />
          </pattern>
        </defs>

        {/* sombra no peitoril */}
        <ellipse cx="150" cy="338" rx="70" ry="7" fill="#000" opacity="0.28" />

        <g className="coruja-corpo" filter="url(#grain-corpo)">
          {/* asa esquerda */}
          <g className="asa-esq">
            <path
              d="M78 205 C 52 235, 54 300, 92 322 C 108 290, 106 240, 100 210 Z"
              fill="#c18a50"
              stroke="#98683e"
              strokeWidth="3"
            />
            <path
              d="M78 223q24 30 17 89m-24-45q11 6 20 1m-15 22q10 6 19 1m-13 20q9 5 17 0"
              stroke="#f1ca8a"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity=".7"
            />
          </g>
          {/* asa direita */}
          <g className="asa-dir">
            <path
              d="M222 205 C 248 235, 246 300, 208 322 C 192 290, 194 240, 200 210 Z"
              fill="#c18a50"
              stroke="#98683e"
              strokeWidth="3"
            />
            <path
              d="M222 223q-24 30-17 89m24-45q-11 6-20 1m15 22q-10 6-19 1m13 20q-9 5-17 0"
              stroke="#f1ca8a"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity=".7"
            />
          </g>

          {/* corpo */}
          <ellipse
            cx="150"
            cy="255"
            rx="82"
            ry="82"
            fill="#c18a50"
            stroke="#98683e"
            strokeWidth="3"
          />
          <ellipse
            cx="150"
            cy="255"
            rx="79"
            ry="79"
            fill="url(#texturaPenas)"
            opacity=".55"
          />
          <ellipse cx="150" cy="268" rx="58" ry="68" fill="#f6e8cd" />
          {/* pintas e pequenas marcas das penas do peito */}
          <g fill="none" stroke="#c28c54" opacity=".56" strokeLinecap="round">
            <path
              d="M122 238q7 8 14 0m17 3q7 8 14 0m-53 20q7 8 14 0m20 3q7 8 14 0m17-5q7 8 14 0m-49 23q7 8 14 0m19 5q7 8 14 0m-47 19q7 8 14 0"
              strokeWidth="2.5"
            />
          </g>
        </g>

        {/* patinhas firmes no peitoril, fora da respiração do corpo */}
        <g fill="#e9a35b" stroke="#c98f4c" strokeWidth="1.5">
          <ellipse cx="128" cy="334" rx="16" ry="7" />
          <ellipse cx="172" cy="334" rx="16" ry="7" />
        </g>

        {/* cabeça: key reinicia a animação a cada cena */}
        <g key={cenaId} className="coruja-cabeca" filter="url(#grain-corpo)">
          {/* contorno arredondado da cabeça, sem penachos laterais */}
          <ellipse
            cx="150"
            cy="170"
            rx="88"
            ry="78"
            fill="#c18a50"
            stroke="#98683e"
            strokeWidth="3"
          />
          {/* rosto em formato de coração */}
          <path
            d="M150 152 C 108 98, 58 122, 62 170 C 66 212, 112 242, 150 246 C 188 242, 234 212, 238 170 C 242 122, 192 98, 150 152 Z"
            fill="#fff6e6"
            stroke="#ecc98d"
            strokeWidth="4"
          />

          {/* bochechas */}
          <ellipse
            cx="96"
            cy="208"
            rx="14"
            ry="9"
            fill="#ff9aa2"
            opacity="0.5"
          />
          <ellipse
            cx="204"
            cy="208"
            rx="14"
            ry="9"
            fill="#ff9aa2"
            opacity="0.5"
          />

          {/* olhos */}
          {feliz ? (
            <g
              stroke="#2b2140"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            >
              <path d="M100 188 Q118 166 136 188" />
              <path d="M164 188 Q182 166 200 188" />
            </g>
          ) : (
            <g>
              <g className="coruja-olho">
                <circle cx="118" cy="184" r={raioOlho} fill="#2b2140" />
                <circle cx="123" cy="178" r="5.5" fill="#fff" />
                <circle cx="113" cy="191" r="2.5" fill="#fff" opacity="0.8" />
              </g>
              <g className="coruja-olho">
                <circle cx="182" cy="184" r={raioOlho} fill="#2b2140" />
                <circle cx="187" cy="178" r="5.5" fill="#fff" />
                <circle cx="177" cy="191" r="2.5" fill="#fff" opacity="0.8" />
              </g>
            </g>
          )}

          {/* bico */}
          <path
            d="M141 196 Q150 187 159 196 Q150 226 141 196 Z"
            fill="#e9a35b"
            stroke="#c98f4c"
            strokeWidth="2"
          />
          {/* bico aberto (aparece no bocejo) */}
          <ellipse
            className="bico-aberto"
            cx="150"
            cy="212"
            rx="7"
            ry="9"
            fill="#8a4b2a"
          />
          {surpresa && (
            <ellipse
              cx="150"
              cy="222"
              rx="5"
              ry="4"
              fill="#c98f4c"
              opacity="0.6"
            />
          )}
        </g>
      </svg>

      {(festa > 0 || gesto === "coracao") && (
        <Celebracao
          tipo={festa > 0 ? "festa" : "coracao"}
          intensidade={festa || 1}
        />
      )}
    </div>
  );
}
