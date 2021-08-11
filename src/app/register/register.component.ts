import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: User = new User
  confirmaSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmarSenha(event: any) {
    this.confirmaSenha = event.target.value
  }

  permissao(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmaSenha) {
      alert("As senhas não são semelhantes.")
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: User) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        alert("Usuário cadastrado com sucesso!")
      })
    }
  }
}
