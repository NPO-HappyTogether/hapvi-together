import Image from "next/image";

type StockPhotoProps = {
  src: string;
  alt: string;
  /** 최외곽 래퍼 (relative 권장, 높이는 부모 또는 여기서 지정) */
  className?: string;
  /** 이미지 object-fit 등 */
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** priority가 아닐 때 기본 lazy (히어로 등은 priority로 eager) */
  loading?: "lazy" | "eager";
  /** 어두운 톤 오버레이 등 */
  overlayClassName?: string;
};

export function StockPhoto({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  loading,
  overlayClassName,
}: StockPhotoProps) {
  /* absolute가 넘어오면 relative와 충돌하지 않게 분기 — 히어로 풀블리드 배경이 깨지지 않게 함 */
  const useAbsolute = /\babsolute\b/.test(className);
  const rootPosition = useAbsolute ? "" : "relative ";

  return (
    <div className={`${rootPosition}overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${imageClassName}`}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? undefined : (loading ?? "lazy")}
      />
      {overlayClassName ? (
        <div className={`pointer-events-none absolute inset-0 z-[1] ${overlayClassName}`} aria-hidden />
      ) : null}
    </div>
  );
}
