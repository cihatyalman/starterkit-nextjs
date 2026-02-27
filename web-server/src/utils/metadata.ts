import { Metadata } from "next";
import {
  Icon,
  Icons,
  IconURL,
  TemplateString,
} from "next/dist/lib/metadata/types/metadata-types";

/* #region Sabitler */
const siteName = "StarterKit";
const ogimage = process.env.NEXT_PUBLIC_BASE_URL + "/public/og-image.webp";
const twitterSite = "@starterkit";
/* #endregion */

/* #region Props */
interface RootMetadataProps {
  icons?: IconURL | Icon[] | Icons | null;
  keywords?: string | string[] | null;
}

interface MainMetadataProps extends Omit<MetadataProps, "title"> {
  mainTitle: string;
  absolute?: string;
}

interface MetadataProps {
  title: string | TemplateString; // 20-30 karakter
  ogtitle: string; // 50-60 karakter
  description: string; // 110-160 karakter
  link: string;
  siteName?: string;
  ogimage?: string; // 1200x630 px
  twitterSite?: string;
}
/* #endregion */

/* #region Functions */
function getSub(props: MetadataProps) {
  return {
    title: props.title,
    description: props.description,

    alternates: {
      canonical: props.link,
    },

    openGraph: {
      title: props.ogtitle,
      siteName: props.siteName || siteName,
      description: props.description,
      url: props.link,
      type: "website",
      images: [{ url: props.ogimage || ogimage }],
    },

    twitter: {
      title: props.ogtitle,
      description: props.description,
      images: [props.ogimage || ogimage],
      site: props.twitterSite || twitterSite,
    },
  } as Metadata;
}

function getRoot(props: RootMetadataProps) {
  return {
    icons: props.icons,
    keywords: props.keywords,
  } as Metadata;
}

function getMain(props: MainMetadataProps) {
  return getSub({
    ...props,
    title: {
      absolute: props.absolute,
      template: `%s | ${props.mainTitle}`,
      default: props.mainTitle,
    },
  });
}

function getNot() {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  } as Metadata;
}
/* #endregion */

export const getMetadata = {
  root: getRoot,
  main: getMain,
  sub: getSub,
  not: getNot,
};
