export function isAssetLoadError(error) {
  return /ChunkLoadError|Loading (?:CSS )?chunk|Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i.test(
    `${error?.name || ''} ${error?.message || ''}`,
  );
}

export function reportUiFailure(error) {
  // Não registrar mensagens, URLs, props ou stacks que possam conter dados.
  console.warn('ui.failure', {
    category: isAssetLoadError(error) ? 'ASSET_LOAD' : 'RENDER',
  });
}
