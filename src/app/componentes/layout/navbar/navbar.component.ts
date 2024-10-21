import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { EmprendedorService } from '../../../servicios/emprendedores/emprendedor.service';
import { Emprendedor } from '../../../interfaces/emprendedor';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'] // Corrige styleUrl a styleUrls
})
export class NavbarComponent implements OnInit {
  cedula!: number;
  emprendedor: Emprendedor | undefined;

  constructor(
    private router: Router,
    private emprendedorService: EmprendedorService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const cedulaString = this.router.url.split('/').pop(); // Obtén el último fragmento de la URL
      if (cedulaString && !isNaN(+cedulaString)) {
        this.cedula = +cedulaString;

        // Cargar el emprendedor solo si la cédula es válida
        this.emprendedorService.getEmprendedorById(this.cedula).subscribe((data) => {
          this.emprendedor = data;
        });
      } else {
        this.cedula = -1;
        this.emprendedor = undefined; // O manejar esto como prefieras
      }
    });
  }
}