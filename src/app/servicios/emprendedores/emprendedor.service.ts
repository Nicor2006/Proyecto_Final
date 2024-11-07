import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Emprendedor } from '../../interfaces/emprendedor';

@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {
  private dataUrl = 'assets/emprendedores.json';
  private currentIndex = 0;
  private emprendedoresCache$: Observable<Emprendedor[]> | null = null;

  constructor(private http: HttpClient) {}

  // Método para obtener todos los emprendedores y cachear la respuesta
  private getEmprendedores(): Observable<Emprendedor[]> {
    if (!this.emprendedoresCache$) {
      this.emprendedoresCache$ = this.http.get<Emprendedor[]>(this.dataUrl).pipe(
        shareReplay(1) // Cachear la respuesta para evitar múltiples llamadas HTTP
      );
    }
    return this.emprendedoresCache$;
  }

  // Método para obtener un solo emprendedor por ID
  getEmprendedorById(id: number): Observable<Emprendedor | undefined> {
    return this.getEmprendedores().pipe(
      map((emprendedores: Emprendedor[]) => 
        emprendedores.find(emprendedor => emprendedor.cedula === id)
      )
    );
  }

  getPlantillasById(id: number): Observable<any | undefined> {
    return this.getEmprendedores().pipe(
      map((emprendedores: Emprendedor[]) => {
        const emprendedor = emprendedores.find(emprendedor => emprendedor.cedula === id);
        return emprendedor ? emprendedor.Plantillas : undefined;
      })
    );
  }

  getEmprendedoresByQueHago(queHago: string): Observable<Emprendedor[]> {
    return this.getEmprendedores().pipe(
      map((emprendedores: Emprendedor[]) =>
        emprendedores.filter(emprendedor => 
          emprendedor.QueHago.toLowerCase().includes(queHago.toLowerCase())
        )
      )
    );
  }

  // Método para obtener 20 emprendedores al azar, sin repetir y mezclados
  getRandomEmprendedores(): Observable<Emprendedor[]> {
    return this.getEmprendedores().pipe(
      map(emprendedores => {
        const shuffled = this.shuffleArray(emprendedores.slice()); // Mezclar la lista completa
        const selected = shuffled.slice(this.currentIndex, this.currentIndex + 20);

        this.currentIndex += 20;
        if (this.currentIndex >= emprendedores.length) {
          this.currentIndex = 0; // Reiniciar si llegamos al final
        }

        return selected;
      })
    );
  }

  // Método para resetear el índice de selección
  resetCurrentIndex(): void {
    this.currentIndex = 0;
  }

  // Función para mezclar un array
  private shuffleArray(array: Emprendedor[]): Emprendedor[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
