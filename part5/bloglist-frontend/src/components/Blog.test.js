import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent, getAllByTestId } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('Blogs shows basic info correctly before and after click', () => {
  const blog = {
    title: 'pekan blogi',
    author: 'pekka',
    url: 'pekka.com',
    likes: 5,
    user: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…5ODl9.fV56F4m0bbXebeUv4QbtNbJxX48xE1Pk_CdOoAOKzps', username: 'testi', name: 'testi kayttaja', id: '5c695ac2eea640049edf09c9' }
  }

  const blogs = [
    {
      title: 'pekan blogi',
      author: 'pekka',
      url: 'pekka.com',
      likes: 5,
      user: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…5ODl9.fV56F4m0bbXebeUv4QbtNbJxX48xE1Pk_CdOoAOKzps', username: 'testi', name: 'testi kayttaja', id: '5c695ac2eea640049edf09c9' }
    },
    {
      title: 'matin blogi',
      author: 'matti',
      url: 'matti.com',
      likes: 2,
      user: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…5ODl9.fV56F4m0bbXebeUv4QbtNbJxX48xE1Pk_CdOoAOKzps', username: 'testi', name: 'testi kayttaja', id: '5c695ac2eea640049edf09c9' }
    }
  ]

  const user = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…5ODl9.fV56F4m0bbXebeUv4QbtNbJxX48xE1Pk_CdOoAOKzps', username: 'testi', name: 'testi kayttaja', id: '5c695ac2eea640049edf09c9' }

  const mockSetBlogs = jest.fn()

  const component = render(
    <Blog  blog={blog} blogs={blogs} setBlogs={mockSetBlogs} user={user}/>
  )

  expect(component.container).toHaveTextContent(
    'pekan blogi by pekka'
  )

  expect(component.container).not.toHaveTextContent(
    'url: pekka.com, likes: 5'
  )

  const div = component.getByText('pekan blogi by pekka')
  fireEvent.click(div)

  expect(component.container).toHaveTextContent(
    'pekan blogi by pekka, url: pekka.com, likes: 5'
  )
})