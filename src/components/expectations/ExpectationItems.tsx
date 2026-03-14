import { useTranslation } from "react-i18next";
import { ITEM_IMAGES } from "./constants";

export interface ExpectationItem {
  number: string;
  tag: string;
  title: string;
  desc: string;
  img: string;
}

export function useExpectationsItems(): ExpectationItem[] {
  const { t } = useTranslation();

  const rawItems = t("expectations.items", {
    returnObjects: true,
  }) as Array<{ tag: string; title: string; desc: string }>;

  return rawItems.map((item, i) => ({
    ...item,
    number: String(i + 1).padStart(2, "0"),
    img: ITEM_IMAGES[i],
  }));
}
