import React, { useEffect, useState } from 'react'
import Book from '../interfaces/Book'
import CardBook from './CardBook'
import yearAcOrDC from '../utils/yearAcOrDc'

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
    setFilter('')
    setTimeout(() => {
      setFilter(type)
    }, 500)
  }

  return (
    <div>
      <h1>List of books</h1>
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
      <section>
        <p>Buscar livros por periodo de publicação</p>
        De:
        <input
          type="year"
          placeholder="Ano"
          onChange={(e) => {
            setQueryByYear({
              ...queryByYear,
              from: e.target.value,
            })
          }}
        />
        Até:
        <input
          type="year"
          placeholder="Ano"
          onChange={(e) => {
            setQueryByYear({
              ...queryByYear,
              to: e.target.value,
            })
          }}
        />
        <button onClick={() => resetFilter('by year')} type="button">Buscar</button>
      </section>
      {loading && <p>Loading...</p>}
      {books.length < 1 && !loading && <p>Nenhum livro encontrado...</p>}
      <div>
        Quantidade de livros encontrados:
        {amountBooks}
      </div>
      {books.map((book) => (
        <>
          <table key={book.title}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Idioma</th>
                <th>Ano de Publicação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.language}</td>
                <td>{yearAcOrDC(book.year)}</td>
              </tr>
            </tbody>
          </table>
          <CardBook key={`${book.title} ${book.author}`} book={book} />
        </>
      ))}
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
    </div>
  )
}
