import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importar map para transformar la respuesta
import { Emprendedor } from '../../interfaces/emprendedor';

@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {
  private dataUrl = 'assets/emprendedores.json';
  private currentIndex = 0;

  constructor(private http: HttpClient) {}

  // Método para obtener todos los emprendedores
  getEmprendedores(): Observable<Emprendedor[]> {
    return this.http.get<Emprendedor[]>(this.dataUrl);
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
        return emprendedor ? emprendedor.Plantillas : undefined; // Retorna solo las plantillas
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

  getRandomEmprendedores(): Observable<Emprendedor[]> {
    return this.getEmprendedores().pipe(
      map(emprendedores => {
        const shuffled = this.shuffleArray(emprendedores);
        const startIndex = this.currentIndex;
        const endIndex = startIndex + 20;
        this.currentIndex = endIndex; // Actualizar el índice para la próxima llamada
        return shuffled.slice(startIndex, endIndex); // Devolverá menos de 20 si no hay suficientes
      })
    );
  }

  resetCurrentIndex(): void {
    this.currentIndex = 0
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
