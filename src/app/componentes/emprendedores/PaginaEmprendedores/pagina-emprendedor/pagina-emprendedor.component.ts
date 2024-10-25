import { Component, OnInit } from '@angular/core';
import { Plantilla1Component } from '../../plantillas/PlantillasPresentacionPersonal/plantilla1/plantilla1.component';
import { PlantillaServicios1Component } from '../../plantillas/plantillasServicios/plantilla-servicios1/plantilla-servicios1.component';
import { PlantillaEmpresa1Component } from '../../plantillas/plantillasEmpresa/plantilla-empresa1/plantilla-empresa1.component';
import { PlantillaEmpresa2Component } from '../../plantillas/plantillasEmpresa/plantilla-empresa2/plantilla-empresa2.component';
import { PlantillaServicios2Component } from '../../plantillas/plantillasServicios/plantilla-servicios2/plantilla-servicios2.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { EmprendedorService } from '../../../../servicios/emprendedores/emprendedor.service';
import { HttpClientModule } from '@angular/common/http';
import { Emprendedor } from '../../../../interfaces/emprendedor';
import { filter } from 'rxjs';
import { Plantillas } from '../../../../interfaces/plantillas';

@Component({
  selector: 'app-pagina-emprendedor',
  standalone: true,
  imports: [
    Plantilla1Component,
    PlantillaServicios1Component,
    PlantillaServicios2Component,
    PlantillaEmpresa1Component,
    PlantillaEmpresa2Component,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './pagina-emprendedor.component.html',
  styleUrls: ['./pagina-emprendedor.component.scss']
})
export class PaginaEmprendedorComponent implements OnInit  {
  plantillas: Plantillas | undefined
  cedula = 0;

  constructor(
    private route: ActivatedRoute,
    private emprendedorService: EmprendedorService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const cedula = params.get('cedula');
      if (cedula) {
        this.cedula = +cedula; // Convertir el ID a número
      }
    });

    this.emprendedorService.getPlantillasById(this.cedula).subscribe((data) => {
      this.plantillas = data;
    });
  }
}
