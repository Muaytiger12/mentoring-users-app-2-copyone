import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAddFolder } from '@users/materials/data-access';
import { MaterialsFacade } from '@users/materials/data-access';
@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private nameFolder: any;
  private materialsFacade = inject(MaterialsFacade);
  public dialog = inject(MatDialog);

  private readonly destroyRef = inject(DestroyRef);

  public onOpenAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      data: { nameFolder: this.nameFolder },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newFolder: IAddFolder = {
            title: result.nameFolder,
          };
          this.materialsFacade.addFolder(newFolder);
          console.log('вызов фасада из folders-buton')
        }
      });
  }
}
