import React from 'react'
import PropTypes from 'prop-types'
import Book from '../interfaces/Book'
import yearAcOrDC from '../utils/yearAcOrDc'
import '../styles/CardBook.css'

export default function CardBook({ book, visible }: { book: Book, visible: string }) {
  return (
    <section className={`card-container_${visible}`}>
      <h1>{book.title}</h1>
      <img alt={`Foto do livro: ${book.title}`} src={book.imageLink} />
      <p>{book.author}</p>
      <p>{book.country}</p>
      <p>{book.language}</p>
      <p>{book.pages}</p>
      <p>{yearAcOrDC(book.year)}</p>
      <a href={book.link}>Saiba mais</a>
    </section>
  )
}

CardBook.propTypes = {
  book: PropTypes.shape({
    author: PropTypes.string,
    language: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    country: PropTypes.string,
    imageLink: PropTypes.string,
    link: PropTypes.string,
    pages: PropTypes.number,
  }).isRequired,
}
