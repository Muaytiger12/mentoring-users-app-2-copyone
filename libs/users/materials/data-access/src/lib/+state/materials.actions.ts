import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAddFolder } from '../models/add-folder.model';
import { IFolder } from '../models/folder.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materialss': emptyProps(),
    'Load Materialss Success': props<{ data: unknown }>(),
    'Load Materialss Failure': props<{ error: unknown }>(),

    'Add Folder': props<{ folder: IAddFolder }>(),
    'Add FolderSuccess': props<{ folder: IFolder }>(),
    'Add FolderFailure': props<{ error: any }>(),

    'loadFolders': emptyProps(),
    'loadFoldersSuccess': props<{folders: IFolder[]}>(),
    'loadFoldersFailure': props<{error: any}>(),

    'deleteFolders': props<{id: number}>(),
    'deleteFoldersSuccess': props<{id: number}>(),
    'deleteFoldersFailure': props<{error: any}>(),
  },
});
