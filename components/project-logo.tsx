import Image from "next/image";

type Size = "card" | "detail";

type Props = {
  name: string;
  logo?: string;
  /** "card" = project list tile, "detail" = large logo on the detail page */
  size?: Size;
  className?: string;
};

const sizes: Record<
  Size,
  { box: string; sizesAttr: string; pad: string; letter: string; radius: string }
> = {
  // List card: 96px
  card: {
    box: "h-24 w-24",
    sizesAttr: "192px",
    pad: "p-2.5",
    letter: "text-3xl",
    radius: "rounded-2xl",
  },
  // Detail page: 112px on phones, 160px on tablets, 208px on desktop
  detail: {
    box: "h-28 w-28 sm:h-40 sm:w-40 lg:h-52 lg:w-52",
    sizesAttr: "(min-width: 1024px) 416px, (min-width: 640px) 320px, 224px",
    pad: "p-3 sm:p-4 lg:p-5",
    letter: "text-5xl lg:text-6xl",
    radius: "rounded-3xl",
  },
};

export function ProjectLogo({ name, logo, size = "card", className = "" }: Props) {
  const s = sizes[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-black/[0.08] bg-white ${s.radius} ${s.box} ${className}`}
    >
      {logo ? (
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          priority={size === "detail"}
          sizes={s.sizesAttr}
          quality={100}
          className={`object-contain ${s.pad}`}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-black/[0.03] font-semibold text-black/30 ${s.letter}`}
        >
          {name[0]}
        </div>
      )}
    </div>
  );
}