"use client";

import { useLocale } from "@/lib/locale-context";

export function T({ k, fallback }: { k: string; fallback?: string }) {
  const { t } = useLocale();
  const text = t(k);
  return <>{text === k && fallback ? fallback : text}</>;
}
