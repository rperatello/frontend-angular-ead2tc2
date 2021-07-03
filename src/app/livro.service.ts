import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './model/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseURL = 'https://backtc2ead.glitch.me/api/sc3003299';

  getBooks(): Observable<Livro[]>{
    return this.http.get<Livro[]>(this.baseURL + '/produtos');
  }

  getBook(id: string): Observable<Livro>{
    return this.http.get<Livro>(this.baseURL + '/produtos/' + id);
  }

  addBook(book: {titulo: string, descricao: string, preco: number}): Observable<any>{
    let body = new HttpParams();
    body = body.set('titulo', book.titulo);
    body = body.set('descricao', book.descricao);
    body = body.set('preco', String(book.preco));
    return this.http.post(this.baseURL + '/produtos', body, {observe: 'response'});
  }

  update(book: {titulo: string, descricao: string, preco: number}, id: string): Observable<any>{
    let body = new HttpParams();
    body = body.set('titulo', book.titulo);
    body = body.set('descricao', book.descricao);
    body = body.set('preco', String(book.preco));
    return this.http.put(this.baseURL + '/produtos/' + id, body, {observe: 'response'});
  }

  delete(id: string): Observable<any>{
    return this.http.delete(this.baseURL + '/produtos/' + id, {observe: 'response'});
  }

  constructor(private http: HttpClient) { }

}
