import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  title="Crear Grupo";
  subtitle="Lista de Grupos";
  private _parametros:any;
  grupos=[];
  nuevoGrupo={};
  disabledButtons={
    NuevoGrupoFormSubmitButton:false
  };

  constructor(private _ActivateRoute:ActivatedRoute, private _http:Http, private _masterURL:MasterURLService) { }

  ngOnInit() {
    this._ActivateRoute.params.subscribe(parametros=>{
      this._parametros=parametros;
      this._http.get(this._masterURL.url+'Grupo?idMateria='+this._parametros.idMateria).subscribe(
        (res:Response)=>{
          this.grupos=res.json().map((value)=>{
            value.formularioCerrado=true;
            return value;
          });
        },
        (err)=>{
          console.log(err);
        }
      )
    })
  }

  crearGrupo(formulario:NgForm){
    this.disabledButtons.NuevoGrupoFormSubmitButton=true;
    let grupo={
      nombreGrupo:formulario.value.nombreGrupo,
      numeroMaximoEstudiante:formulario.value.numeroMaximoEstudiante,
      idMateria:this._parametros.idMateria
    };
    this._http.post(this._masterURL.url+'Grupo',grupo).subscribe(
      (res:Response)=>{
        this.grupos.push(res.json());
        this.nuevoGrupo={};
        this.disabledButtons.NuevoGrupoFormSubmitButton=false;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  borrarGrupo(id:number){
    this._http.delete(this._masterURL.url+'Grupo/'+id).subscribe(
      (res)=>{
        let grupoBorrado=res.json();
        this.grupos=this.grupos.filter(value=>grupoBorrado.id!=value.id);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  actualizarGrupo(grupo:any, id:number){
    let parametros={
      nombreGrupo:grupo.nombreGrupo,
      numeroMaximoEstudiante:grupo.numeroMaximoEstudiante

    };
    this._http.put(this._masterURL.url+"Grupo/"+id,parametros).subscribe(
      (res:Response)=>{
        grupo.formularioCerrado=!grupo.formularioCerrado;
        console.log("Respuesta:",res.json());
      },
      (err) => {
        console.log("Error: ", err);
      }
    );
  }

}
