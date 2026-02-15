import type { PickByArrays, RequireAtLeastOne } from '~/utils/helpers/types';
import type { ManifestReceiverTypes } from '~/utils/manifest';
import { ReceiverServer } from '~/utils/receiver/receiver-server';
import type { IDs } from '~/utils/receiver/types/id';
import type { ManifestCatalogExtraParametersOptions } from '~/utils/receiver/types/manifest-types';
import type { MetaPreviewObject } from '~/utils/receiver/types/meta-preview-object';

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
    _previewObject: any,
    _oldType: MDBListMCIT['receiverCatalogType'],
    _options?: ManifestCatalogExtraParametersOptions,
    _index?: number,
  ): Promise<MetaPreviewObject> {
    throw new Error('Method not implemented.');
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
    _type: MDBListCatalogType,
    _potentialTypes: MDBListCatalogType[],
    _status: MDBListCatalogStatus,
    _options?: ManifestCatalogExtraParametersOptions,
  ): Promise<any[]> {
    // MDBList doesn't have catalog support in this implementation
    return [];
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
