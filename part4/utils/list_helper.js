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
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}