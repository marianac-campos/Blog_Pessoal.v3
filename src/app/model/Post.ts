import { User } from './User'
import { Theme } from './Theme'

export class Post {
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public curtidas: number
    public usuario: User
    public tema: Theme
}