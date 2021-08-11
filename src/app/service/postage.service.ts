import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostageService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostages(): Observable<Post[]> {
    return this.http.get<Post[]>('https://blogcplus.herokuapp.com/postagens')
  }

  getByIdPostage(id: number): Observable<Post> {
    return this.http.get<Post>(`https://blogcplus.herokuapp.com/postagens/${id}`)
  }

  getByTitlePost(title: string): Observable<Post[]> {
    return this.http.get<Post[]>(`https://blogcplus.herokuapp.com/postagens/titulo/${title}`)
  }

  postPostage(postagem: Post): Observable<Post> {
    return this.http.post<Post>('https://blogcplus.herokuapp.com/postagens', postagem)
  }

  putPostage(post: Post): Observable<Post> {
    return this.http.put<Post>('https://blogcplus.herokuapp.com/postagens', post)
  }

  deletePostage(id: number) {
    return this.http.delete(`https://blogcplus.herokuapp.com/postagens/${id}`)
  }
}
