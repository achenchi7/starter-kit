import { Inter, Plus_Jakarta_Sans, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const variableConstant = 'variable';
const fontInterVar = inter.variable.replace(variableConstant, 'Inter');
const fontMontserratVar = montserrat.variable.replace(variableConstant, 'Montserrat');
const fontPlusJakartaSansVar = plusJakartaSans.variable.replace(variableConstant, 'Plus_Jakarta_Sans');

export const GlobalFontVariables = () => (
  <style jsx global>{`
    html {
      --font-inter: ${fontInterVar};
      --font-montserrat: ${fontMontserratVar};
      --font-plus-jakarta-sans: ${fontPlusJakartaSansVar};
    }
  `}</style>
); 