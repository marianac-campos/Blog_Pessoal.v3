import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { AlertsService } from 'src/app/service/alerts.service';
import { PostageService } from 'src/app/service/postage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postage-delete',
  templateUrl: './postage-delete.component.html',
  styleUrls: ['./postage-delete.component.css']
})
export class PostageDeleteComponent implements OnInit {

  postagem: Post = new Post()
  idPostagem: number

  constructor(
    private postageService: PostageService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertsService,
  ) { }

  ngOnInit() {

    window.scroll(0, 0)


    if (environment.token == '') {
      this.alert.showAlertInfo('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/login'])
    }

    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostage(this.idPostagem)

  }

  findByIdPostage(id: number) {
    this.postageService.getByIdPostage(id).subscribe((resp: Post) => {
      this.postagem = resp
    })
  }

  apagar() {
    this.postageService.deletePostage(this.idPostagem).subscribe(() => {
      this.alert.showAlertSuccess('Postagem deletada com sucesso!')
      this.router.navigate(['/home'])
    })
  }
}
