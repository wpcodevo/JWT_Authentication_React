import png from '../../assets/png.png';
import jpg from '../../assets/jpg.png';
import svg from '../../assets/svg.png';
import defaultImage from '../../assets/default.png';
import jpeg from '../../assets/jpeg.png';

export const ImageConfig: {
  png: string;
  jpg: string;
  svg: string;
  default: string;
  jpeg: string;
  'svg+xml': string;
} = {
  png,
  jpg,
  svg,
  'svg+xml': svg,
  default: defaultImage,
  jpeg,
};
