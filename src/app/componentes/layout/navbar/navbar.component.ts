import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, NavigationEnd } from '@angular/router';
import { EmprendedorService } from '../../../servicios/emprendedores/emprendedor.service';
import { Emprendedor } from '../../../interfaces/emprendedor';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cedula!: number;
  emprendedor: Emprendedor | undefined;

  constructor(
    private router: Router,
    private emprendedorService: EmprendedorService
  ) {}

  ngOnInit(): void {
    // Solo suscribirse a los eventos de navegación final
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadEmprendedor();
    });
  }

  private loadEmprendedor(): void {
    const cedulaString = this.router.url.split('/').pop(); // Obtén el último fragmento de la URL
    if (cedulaString && !isNaN(+cedulaString)) {
      this.cedula = +cedulaString;

      // Cargar el emprendedor solo si la cédula es válida
      this.emprendedorService.getEmprendedorById(this.cedula).subscribe(
        (data) => {
          this.emprendedor = data;
        },
        (error) => {
          console.error('Error al cargar el emprendedor:', error);
          this.emprendedor = undefined; // Maneja el error como prefieras
        }
      );
    } else {
      this.cedula = -1;
      this.emprendedor = undefined; // O manejar esto como prefieras
    }
  }
}
