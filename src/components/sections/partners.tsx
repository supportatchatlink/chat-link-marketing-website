import Image from "next/image";
import { partners } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Partner logo strip.
 *
 * The partners' real logos (in /public/partners) are colored raster marks with
 * transparent backgrounds — dropped straight onto the page they'd clash and,
 * being dark, would vanish in dark mode. So they're normalized to a single
 * monochrome tint that follows the theme: `brightness(0)` flattens each logo to
 * a solid silhouette (transparency preserved), and `invert` flips that to light
 * in dark mode. They brighten to full strength on hover.
 */
export function Partners() {
  return (
    <section className="border-border border-y py-16" aria-labelledby="partners-heading">
      <Container size="wide">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            id="partners-heading"
            className="text-fg-subtle text-xs font-semibold tracking-widest uppercase"
          >
            Our partners
          </h2>
          <p className="text-fg-muted max-w-xl text-sm leading-relaxed text-pretty">
            We interconnect directly with major operators and messaging partners so your traffic
            rides trusted routes.
          </p>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-9 sm:gap-x-16">
          {partners.map((partner, index) => (
            <Reveal key={partner.name} delay={(index % 4) * 0.05}>
              <li className="flex items-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  // All logos are transparent, so `brightness(0)` renders each as
                  // a flat silhouette; `invert` flips it to light in dark mode.
                  // Uniform tint + hover brighten = a clean, cohesive strip.
                  className="h-8 w-auto max-w-[135px] object-contain opacity-70 transition-opacity duration-200 [filter:brightness(0)] hover:opacity-100 sm:h-9 dark:opacity-65 dark:[filter:brightness(0)_invert(1)]"
                  sizes="150px"
                />
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
