import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { IFolder } from '../models/folder.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { IMaterial } from '../models/material.model';
import { LoadingStatus } from '@users/core/data-access';

export const materialsFeatureKey = 'materials';

// export interface State {}
// export const initialState: State = {};

export const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();


export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init',
});

export interface MaterialsState extends EntityState<IFolder> {
  materials: IMaterial[];
  status: LoadingStatus;
}
// export const reducer = createReducer(
//   initialState,
//   on(MaterialsActions.loadMaterialss, (state) => state),
//   on(MaterialsActions.loadMaterialssSuccess, (state, action) => state),
//   on(MaterialsActions.loadMaterialssFailure, (state, action) => state)
// );

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.addFolder, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(MaterialsActions.addFolderSuccess, (state, { folder }) => materialsAdapter.addOne(folder, { ...state })),
    on(MaterialsActions.addFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
      materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    }))
  ),
});
