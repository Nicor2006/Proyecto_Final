import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmprendedorService } from '../../../../../servicios/emprendedores/emprendedor.service';
import { MatButtonModule } from '@angular/material/button';
import { Emprendedor } from '../../../../../interfaces/emprendedor';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-plantilla-servicios1',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatCardModule],
  templateUrl: './plantilla-servicios1.component.html',
  styleUrl: './plantilla-servicios1.component.scss'
})
export class PlantillaServicios1Component implements OnInit, AfterViewInit{
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleCalendarScript();
    }
  }

  loadGoogleCalendarScript(): void {
    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    script.onload = () => {
      const target = document.querySelector('.calendar-button-container'); // Obtén el contenedor para el botón
  
      if (target) { // Asegúrate de que el contenedor existe
        // Crea un nuevo contenedor para el botón y aplica la clase
        const linkContainer = document.createElement('div');
        linkContainer.classList.add('link-container'); // Añade la clase para centrar el contenido
        target.appendChild(linkContainer); // Agrega el nuevo contenedor al DOM
  
        // Carga el botón en el nuevo contenedor
        (window as any).calendar.schedulingButton.load({
          url: this.emprendedor?.calendario, // Asegúrate de que esto no sea undefined
          color: '#0097A7',
          label: 'Programar una cita',
          target: linkContainer, // Usa el nuevo contenedor como objetivo
        });
      }
    };
    document.body.appendChild(script);
  }
  
}