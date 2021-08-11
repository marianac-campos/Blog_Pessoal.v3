import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: User = new User()

  idUsuario: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/login'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUser(this.idUsuario)
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.usuario = resp
    })
  }

  typeUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas')
    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: User) => {
        this.usuario = resp
        this.router.navigate(['/home'])
        alert('Usuário atualizado com sucesso! Faça o login novamente.')
        environment.id = 0
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        this.router.navigate(['/login'])
      });
    }
  }



}
