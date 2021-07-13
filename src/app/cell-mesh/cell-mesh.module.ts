import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from './cell/cell.component';
import { MeshComponent } from './mesh/mesh.component';
import { ToLetterPipe } from './to-letter.pipe';



@NgModule({
  declarations: [
    CellComponent,
    MeshComponent,
    ToLetterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MeshComponent
  ]
})
export class CellMeshModule { }
