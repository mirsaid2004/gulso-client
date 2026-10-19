type Props = {
    images: string[];
    count: number;
    /** sm = compact (popover rows), md = normal (profile cards) */
    size?: 'sm' | 'md';
};

const DIM    = { sm: 44, md: 56 } as const;
const OFFSET = { sm: 7,  md: 9  } as const;

export function StackedImages({ images, count, size = 'md' }: Props) {
    const dim    = DIM[size];
    const offset = OFFSET[size];
    const shown  = images.slice(0, 3);

    if (shown.length <= 1) {
        return (
            <div
                className="relative shrink-0 rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-slate-100"
                style={{ width: dim, height: dim }}
            >
                <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url('${shown[0]}')` }}
                />
                {count > 1 && (
                    <div className="absolute top-0.5 right-0.5 bg-white/90 backdrop-blur-sm px-1 py-0.5 rounded-md text-[9px] font-black text-primary border border-primary/10 leading-none">
                        x{count}
                    </div>
                )}
            </div>
        );
    }

    // Reverse so the first image ends up on top (lowest left offset, highest z-index)
    const stacked = shown.slice().reverse();
    const containerW = dim + offset * (stacked.length - 1);

    return (
        <div className="relative shrink-0" style={{ width: containerW, height: dim }}>
            {stacked.map((img, idx) => (
                <div
                    key={idx}
                    className="absolute rounded-2xl border border-slate-200 shadow-sm bg-center bg-cover bg-slate-100"
                    style={{
                        width: dim,
                        height: dim,
                        backgroundImage: `url('${img}')`,
                        left: (stacked.length - 1 - idx) * offset,
                        zIndex: idx,
                        opacity: 1 - (stacked.length - 1 - idx) * 0.18,
                    }}
                />
            ))}
            {/* Count badge anchored to the top-right of the front image */}
            <div
                className="absolute z-20 bg-primary text-white px-1.5 py-0.5 rounded-lg text-[9px] font-black border-2 border-white shadow-lg shadow-primary/30 animate-bounce leading-none"
                style={{ top: -5, left: dim - 10 }}
            >
                {count}
            </div>
        </div>
    );
}
