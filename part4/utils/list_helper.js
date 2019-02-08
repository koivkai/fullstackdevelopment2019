const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0) {
        return 0
    }
    let total = blogs.reduce((sum, nextValue) => {
        return sum + nextValue.likes
    },0)
    return total
}

const favoriteBlog = (blogs) => {
    let first = blogs[0]
    //console.log('first', first)

    let favorite = blogs.reduce((favSoFar, current) => {
        //console.log('favSoFar', favSoFar, 'current', current)
        //console.log('current likes', current.likes, 'favsofar likes ', favSoFar.likes)
        if (current.likes > favSoFar.likes) {
            //console.log('IFFIFIFIFIFIFIFIFIFIFIFFIFIIFFIFI')
            return current           
        }
        //console.log('iffin jälkeen favsofar', favSoFar)
        return favSoFar
    }, first)
    //console.log('Favorite to return', favorite)
    return favorite
}

const mostBlogs = (blogs) => {
    let bloggerStats = blogs.reduce((prev, current) => {
        let bloggerInStats = prev.find((blogger) => {
            return  blogger.author === current.author
         })
         if (bloggerInStats) {
            bloggerInStats.blogs = bloggerInStats.blogs +1
            return prev
        } else {
            return prev.concat({author: current.author, blogs: 1})
        }

    },[])
    console.log(bloggerStats)
    let bloggerWithMostBlogs = bloggerStats.reduce((prev, current) => {
        if (current.blogs >= prev.blogs) {
            return current
        }
        return prev
    },{author: '', blogs: 0})
    return bloggerWithMostBlogs
}
  
const mostLikes = (blogs) => {
    let bloggerStats = blogs.reduce((prev, current) => {
        let bloggerInStats = prev.find((blogger) => {
           return  blogger.author === current.author
        })
        if(bloggerInStats) {
            bloggerInStats.likes = bloggerInStats.likes + current.likes
            return prev
        } else {
            return prev.concat({author: current.author, likes: current.likes})
        }    
    },[])
    //console.log(bloggerStats)
    let mostLiked = bloggerStats.reduce((prev, current) => {
        if (current.likes >= prev.likes) {
            return current
        }
        return prev
    },{author: '', likes: 0})

    return mostLiked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
}