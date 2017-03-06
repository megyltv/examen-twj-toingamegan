import { Component, OnInit } from '@angular/core';
import {Response, Http} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  title="Crear Materia";
  subtitle="Lista de Materias";
  nuevaMateria={};
  materias=[];
  disabledButtons={
    NuevaMateriaFormSubmitButton:false
  };

  constructor(private _http:Http,private _masterURL:MasterURLService) {

  }

  ngOnInit() {
    this._http.get(this._masterURL.url+"Materia").subscribe(
      (res:Response)=>{
        this.materias=res.json().map((value)=>{
          value.formularioCerrado=true;
          return value;
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  crearMateria(formulario:NgForm) {
    this.disabledButtons.NuevaMateriaFormSubmitButton=true;
    console.log(formulario);
    this._http.post(this._masterURL.url+"Materia",{
      nombreMateria:formulario.value.nombreMateria,
      topicoMateria:formulario.value.topicoMateria,
      fechaCreacion:formulario.value.fechaCreacion
    }).subscribe(
      (res)=>{
        console.log("No hubo errores",res);
        this.materias.push(res.json());
        this.nuevaMateria={};
        this.disabledButtons.NuevaMateriaFormSubmitButton=false;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  borrarMateria(id:number){
    this._http.delete(this._masterURL.url+"Materia/"+id).subscribe(
      (res)=>{
        let materiaBorrada=res.json();
        this.materias=this.materias.filter(value=>materiaBorrada.id!=value.id);
      },
      (err)=>{
        console.log(err);
      }
    );
  }
  actualizarMateria(materia:any, formulario:NgForm){
    let parametros={
      nombreMateria:materia.nombreMateria,
      topicoMateria:materia.topicoMateria,
      fechaCreacion:materia.fechaCreacion
    };
    this._http.put(this._masterURL.url+"Materia/"+materia.id,parametros).subscribe(
      (res:Response)=>{
        materia.formularioCerrado=!materia.formularioCerrado;
        console.log("Respuesta:",res.json());
      },
      (err) => {
        console.log("Error: ", err);
      }
    );
  }
}
