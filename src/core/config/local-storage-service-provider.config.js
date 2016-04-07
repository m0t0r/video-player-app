'use strict';

let localStorageServiceProviderConfig = (localStorageServiceProvider) => {
  localStorageServiceProvider.setPrefix('vp');
};

export default localStorageServiceProviderConfig;
