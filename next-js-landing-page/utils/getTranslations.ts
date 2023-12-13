import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
let defaultNamespace = ['common','navbar']
export async function getTranslations(locale , namespace=[]) {
  const translations = await serverSideTranslations(locale ?? 'en',[...defaultNamespace,...namespace] );
  return translations;
}