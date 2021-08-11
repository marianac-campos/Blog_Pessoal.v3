import { Post } from './Post'

export class User {
    public id: number
    // public (property) User.login: string
    public nome: string
    public login: string
    public senha: string
    public foto: string
    public tipo: string
    public dataNascimento: Date
    public postagem: Post[]
}