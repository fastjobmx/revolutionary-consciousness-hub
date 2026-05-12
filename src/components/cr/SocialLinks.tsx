import { SOCIAL } from "@/lib/cr/queries";
import { FooterLink } from "./FooterColumn";

type Item = { label: string; href?: string };

export function SocialLinks() {
  const items: Item[] = [
    { label: "Grupo de WhatsApp", href: SOCIAL.whatsappGroup },
    { label: "YouTube", href: SOCIAL.youtube },
    { label: "Instagram", href: SOCIAL.instagram },
    { label: "TikTok", href: SOCIAL.tiktok },
    { label: "Facebook", href: SOCIAL.facebook },
  ].filter((i) => i.href && i.href !== "#");

  return (
    <>
      {items.map((i) => (
        <FooterLink key={i.label} href={i.href} external>
          {i.label}
        </FooterLink>
      ))}
    </>
  );
}
