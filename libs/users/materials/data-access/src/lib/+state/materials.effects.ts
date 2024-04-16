import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MaterialsActions } from './materials.actions';
import { IAddFolder } from '../models/add-folder.model';
import { IFolder } from '../models/folder.model';
import { ApiService } from 'libs/core/http/src/lib/api.service';

@Injectable()
export class MaterialsEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  // loadMaterialss$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(MaterialsActions.loadMaterialss),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map((data) => MaterialsActions.loadMaterialssSuccess({ data })),
  //         catchError((error) => of(MaterialsActions.loadMaterialssFailure({ error })))
  //       )
  //     )
  //   );
  // });

  addFolder = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.addFolder),
        switchMap(({ folder }) =>
          this.apiService.post<IFolder, IAddFolder>('/folder', folder).pipe(
            map((newFolder) => MaterialsActions.addFolderSuccess({ folder: newFolder })),
            catchError((error) => {
              console.log('Error', error);
              return of(MaterialsActions.addFolderFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );

  loadFolders = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MaterialsActions.loadFolders),
        switchMap(() =>
          this.apiService.get<IFolder[]>('/folder').pipe(
            map((folders) => MaterialsActions.loadFoldersSuccess({ folders })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.loadFoldersFailure({ error }));
            })
          )
        )
      );
    },
    { functional: true }
  );
}
