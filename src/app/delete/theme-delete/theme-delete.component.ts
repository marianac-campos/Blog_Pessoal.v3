import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrls: ['./theme-delete.component.css']
})
export class ThemeDeleteComponent implements OnInit {

  tema: Theme = new Theme()
  idTema: number

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      alert("Sua sessão expirou, faça o login novamente")
      this.router.navigate(['/login'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTheme(this.idTema)
  }

  findByIdTheme(id: number) {
    this.themeService.getByIdTheme(id).subscribe((resp: Theme) => {
      this.tema = resp
    })
  }

  apagar() {
    this.themeService.deleteTheme(this.idTema).subscribe(() => {
      alert("Tema apagado com sucesso!")
      this.router.navigate(['/theme'])
    })
  }


}
