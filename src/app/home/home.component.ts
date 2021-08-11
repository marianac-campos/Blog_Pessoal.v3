import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';
import { Theme } from '../model/Theme';
import { User } from '../model/User';
import { AlertsService } from '../service/alerts.service';
import { AuthService } from '../service/auth.service';
import { PostageService } from '../service/postage.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postagem: Post = new Post()
  tema: Theme = new Theme()
  usuario: User = new User()

  listarPostagens: Post[]
  tituloPostagem: string

  listarTemas: Theme[]
  idTema: number
  tituloTema: string

  idUsario = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postageService: PostageService,
    private themeService: ThemeService,
    private authService: AuthService,
    private alerts: AlertsService,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.alerts.showAlertInfo("Sua sessão expirou, faça o login novamente")
      this.router.navigate(['/login'])
    }

    this.getAllThemes()
    this.getAllPostages()
  }

  getAllThemes() {
    this.themeService.getAllTheme().subscribe((resp: Theme[]) => {
      this.listarTemas = resp
    })
  }

  findByIdTheme() {
    this.themeService.getByIdTheme(this.idTema).subscribe((resp: Theme) => {
      this.tema = resp
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUsario).subscribe((resp: User) => {
      this.usuario = resp
    })
  }

  findByTitlePost() {
    if (this.tituloPostagem == '') {
      this.getAllPostages()
    } else {
      this.postageService.getByTitlePost(this.tituloPostagem).subscribe((resp: Post[]) => {
        this.listarPostagens = resp
      })
    }
  }

  findByTheme() {
    if (this.tituloTema == '') {
      this.getAllThemes()
    } else {
      this.themeService.getByTheme(this.tituloTema).subscribe((resp: Theme[]) => {
        this.listarTemas = resp
      })
    }
  }

  getAllPostages() {
    this.postageService.getAllPostages().subscribe((resp: Post[]) => {
      this.listarPostagens = resp
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsario
    this.postagem.usuario = this.usuario
    console.log(this.postagem)

    this.postageService.postPostage(this.postagem).subscribe((resp: Post) => {
      this.postagem = resp
      this.alerts.showAlertSuccess('Postagem realizada com sucesso!')

      this.postagem = new Post()
      this.getAllPostages()
    })
  }

}
