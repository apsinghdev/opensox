import Image from "next/image";
import { Card } from "./card";
import { cn } from "@/lib/utils";

type SponsorCardProps = {
  name: string;
  description: string;
  href: string;
  logoSrc: string;
  logoAlt?: string;
  className?: string;
  openInNewTab?: boolean;
};

const SponsorCard = ({
  name,
  description,
  href,
  logoSrc,
  logoAlt,
  className,
  openInNewTab = true,
}: SponsorCardProps) => {

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      aria-label={`Visit ${name}`}
      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden border-border-primary bg-[#111111] text-sm text-muted-foreground/90 [box-shadow:0_0_60px_-24px_#14111C_inset]",
          "transition-colors hover:border-[#3a3a3a]",
          className
        )}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
          <Image
            src={logoSrc}
            alt={logoAlt ?? `${name} logo`}
            fill
            className="object-contain"
          />
        </div>

        <div className="border-t border-border-primary bg-background px-6 py-4">
          <p className="text-base font-medium text-foreground">{name}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </Card>
    </a>
  );
}

export default SponsorCard;