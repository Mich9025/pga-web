import { Container, Section } from "@/components/craft";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SectionHeaderProps {
  title: string;
  description?: string;
  descriptionHtml?: string;
  image?: string;
  className?: string;
}

export const SectionHeader = ({
  title,
  description,
  descriptionHtml,
  image,
  className,
}: SectionHeaderProps) => {
  const classes = cn(
    "bg-primary text-primary-foreground min-h-[50vh] pt-8 md:pt-24 max-h-[80vh] flex items-center overflow-hidden relative",
    className
  );
  return (
    <Section id="hero-section" className={classes}>
      {image && (
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          layout="fill"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover grayscale blend-overlay opacity-20"
        />
      )}
      <Container className="py-24 relative z-10 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 font-bold">
            {title}
          </h1>
          {description && (
            <p className="mb-12 text-xl md:text-2xl line-clamp-3">
              {description}
            </p>
          )}
          {descriptionHtml && (
            <div
              className="mb-12 text-xl md:text-2xl line-clamp-3"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};
