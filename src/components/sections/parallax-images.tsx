import Image from 'next/image';
import { FadeIn } from '@/components/editorial';

interface ParallaxImagesProps {
  laptopImage: string;
  phoneImage: string;
}

/**
 * Antes: parallax agresivo con sticky + transforms ligados al scroll.
 * Ahora: composición estática de dos dispositivos con la única entrada
 * permitida (fade + rise). Mantiene la misma interfaz de props.
 */
const ParallaxImages = ({ laptopImage, phoneImage }: ParallaxImagesProps) => {
  return (
    <div className="relative mx-auto w-full max-w-[1100px]">
      <FadeIn>
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={laptopImage}
            alt="Sitio web en laptop"
            fill
            className="object-contain saturate-[0.85]"
            sizes="(max-width: 768px) 100vw, 1100px"
          />
        </div>
      </FadeIn>
      <FadeIn delay={0.15} className="absolute bottom-0 left-0 w-[26%]">
        <div className="relative aspect-[9/19] w-full">
          <Image
            src={phoneImage}
            alt="Sitio web en móvil"
            fill
            className="object-contain saturate-[0.85]"
            sizes="(max-width: 768px) 30vw, 290px"
          />
        </div>
      </FadeIn>
    </div>
  );
};

export default ParallaxImages;
