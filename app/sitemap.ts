import type { MetadataRoute } from "next";
import { CHARACTERS } from "@/data/characters";
import { ERAS } from "@/data/eras";
import { EVENTS } from "@/data/events";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/eras", "/events", "/characters", "/factions", "/family-tree", "/maps", "/korea", "/idioms", "/lessons", "/lines", "/strategies", "/gallery", "/films", "/quiz", "/sources",
    ...ERAS.map((e) => `/eras/${e.slug}`),
    ...EVENTS.map((e) => `/events/${e.slug}`),
    ...CHARACTERS.map((c) => `/characters/${c.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
