import Image from "next/image";

export function EditorialImage({
  src,
  alt,
  className = "",
  label = "Photography placeholder — replace in /public/images",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-ink ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover grayscale-[35%] sepia-[10%] transition duration-1000 group-hover:scale-[1.025] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
      <figcaption className="absolute bottom-0 left-0 m-4 border border-white/20 bg-charcoal/55 px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm sm:m-5">
        {label}
      </figcaption>
    </figure>
  );
}
