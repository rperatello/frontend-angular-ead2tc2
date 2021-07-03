import { Component, OnInit } from '@angular/core';
import { Livro } from '../model/Livro';
import { LivroService } from '../livro.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  bookForm!: FormGroup;
  selectedId!: string;
  selectedBookById!: Livro;

  constructor(private bookService: LivroService, public router: Router) { }

  newBook(): void{
    if (this.checkForm()){
      this.bookService.addBook(this.bookForm.value).subscribe( res => {
        res.ok ? alert ('Livro cadastrado com sucesso!') : alert ('Falha ao acessar o banco de dados.');
        location.assign('/');
      });
    }
  }

  updateBook(): void{
    if (this.checkForm()){
      this.bookService.update(this.bookForm.value, this.selectedBookById._id).subscribe( res => {
        res.ok ? alert ('Registro alterado com sucesso!') : alert('Falha ao alterar o registro!');
        location.assign('/');
      });
    }
  }

  deleteBook(): void{
    this.bookService.delete(this.selectedBookById._id).subscribe( res => {
      res.ok ? alert('Registro deletado com sucesso!') : alert('Falha ao deletar o registro!');
      location.assign('/');
    });
  }

  getId(): void {
    this.selectedId = (this.router.url.split('/')[2]);
    this.bookService.getBook(this.selectedId).subscribe((book: Livro) => {
      this.selectedBookById = book;
      this.bookForm.setValue ({
        titulo: this.selectedBookById.titulo,
        descricao: this.selectedBookById.descricao,
        preco: this.selectedBookById.preco,
      });
    });
  }

  initForm(): void{
    this.bookForm = new FormGroup ({
      titulo: new FormControl(null),
      descricao: new FormControl (null),
      preco: new FormControl(0)
    });
  }

  checkForm(): boolean{
    let erros = [];
    if (this.bookForm.valid){
      return true;
    } else {
      alert('O formulário possui dados inválido!');
      return false;
    }
  }

  onSubmit(): void{
    console.log(this.bookForm.value);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.router.url !== '/cadastro'){
      this.getId();
    }
  }

}
