import type { PickByArrays, RequireAtLeastOne, Year } from '~/utils/helpers/types';
import { ManifestReceiverTypes } from '~/utils/manifest';
import { ReceiverServer } from '~/utils/receiver/receiver-server';
import type { IDs } from '~/utils/receiver/types/id';
import type { ManifestCatalogExtraParametersOptions } from '~/utils/receiver/types/manifest-types';
import type { MetaPreviewObject } from '~/utils/receiver/types/meta-preview-object';

import type { MDBListLibrary } from './api/meta-previews';
import { getMDBListMetaPreviews } from './api/meta-previews';
import { syncMDBListMetaObject } from './api/sync';
import {
  defaultCatalogs,
  defaultImportCatalogs,
  defaultLiveSyncTypes,
  internalIds,
  liveSyncTypes,
  manifestCatalogItems,
  receiverInfo,
  receiverTypeMapping,
  receiverTypeReverseMapping,
  syncIds,
} from './constants';
import type { MDBListCatalogStatus } from './types/catalog/catalog-status';
import type { MDBListCatalogType } from './types/catalog/catalog-type';
import type { MDBListMCIT } from './types/manifest';

export class MDBListServerReceiver extends ReceiverServer<MDBListMCIT> {
  internalIds = internalIds;
  syncIds = syncIds;

  receiverTypeMapping = receiverTypeMapping;
  receiverTypeReverseMapping = receiverTypeReverseMapping;

  receiverInfo = receiverInfo;
  manifestCatalogItems = manifestCatalogItems;
  defaultCatalogs = defaultCatalogs;
  defaultImportCatalogs = defaultImportCatalogs;
  liveSyncTypes = liveSyncTypes;
  defaultLiveSyncTypes = defaultLiveSyncTypes;

  HAS_INTERNAL_SKIP = false;

  constructor() {
    super();
  }

  async getMappingIds(
    id: string,
    source: string,
  ): Promise<RequireAtLeastOne<IDs> | {}> {
    console.log(id, source);
    throw new Error('Method not implemented.');
  }

  async _convertPreviewObjectToMetaPreviewObject(
    previewObject: MDBListLibrary['movies'][number] | MDBListLibrary['shows'][number],
    _oldType: MDBListMCIT['receiverCatalogType'],
    _options?: ManifestCatalogExtraParametersOptions,
    _index?: number,
  ): Promise<MetaPreviewObject> {
    const isMovie = previewObject.mediatype === 'movie';
    const type: ManifestReceiverTypes = isMovie
      ? ManifestReceiverTypes.MOVIE
      : ManifestReceiverTypes.SERIES;

    // Build the ID string from available IDs
    const idParts: string[] = [];
    if (previewObject.imdb_id) {
      idParts.push(`imdb:${previewObject.imdb_id}`);
    }
    if (previewObject.tvdb_id) {
      idParts.push(`tvdb:${previewObject.tvdb_id}`);
    }

    const id = idParts.length > 0 ? idParts.join(':') : `mdblist:${previewObject.id}`;

    // Format release year as 4-digit string or undefined
    const releaseInfo = previewObject.release_year
      ? (previewObject.release_year.toString().padStart(4, '0') as Year)
      : undefined;

    // Extract IMDB rating from ratings array
    const imdbRating = previewObject.ratings?.find(
      (r) => r.source === 'imdb',
    )?.value?.toFixed(1);

    return {
      id,
      type,
      name: previewObject.title,
      poster: previewObject.poster || '',
      releaseInfo,
      description: previewObject.description,
      genres: previewObject.genres,
      imdbRating,
    };
  }

  async _convertObjectToMetaObject(
    _object: any,
    _ids: PickByArrays<IDs, MDBListMCIT['internalIds']>,
    _type: MDBListMCIT['receiverCatalogType'],
    _potentialTypes: ManifestReceiverTypes,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async _getMetaPreviews(
    type: MDBListCatalogType,
    _potentialTypes: MDBListCatalogType[],
    status: MDBListCatalogStatus,
    _options?: ManifestCatalogExtraParametersOptions,
  ): Promise<any[]> {
    const previews = await getMDBListMetaPreviews(
      type,
      status,
      this.userSettings,
    );

    // Combine movies and shows, sort by date
    const combined = [
      ...(previews.movies ?? []),
      ...(previews.shows ?? []),
    ].sort((a, b) => {
      const dateA = a.watchlist_at || '';
      const dateB = b.watchlist_at || '';
      return dateB.localeCompare(dateA);
    });

    return combined;
  }

  _getMetaObject(
    ids: PickByArrays<IDs, MDBListMCIT['syncIds']>,
    type: MDBListMCIT['receiverCatalogType'],
  ): Promise<any> {
    console.log('MDBListServerReceiver -> _getMetaObject -> id', ids, type);
    throw new Error('Method not implemented.');
  }

  async _syncMetaObject(ids: {
    ids: PickByArrays<IDs, MDBListMCIT['syncIds']>;
    count:
      | {
          season: number;
          episode: number;
        }
      | undefined;
  }): Promise<void> {
    await syncMDBListMetaObject(ids, this.userSettings);
  }
}
