import dsc001 from "@/assets/DSC-001.webp";
import dsc001_2 from "@/assets/DSC-001-2.webp";
import dsc001_3 from "@/assets/DSC-001-3.webp";
import dsc001_4 from "@/assets/DSC-001-4.webp";
import dsc002 from "@/assets/DSC-002.webp";
import dsc002_2 from "@/assets/DSC-002-2.jpeg";
import dsc002_3 from "@/assets/DSC-002-3.jpeg";
import dsc002_4 from "@/assets/DSC-002-4.webp";
import dsc002_5 from "@/assets/DSC-002-5.png";
import dsc003 from "@/assets/DSC-003.webp";
import dsc004 from "@/assets/DSC-004.webp";
import dsc005 from "@/assets/DSC-005.webp";
import dsc006 from "@/assets/DSC-006.jpg";
import dsc007 from "@/assets/DSC-007.jpg";
import dsc008 from "@/assets/DSC-008.webp";
import dsc009 from "@/assets/DSC-009.jpg";
import dsc009_2 from "@/assets/DSC-009-2.jpeg";
import dsc009_3 from "@/assets/DSC-009-3.jpeg";
import dsc009_4 from "@/assets/DSC-009-4.png";
import dsc010 from "@/assets/DSC-010.jpg";
import dsc010_2 from "@/assets/DSC-010-2.jpg";
import dsc010_3 from "@/assets/DSC-010-3.jpg";
import dsc010_4 from "@/assets/DSC-010-4.webp";
import dsc011 from "@/assets/DSC-011.webp";
import dsc011_3 from "@/assets/DSC-011-3.jpeg";
import dsc011_5 from "@/assets/DSC-011-5.jpeg";
import dsc011_6 from "@/assets/DSC-011-6.png";
import dsc012 from "@/assets/DSC-012.jpg";
import dsc013 from "@/assets/DSC-013.webp";
import dsc013_2 from "@/assets/DSC-013-2.webp";
import dsc014 from "@/assets/DSC-014.jpg";
import dsc015 from "@/assets/DSC-015.jpg";
import dsc016 from "@/assets/DSC-016.jpg";
import dsc017 from "@/assets/DSC-017.jpg";
import dsc018 from "@/assets/DSC-018.webp";
import dsc018_2 from "@/assets/DSC-018-2.jpeg";
import dsc018_3 from "@/assets/DSC-018-3.jpeg";
import dsc018_4 from "@/assets/DSC-018-4.jpeg";
import dsc018_5 from "@/assets/DSC-018-5.jpeg";
import dsc019 from "@/assets/DSC-019.jpg";
import dsc020 from "@/assets/DSC-020.jpg";
import dsc021 from "@/assets/DSC-021.webp";
import dsc022 from "@/assets/DSC-022.jpg";

export const productImageMap: Record<string, string> = {
  "DSC-001": dsc001,
  "DSC-001-2": dsc001_2,
  "DSC-001-3": dsc001_3,
  "DSC-001-4": dsc001_4,
  "DSC-002": dsc002,
  "DSC-002-2": dsc002_2,
  "DSC-002-3": dsc002_3,
  "DSC-002-4": dsc002_4,
  "DSC-002-5": dsc002_5,
  "DSC-003": dsc003,
  "DSC-004": dsc004,
  "DSC-005": dsc005,
  "DSC-006": dsc006,
  "DSC-007": dsc007,
  "DSC-008": dsc008,
  "DSC-009": dsc009,
  "DSC-009-2": dsc009_2,
  "DSC-009-3": dsc009_3,
  "DSC-009-4": dsc009_4,
  "DSC-010": dsc010,
  "DSC-010-2": dsc010_2,
  "DSC-010-3": dsc010_3,
  "DSC-010-4": dsc010_4,
  "DSC-011": dsc011,
  "DSC-011-3": dsc011_3,
  "DSC-011-5": dsc011_5,
  "DSC-011-6": dsc011_6,
  "DSC-012": dsc012,
  "DSC-013": dsc013,
  "DSC-013-2": dsc013_2,
  "DSC-014": dsc014,
  "DSC-015": dsc015,
  "DSC-016": dsc016,
  "DSC-017": dsc017,
  "DSC-018": dsc018,
  "DSC-018-2": dsc018_2,
  "DSC-018-3": dsc018_3,
  "DSC-018-4": dsc018_4,
  "DSC-018-5": dsc018_5,
  "DSC-019": dsc019,
  "DSC-020": dsc020,
  "DSC-021": dsc021,
  "DSC-022": dsc022,
};

export type MediaItem = {
  type: "image" | "video";
  src: string;
  key: string;
};

export const productGalleryMap: Record<string, MediaItem[]> = {
  "DSC-001": [
    { type: "image", src: dsc001, key: "DSC-001" },
    { type: "image", src: dsc001_2, key: "DSC-001-2" },
    { type: "image", src: dsc001_3, key: "DSC-001-3" },
    { type: "image", src: dsc001_4, key: "DSC-001-4" },
    { type: "video", src: "/videos/DSC-001.mp4", key: "DSC-001-video" },
  ],
  "DSC-002": [
    { type: "image", src: dsc002, key: "DSC-002" },
    { type: "image", src: dsc002_2, key: "DSC-002-2" },
    { type: "image", src: dsc002_3, key: "DSC-002-3" },
    { type: "image", src: dsc002_4, key: "DSC-002-4" },
    { type: "image", src: dsc002_5, key: "DSC-002-5" },
  ],
  "DSC-010": [
    { type: "image", src: dsc010, key: "DSC-010" },
    { type: "image", src: dsc010_2, key: "DSC-010-2" },
    { type: "image", src: dsc010_3, key: "DSC-010-3" },
    { type: "image", src: dsc010_4, key: "DSC-010-4" },
  ],
  "DSC-009": [
    { type: "image", src: dsc009, key: "DSC-009" },
    { type: "image", src: dsc009_2, key: "DSC-009-2" },
    { type: "image", src: dsc009_3, key: "DSC-009-3" },
    { type: "image", src: dsc009_4, key: "DSC-009-4" },
  ],
  "DSC-018": [
    { type: "image", src: dsc018, key: "DSC-018" },
    { type: "image", src: dsc018_2, key: "DSC-018-2" },
    { type: "image", src: dsc018_3, key: "DSC-018-3" },
    { type: "image", src: dsc018_4, key: "DSC-018-4" },
    { type: "image", src: dsc018_5, key: "DSC-018-5" },
  ],
  "DSC-011": [
    { type: "image", src: dsc011, key: "DSC-011" },
    { type: "image", src: dsc011_3, key: "DSC-011-3" },
    { type: "image", src: dsc011_5, key: "DSC-011-5" },
    { type: "image", src: dsc011_6, key: "DSC-011-6" },
  ],
  "DSC-013": [
    { type: "image", src: dsc013, key: "DSC-013" },
    { type: "image", src: dsc013_2, key: "DSC-013-2" },
    { type: "video", src: "/videos/DSC-013.mp4", key: "DSC-013-video" },
  ],
};
