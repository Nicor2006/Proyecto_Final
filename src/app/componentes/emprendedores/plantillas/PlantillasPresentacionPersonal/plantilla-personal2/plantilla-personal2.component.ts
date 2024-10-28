import { Component, OnInit } from '@angular/core';
import { Emprendedor } from '../../../../../interfaces/emprendedor';
import { ActivatedRoute } from '@angular/router';
import { EmprendedorService } from '../../../../../servicios/emprendedores/emprendedor.service';

@Component({
  selector: 'app-plantilla-personal2',
  standalone: true,
  imports: [],
  templateUrl: './plantilla-personal2.component.html',
  styleUrl: './plantilla-personal2.component.scss'
})
export class PlantillaPersonal2Component implements OnInit {
  emprendedor: Emprendedor | undefined
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

    this.emprendedorService.getEmprendedorById(this.cedula).subscribe((data) => {
      this.emprendedor = data;
    });
  }
}
