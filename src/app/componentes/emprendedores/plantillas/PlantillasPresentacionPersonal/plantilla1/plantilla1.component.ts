import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmprendedorService } from '../../../../../servicios/emprendedores/emprendedor.service';
import { MatButtonModule } from '@angular/material/button';
import { Emprendedor } from '../../../../../interfaces/emprendedor';


@Component({
  selector: 'app-plantilla1',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule],
  templateUrl: './plantilla1.component.html',
  styleUrls: ['./plantilla1.component.scss'],
})
export class Plantilla1Component implements OnInit {
  emprendedor: Emprendedor | undefined
  cedula = 0;

  constructor(
    private route: ActivatedRoute,
    private emprendedorService: EmprendedorService,
    @Inject(PLATFORM_ID) private platformId: Object
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
