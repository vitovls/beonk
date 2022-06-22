import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Book from '../interfaces/Book'
import yearAcOrDC from '../utils/yearAcOrDc'
import '../styles/CardBook.css'

export default function CardBook({ book, visible }: { book: Book, visible: string }) {
  const [show, setShow] = React.useState(visible)

  useEffect(() => {
    setShow(visible)
  }, [visible])

  return (
    <section className={`card-container_${show}`}>
      <button onClick={() => setShow('disabled')} type="button" className="card-container-close-bottom">X</button>
      <h1>
        Título:
        {' '}
        {book.title}
      </h1>
      <p>
        Autor:
        {' '}
        {book.author}
      </p>
      <p>
        País de origem:
        {' '}
        {book.country}
      </p>
      <p>
        Língua:
        {' '}
        {book.language}
      </p>
      <p>
        Quantidade de páginas:
        {' '}
        {book.pages}
      </p>
      <p>
        Ano de lançamento:
        {' '}
        {yearAcOrDC(book.year)}
      </p>
      <a href={book.link}>Saiba mais</a>
      <img alt={`Foto do livro: ${book.title}`} src={book.imageLink} />
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
