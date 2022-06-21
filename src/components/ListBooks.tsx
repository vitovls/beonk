import React, { useEffect, useState } from 'react'
import Book from '../interfaces/Book'

export default function ListBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState({
    by: '',
    search: '',
  })
  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:4000/books?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data)
        setLoading(false)
      })
  }, [page])

  const yearAcOrDC = (year: number) => (year >= 0 ? year : `${Math.abs(year)} A.C.`)

  const searchByQuery = () => {
    setLoading(true)
    fetch(`http://localhost:4000/books?${query.by}_like=${query.search}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data)
        setLoading(false)
      })
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
      <button type="button" onClick={searchByQuery}>Pesquisar</button>
      {loading && <p>Loading...</p>}
      {books.length < 1 && !loading && <p>Nenhum livro encontrado...</p>}
      {books.map((book) => (
        <table>
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
      ))}
      <button type="button" onClick={() => setPage(page - 1)}>Anterior</button>
      <input value={page} onChange={(event) => setPage(Number(event.target.value))} />
      <button type="button">{page + 1}</button>
      <button type="button">{page + 2}</button>
      ...
      <button type="button">{0}</button>
      <button type="button" onClick={() => setPage(page + 1)}>Próxima</button>
    </div>
  )
}
