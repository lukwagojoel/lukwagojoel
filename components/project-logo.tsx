import Image from "next/image";

type Props = {
  name: string;
  logo?: string;
  className?: string;
};

export function ProjectLogo({ name, logo, className = "h-14 w-14" }: Props) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl border border-black/[0.08] bg-white ${className}`}
    >
      {logo ? (
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          sizes="64px"
          quality={90}
          className="object-contain p-1.5"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black/[0.03] text-lg font-semibold text-black/30">
          {name[0]}
        </div>
      )}
    </div>
  );
}