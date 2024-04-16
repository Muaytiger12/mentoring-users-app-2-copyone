import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '../feature-folders-create/folders-add-button/folders-add-button.component';
import { FoldersListContainerComponent } from "../feature-folders-list/folders-list-container/folders-list-container.component";
import { FoldersListComponent } from "../feature-folders-list/folders-list/folders-list.component";
import { FoldersCardComponent } from '../feature-folders-list/folders-card/folders-card.component';

@Component({
    selector: 'users-users-materials',
    standalone: true,
    templateUrl: './users-materials.component.html',
    styleUrls: ['./users-materials.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FoldersAddButtonComponent, FoldersCardComponent, FoldersListContainerComponent]
})
export class UsersMaterialsComponent {

}
