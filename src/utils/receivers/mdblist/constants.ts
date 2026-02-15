import type {
  ImporterMCITypes,
  Importers,
} from '~/utils/importer/types/importers';
import type { ImportCatalogs } from '~/utils/importer/types/user-settings/import-catalogs';
import { ManifestReceiverTypes } from '~/utils/manifest';
import type { ReceiverInfo } from '~/utils/receiver/receiver';
import { IDSources } from '~/utils/receiver/types/id';
import { Receivers } from '~/utils/receiver/types/receivers';

import { MDBListCatalogType } from './types/catalog/catalog-type';

export const receiverInfo: ReceiverInfo<Receivers.MDBLIST> = {
  id: Receivers.MDBLIST,
  icon: 'https://api.iconify.design/simple-icons:imdb.svg?color=%23F5C518',
  text: 'MDBList',
  backgroundColour: 'bg-[#1A1A1A]/60',
  borderColour: 'border-[#1A1A1A]',
  liveSync: true,
  importSync: false,
};

export const internalIds = [[IDSources.MDBLIST]] as const satisfies Readonly<
  Readonly<IDSources[]>[]
>;

export const syncIds = [
  [IDSources.MDBLIST],
  [IDSources.IMDB],
  [IDSources.TMDB],
  [IDSources.TRAKT],
] as const satisfies Readonly<Readonly<IDSources[]>[]>;

export const manifestCatalogItems = [] as const;

export const defaultCatalogs: Readonly<
  (typeof manifestCatalogItems)[number]['id'][]
> = [] as const satisfies Readonly<(typeof manifestCatalogItems)[number]['id'][]>;

export const defaultImportCatalogs: Readonly<
  Record<Importers, Readonly<ImportCatalogs<MDBListMCIT, ImporterMCITypes>[]>>
> = {
  simkl: [],
  stremio: [],
} as const satisfies Readonly<
  Record<Importers, Readonly<ImportCatalogs<MDBListMCIT, ImporterMCITypes>[]>>
>;

export const liveSyncTypes = [
  ManifestReceiverTypes.MOVIE,
  ManifestReceiverTypes.SERIES,
] as const satisfies Readonly<ManifestReceiverTypes[]>;

export const defaultLiveSyncTypes: Readonly<(typeof liveSyncTypes)[number][]> =
  liveSyncTypes;

export const receiverTypeMapping = {
  [MDBListCatalogType.MOVIES]: ManifestReceiverTypes.MOVIE,
  [MDBListCatalogType.SHOWS]: ManifestReceiverTypes.SERIES,
};
export const receiverTypeReverseMapping = {
  [ManifestReceiverTypes.MOVIE]: MDBListCatalogType.MOVIES,
  [ManifestReceiverTypes.SERIES]: MDBListCatalogType.SHOWS,
  [ManifestReceiverTypes.ANIME]: MDBListCatalogType.SHOWS,
  [ManifestReceiverTypes.CHANNELS]: MDBListCatalogType.SHOWS,
  [ManifestReceiverTypes.TV]: MDBListCatalogType.SHOWS,
};
