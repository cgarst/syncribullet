import type {
  ImporterMCITypes,
  Importers,
} from '~/utils/importer/types/importers';
import type { ImportCatalogs } from '~/utils/importer/types/user-settings/import-catalogs';
import {
  ManifestCatalogExtraParameters,
  ManifestReceiverTypes,
} from '~/utils/manifest';
import type { ManifestCatalogItem } from '~/utils/manifest';
import type { ReceiverInfo } from '~/utils/receiver/receiver';
import { IDSources } from '~/utils/receiver/types/id';
import { Receivers } from '~/utils/receiver/types/receivers';

import { MDBListCatalogType } from './types/catalog/catalog-type';
import type { MDBListMCIT } from './types/manifest';

export const receiverInfo: ReceiverInfo<Receivers.MDBLIST> = {
  id: Receivers.MDBLIST,
  icon: 'https://api.iconify.design/simple-icons:mdblist.svg?color=%23FFFFFF',
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

export const manifestCatalogItems = [
  {
    id: 'syncribullet-mdblist-movies-plantowatch',
    type: ManifestReceiverTypes.MOVIE,
    name: 'MDBList - Plan to Watch',
    extra: [
      { name: ManifestCatalogExtraParameters.GENRE, isRequired: false },
      { name: ManifestCatalogExtraParameters.SKIP, isRequired: false },
    ],
  },
  {
    id: 'syncribullet-mdblist-movies-completed',
    type: ManifestReceiverTypes.MOVIE,
    name: 'MDBList - Completed',
    extra: [
      { name: ManifestCatalogExtraParameters.GENRE, isRequired: false },
      { name: ManifestCatalogExtraParameters.SKIP, isRequired: false },
    ],
  },
  {
    id: 'syncribullet-mdblist-shows-watching',
    type: ManifestReceiverTypes.SERIES,
    name: 'MDBList - Watching',
    extra: [
      { name: ManifestCatalogExtraParameters.GENRE, isRequired: false },
      { name: ManifestCatalogExtraParameters.SKIP, isRequired: false },
    ],
  },
  {
    id: 'syncribullet-mdblist-shows-plantowatch',
    type: ManifestReceiverTypes.SERIES,
    name: 'MDBList - Plan to Watch',
    extra: [
      { name: ManifestCatalogExtraParameters.GENRE, isRequired: false },
      { name: ManifestCatalogExtraParameters.SKIP, isRequired: false },
    ],
  },
  {
    id: 'syncribullet-mdblist-shows-completed',
    type: ManifestReceiverTypes.SERIES,
    name: 'MDBList - Completed',
    extra: [
      { name: ManifestCatalogExtraParameters.GENRE, isRequired: false },
      { name: ManifestCatalogExtraParameters.SKIP, isRequired: false },
    ],
  },
  {
    id: 'syncribullet-mdblist-shows-dropped',
    type: ManifestReceiverTypes.SERIES,
    name: 'MDBList - Dropped',
    extra: [
      { name: ManifestCatalogExtraParameters.GENRE, isRequired: false },
      { name: ManifestCatalogExtraParameters.SKIP, isRequired: false },
    ],
  },
] as const satisfies Readonly<ManifestCatalogItem<MDBListMCIT>[]>;

export const defaultCatalogs: Readonly<
  (typeof manifestCatalogItems)[number]['id'][]
> = [
  'syncribullet-mdblist-movies-plantowatch',
  'syncribullet-mdblist-movies-completed',
  'syncribullet-mdblist-shows-watching',
  'syncribullet-mdblist-shows-plantowatch',
  'syncribullet-mdblist-shows-completed',
] as const satisfies Readonly<(typeof manifestCatalogItems)[number]['id'][]>;

export const defaultImportCatalogs: Readonly<
  Record<Importers, Readonly<ImportCatalogs<MDBListMCIT, ImporterMCITypes>[]>>
> = {
  simkl: [],
  stremio: [
    {
      id: 'syncribullet-mdblist-movies-plantowatch',
      value: true,
      filters: {
        moviesStateFlaggedWatched: false,
        moviesStateFlaggedUnwatched: true,
        moviesStateFlaggedDropped: false,
        seriesStateFlaggedWatched: null,
        seriesStateFlaggedUnwatched: null,
        seriesStateFlaggedDropped: null,
        seriesStateFlaggedOnHold: null,
        seriesPreferStateFlaggedWatchedOverWatchCount: null,
        seriesUseCinemetaComparison: null,
        seriesStateHasWatchCount: null,
        seriesBackfillEpisodes: null,
        supportsTypes: [ManifestReceiverTypes.MOVIE],
      },
    },
    {
      id: 'syncribullet-mdblist-movies-completed',
      value: true,
      filters: {
        moviesStateFlaggedWatched: true,
        moviesStateFlaggedUnwatched: false,
        moviesStateFlaggedDropped: false,
        seriesStateFlaggedWatched: null,
        seriesStateFlaggedUnwatched: null,
        seriesStateFlaggedDropped: null,
        seriesStateFlaggedOnHold: null,
        seriesPreferStateFlaggedWatchedOverWatchCount: null,
        seriesStateHasWatchCount: null,
        seriesUseCinemetaComparison: null,
        seriesBackfillEpisodes: null,
        supportsTypes: [ManifestReceiverTypes.MOVIE],
      },
    },
    {
      id: 'syncribullet-mdblist-shows-watching',
      value: true,
      filters: {
        moviesStateFlaggedWatched: null,
        moviesStateFlaggedUnwatched: null,
        moviesStateFlaggedDropped: null,
        seriesStateFlaggedWatched: false,
        seriesStateFlaggedUnwatched: true,
        seriesStateFlaggedDropped: false,
        seriesStateFlaggedOnHold: false,
        seriesStateHasWatchCount: true,
        seriesPreferStateFlaggedWatchedOverWatchCount: true,
        seriesUseCinemetaComparison: true,
        seriesBackfillEpisodes: true,
        supportsTypes: [ManifestReceiverTypes.SERIES],
      },
    },
    {
      id: 'syncribullet-mdblist-shows-plantowatch',
      value: true,
      filters: {
        moviesStateFlaggedWatched: null,
        moviesStateFlaggedUnwatched: null,
        moviesStateFlaggedDropped: null,
        seriesStateFlaggedWatched: false,
        seriesStateFlaggedUnwatched: true,
        seriesStateFlaggedDropped: false,
        seriesStateFlaggedOnHold: false,
        seriesStateHasWatchCount: false,
        seriesPreferStateFlaggedWatchedOverWatchCount: true,
        seriesUseCinemetaComparison: false,
        seriesBackfillEpisodes: false,
        supportsTypes: [ManifestReceiverTypes.SERIES],
      },
    },
    {
      id: 'syncribullet-mdblist-shows-completed',
      value: true,
      filters: {
        moviesStateFlaggedWatched: null,
        moviesStateFlaggedUnwatched: null,
        moviesStateFlaggedDropped: null,
        seriesStateFlaggedWatched: true,
        seriesStateFlaggedUnwatched: false,
        seriesStateFlaggedDropped: false,
        seriesStateFlaggedOnHold: false,
        seriesStateHasWatchCount: null,
        seriesPreferStateFlaggedWatchedOverWatchCount: true,
        seriesUseCinemetaComparison: false,
        seriesBackfillEpisodes: true,
        supportsTypes: [ManifestReceiverTypes.SERIES],
      },
    },
    {
      id: 'syncribullet-mdblist-shows-dropped',
      value: true,
      filters: {
        moviesStateFlaggedWatched: null,
        moviesStateFlaggedUnwatched: null,
        moviesStateFlaggedDropped: null,
        seriesStateFlaggedWatched: false,
        seriesStateFlaggedUnwatched: true,
        seriesStateFlaggedDropped: true,
        seriesStateFlaggedOnHold: false,
        seriesStateHasWatchCount: true,
        seriesPreferStateFlaggedWatchedOverWatchCount: true,
        seriesUseCinemetaComparison: true,
        seriesBackfillEpisodes: true,
        supportsTypes: [ManifestReceiverTypes.SERIES],
      },
    },
  ],
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
