const lodash = require('lodash')

const dummy = (blogs) => {  
  return 1;
}

const totalLikes = blogs =>{
    let likeArr = blogs.map((blog)=>blog.likes)
    let totalLikes = likeArr.reduce((p,c)=>{
      return p+c;
    },0)
    return totalLikes
}

const favouriteBlog = blogs =>{
  let listLikes = blogs.map(blog=>blog.likes)
  let maxLike = Math.max(...listLikes)
  let favourite = blogs.filter((blog)=>blog.likes===maxLike);
  return {
      title : favourite[0].title,
      author : favourite[0].author,
      likes : favourite[0].likes
  }
}

const mostBlogs = blogs =>{
  const listAuthors = blogs.map(blog=>blog.author)
  const countAuthors = {}
  for(const element of listAuthors){
      countAuthors[element] = (countAuthors[element] || 0) + 1;
  }
  const mostBlogAuth = Object.entries(countAuthors).reduce(([ak,av],[k,v])=>{
      return v >av ? [k,v] : [ak,av];
  },[null,-Infinity])

  return {
    author : mostBlogAuth[0],
    blogs : mostBlogAuth[1]
  }

}



const mostLikedAuthor = blogs =>{
  const authorWithLikes = {}
  blogs.map(blog=>{
      authorWithLikes[blog.author] = authorWithLikes.hasOwnProperty(blog.author)? authorWithLikes[blog.author] + blog.likes : blog.likes;
  })
  const mostLiked = Object.entries(authorWithLikes).reduce(([akey, aval],[key,val])=>{
      return val > aval? [key,val] : [akey,aval]
  },[null, -Infinity])
  return {
      author : mostLiked[0],
      likes : mostLiked[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikedAuthor
}