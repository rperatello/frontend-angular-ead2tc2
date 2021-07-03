import { Component, OnInit } from '@angular/core';
import { Livro } from '../model/Livro';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  bookList: Livro[] = [];

  loadBooks(): void {
    this.bookService.getBooks().subscribe( res => {
      console.log("Entrou loadBooks");
      this.bookList = res;
    });
  }

  selectBook(book: Livro): void{
    location.assign('/selected/' + book._id);
  }

  constructor(private bookService: LivroService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

}
