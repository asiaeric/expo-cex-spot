// Reexport the native module. On web, it will be resolved to CexSpotModule.web.ts
// and on native platforms to CexSpotModule.ts
export { default } from './CexSpotModule';
export { default as CexSpotView } from './CexSpotView';
export * from  './CexSpot.types';
