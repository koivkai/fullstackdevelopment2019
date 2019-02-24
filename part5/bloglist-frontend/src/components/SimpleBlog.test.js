import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('blog is rendered correctly', () => {
    const blog = {
        title: 'Batmans batblog',
        author: 'batman',
        url: 'www.batcave/bats/blog',
        likes: 2
    }

    const component = render(
        <SimpleBlog blog={blog}/>
    )

    expect(component.container).toHaveTextContent(
        'Batmans batblog batman'
    )

    const likesDiv = component.container.querySelector('.blogLikes')
    expect(likesDiv).toHaveTextContent(
        'blog has 2 likes'
    )
})