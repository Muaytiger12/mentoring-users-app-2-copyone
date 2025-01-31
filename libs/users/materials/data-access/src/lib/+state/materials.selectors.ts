import { createFeatureSelector, createSelector } from '@ngrx/store';
import { materialsFeatureKey, MaterialsState, materialsAdapter } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';



// export const selectMaterialsState = createFeatureSelector<fromMaterials.State>(fromMaterials.materialsFeatureKey);
export const selectMaterialsState = createFeatureSelector<MaterialsState>(materialsFeatureKey);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();



// folders
export const selectFoldersStatus = createSelector(
  selectMaterialsState, (state: MaterialsState) => state.status
)

export const selectAllFolders = createSelector(
  selectMaterialsState, (state: MaterialsState) => selectAll(state)
)

export const selectFoldersEntities = createSelector(
  selectMaterialsState, (state: MaterialsState) => selectEntities(state)
)

export const selectOpenedFolder = createSelector(
  selectRouteParams,
  selectFoldersEntities,
  ({id}, entities) => entities[id] || null
)

// materials
export const selectMaterialsStatus = createSelector(
  selectMaterialsState, (state: MaterialsState) => state.status
)

export const selectAllMaterials = createSelector(
  selectMaterialsState, (state: MaterialsState) => state.materials
)
