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
  
module.exports = {
    dummy,
    totalLikes
}