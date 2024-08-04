// 'en-us' | 'zh-cn' | 'zh-tw' | 'ko-kr' | 'ja-jp' | 'ms-my' | 'th-th' | 'vi-vn' | 'es-es' | 'pt-pt'

// Define the translation keys as string literals
export type TranslationKey =
  | "Header.Graveyard"
  | "Header.Souldraw"
  | "Header.SouldrawNym"
  | "Hero.Welcome"
  | "Mint.Tooltip"
  | "Mint.Save"
  | "Mint.Banner"
  | "Mint.BannerNym"
  | "Header.Wallet"
  | "Graveyard.Loading"
  | "Graveyard.TopArt"
  | "Graveyard.ArtTillNow"
  | "Graveyard.CommunityArt";

// Define the translations interface for each locale
export interface Translations {
  "en-US": { [key in TranslationKey]: string };
  "fr-FR": { [key in TranslationKey]: string };
}

const translations: Translations = {
  "en-US": {
    "Header.Graveyard": "Gallery",
    "Header.Souldraw": "Paint",
    "Header.SouldrawNym": "Souldraw (nym)",
    "Header.Wallet": "Wallet",
    "Mint.Banner":
      "Paint on the canvas below, hit save to pay gas to inscribe your of drawing on-chain (Blast.io) ethernarly. Use the erase button to remove pixels. Make sure the Mint button is blue by funding your Blast ethereum account.",
    "Mint.BannerNym":
      "Use the NYM Mixnet to anonymously draw your message on the canvas below, it will be stored on the Ethereum blockchain ethernarly. Use the erase button bellow to erase pixel.",
    "Mint.Save": "Save (mint)",
    "Hero.Welcome": "Make Art, Free to Mint, Pay to steal, Farm Gold",
    "Graveyard.Loading": "Loading...",
    "Graveyard.TopArt": "Recent graff1t1s",
    "Graveyard.CommunityArt": "Gra7fit1 Wall",
    "Graveyard.ArtTillNow": "Gra77iti count",
  },
};
export default translations;
