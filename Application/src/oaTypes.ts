import { ColorContrastRatioCalculatorInput } from "@mdhnpm/color-contrast-ratio-calculator/dist/colorContrastRatioCalculator";

export declare type accessibilityScore = {
  textRating: number;
  structureRating: number;
  colorRating: number;
};

export declare type poster = {
  name: string;
  data: string;
  accessibilityScore: accessibilityScore;
};

export declare type chartData = {
  labels: Array<string>;
  datasets: [
    {
      label: string;
      backgroundColor: Array<string>;
      borderColor: string;
      borderWidth: number;
      hoverOffset: number;
      data: Array<number>;
      options: {
        responsive: boolean;
        maintainAspectRatio: boolean;
      };
    }
  ];
};

export declare type oaImageType = {
  tempImages: {
    top: {
      img: Tesseract.ImageLike;
      text: string | null;
      textConfidence: number;
    };
    middle: {
      img: Tesseract.ImageLike;
      text: string | null;
      textConfidence: number;
    };
    bottom: {
      img: Tesseract.ImageLike;
      text: string | null;
      textConfidence: number;
    };
  };
  topLeft: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
  topMiddle: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
  topRight: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
  middleLeft: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
  middle: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
  middleRight: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
  bottomLeft: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
  bottomMiddle: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
  bottomRight: {
    img: string | HTMLImageElement;
    color: Array<ColorContrastRatioCalculatorInput>;
  };
};
