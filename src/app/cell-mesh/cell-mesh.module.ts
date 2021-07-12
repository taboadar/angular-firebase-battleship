import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellComponent } from './cell/cell.component';
import { MeshComponent } from './mesh/mesh.component';



@NgModule({
  declarations: [
    CellComponent,
    MeshComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MeshComponent
  ]
})
export class CellMeshModule { }
