import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { Theme } from 'src/app/model/Theme';
import { PostageService } from 'src/app/service/postage.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postage-edit',
  templateUrl: './postage-edit.component.html',
  styleUrls: ['./postage-edit.component.css']
})
export class PostageEditComponent implements OnInit {

  postagem: Post = new Post()
  tema: Theme = new Theme()

  listarTemas: Theme[]
  idTema: number

  constructor(
    private postageService: PostageService,
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      alert("Sua sessão expirou, faça o login novamente")
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostage(id)
    this.findAllThemes()
  }

  findAllThemes() {
    this.themeService.getAllTheme().subscribe((resp: Theme[]) => {
      this.listarTemas = resp
    })
  }

  findByIdPostage(id: number) {
    this.postageService.getByIdPostage(id).subscribe((resp: Post) => {
      this.postagem = resp
    })
  }

  findByIdTheme() {
    this.themeService.getByIdTheme(this.idTema).subscribe((resp: Theme) => {
      this.tema = resp
    })
  }

  atualizar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postageService.putPostage(this.postagem).subscribe((resp: Post) => {
      this.postagem = resp
      alert("Postagem atualizada com sucesso!")
      this.router.navigate(['/home'])
    })
  }
}
