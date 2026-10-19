import { Icon } from "@iconify/react";

/*NOTE: floating petal config*/
const iconsList = [
    "mdi:flower-outline",
    "mdi:prize",
    "boxicons:gift",
    "game-icons:wrapped-sweet",
];
const PETALS = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    icon: iconsList[i % iconsList.length],
    left: `${(i * 6.3 + 3) % 100}%`,
    size: 10 + (i % 5) * 4,
    delay: `${(i * 0.37) % 3}s`,
    duration: `${5 + (i % 4)}s`,
    rotate: i * 22,
}));

function BackgroundPetalsAnimation() {
    return (
        <>
            {/*NOTE: floating petals*/}
            <div
                aria-hidden
                className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            >
                {PETALS.map((p) => (
                    <div
                        key={p.id}
                        className="absolute bottom-[-40px] animate-float-petal"
                        style={{
                            left: p.left,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                        }}
                    >
                        <Icon
                            icon={p.icon}
                            style={{
                                width: p.size,
                                height: p.size,
                                transform: `rotate(${p.rotate}deg)`,
                                color: `oklch(0.6067 0.2266 7.24 / ${0.12 + (p.id % 4) * 0.06
                                    })`,
                            }}
                        />
                    </div>
                ))}
            </div>


            {/*NOTE: keyframe styles*/}
            <style>{`
        @keyframes float-petal {
          0%   { transform: translateY(0)   rotate(0deg)   scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-110vh) rotate(540deg) scale(0.6); opacity: 0; }
        }
        .animate-float-petal {
          animation: float-petal linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
        </>
    )
}

export default BackgroundPetalsAnimation