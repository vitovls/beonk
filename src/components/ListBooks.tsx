import React, { useEffect, useState } from 'react'
import Book from '../interfaces/Book'
import yearAcOrDC from '../utils/yearAcOrDc'
import '../styles/ListBooks.css'
import CardBook from './CardBook'

export default function ListBooks() {
  const URL_BASE = 'http://localhost:4000/books'

  const [books, setBooks] = useState<Book[]>([])
  const [amountBooks, setAmountBooks] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState({
    by: '',
    search: '',
  })
  const [queryByYear, setQueryByYear] = useState({
    to: '',
    from: '',
  })
  const [filter, setFilter] = useState('none')

  const [modal, setModal] = useState({
    show: 'disabled',
    book: {
      author: '',
      country: '',
      language: '',
      link: '',
      pages: 0,
      title: '',
      year: 0,
      imageLink: '',
    },
  })

  const fetchBooks = () => {
    setLoading(true)
    fetch(`${URL_BASE}?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data)
        setLoading(false)
      })
    fetch(`${URL_BASE}`)
      .then((res) => res.json())
      .then((data) => {
        setAmountBooks(data.length)
      })
  }

  const searchByQuery = () => {
    setLoading(true)
    fetch(`${URL_BASE}?${query.by}_like=${query.search}&_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data)
        setLoading(false)
      })
    fetch(`${URL_BASE}?${query.by}_like=${query.search}`)
      .then((res) => res.json())
      .then((data) => {
        setAmountBooks(data.length)
      })
  }

  const searchByYear = () => {
    setLoading(true)
    fetch(`${URL_BASE}?year_gte=${queryByYear.from}&year_lte=${queryByYear.to}&_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data)
        setLoading(false)
      })
    fetch(`${URL_BASE}?year_gte=${queryByYear.from}&year_lte=${queryByYear.to}`)
      .then((res) => res.json())
      .then((data) => {
        setAmountBooks(data.length)
      })
  }

  useEffect(() => {
    if (filter === 'none') {
      fetchBooks()
    }
    if (filter === 'by query') {
      searchByQuery()
    }
    if (filter === 'by year') {
      searchByYear()
    }
  }, [page, filter])

  const paging = (prevOrNext: string) => {
    if (prevOrNext === 'prev' && page > 1) {
      setPage(page - 1)
    }
    if (prevOrNext === 'next' && books.length === 10) {
      setPage(page + 1)
    }
  }

  const resetFilter = (type: string) => {
    setPage(1)
    setFilter('')
    setTimeout(() => {
      setFilter(type)
    }, 500)
  }

  const setBookToModal = (book: Book) => {
    const { show } = modal
    if (show === 'disabled') {
      setModal({
        show: 'enabled',
        book,
      })
    } else {
      setModal({
        show: 'disabled',
        book,
      })
    }
  }

  return (
    <main className="list-container">
      <header className="list-header">
        <h1 className="list-title">Beonk</h1>
        <section className="list-inputs-search">
          <input
            onChange={(e) => setQuery({
              ...query,
              search: e.target.value,
            })}
            placeholder="Pesquisar por..."
          />
          <select
            onChange={(e) => setQuery({
              ...query,
              by: e.target.value,
            })}
          >
            <option value="">Por...</option>
            <option value="title">Título</option>
            <option value="author">Autor</option>
            <option value="language">Idioma</option>
          </select>
          <button type="button" onClick={() => resetFilter('by query')}>Pesquisar</button>
        </section>
        <section className="list-inputs-search-year">
          <p>Buscar por periodo</p>
          <input
            type="year"
            placeholder="De"
            onChange={(e) => {
              setQueryByYear({
                ...queryByYear,
                from: e.target.value,
              })
            }}
          />
          <p>-</p>
          <input
            type="year"
            placeholder="Até"
            onChange={(e) => {
              setQueryByYear({
                ...queryByYear,
                to: e.target.value,
              })
            }}
          />
          <button onClick={() => resetFilter('by year')} type="button">Buscar</button>
        </section>
      </header>
      {loading && <p>Loading...</p>}
      {books.length < 1 && !loading && <p>Nenhum livro encontrado...</p>}
      <div className="list-quantity-books">
        Quantidade de livros encontrados:
        {amountBooks}
      </div>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Idioma</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.language}</td>
              <td>{yearAcOrDC(book.year)}</td>
              <td><button onClick={() => setBookToModal(book)} type="button">Mais detalhes</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <CardBook book={modal.book} visible={modal.show} />
      <section className="list-pagination">
        <button
          type="button"
          onClick={() => paging('prev')}
        >
          Anterior
        </button>
        {amountBooks > 1 ? (
          <>
            {[...Array(Math.ceil(amountBooks / 10)).keys()].map((e, i) => (
              <button
                key={amountBooks + e}
                onClick={() => setPage(i + 1)}
                type="button"
                disabled={
                page === i + 1 && true
              }
              >
                {i + 1}
              </button>
            ))}
          </>
        ) : <button type="button">{page}</button>}
        <button type="button" onClick={() => paging('next')}>
          Próxima
        </button>
      </section>
    </main>
  )
}
