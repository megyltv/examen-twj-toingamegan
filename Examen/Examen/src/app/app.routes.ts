import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MateriaComponent} from "./materia/materia.component";
import {GrupoComponent} from "./grupo/grupo.component";
import {ModuleWithProviders} from "@angular/core";
export const routes: Routes=[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'materia', component:MateriaComponent},
  {path:'materia/:idMateria/grupo',component:GrupoComponent},
];
export const routing:ModuleWithProviders=RouterModule.forRoot(routes);
