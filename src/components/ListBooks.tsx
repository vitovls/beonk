import React, { useEffect, useState } from 'react'
import Book from '../interfaces/Book'

export default function ListBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
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

  return (
    <div>
      <h1>List of books</h1>
      {loading && <p>Loading...</p>}
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
      <button type="button" onClick={() => setPage(page + 1)}>Próxima</button>
    </div>
  )
}
