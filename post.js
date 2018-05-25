function createDatButt(post){
    const newButt = document.createElement('button')
    newButt.classList.add('list-group-item', 'list-group-item-action')
    newButt.id = post.id
    newButt.innerHTML = post.title
    newButt.addEventListener('click', renderPost)
    return newButt
}

const display = document.querySelector('#display-all-posts')
axios.get('http://localhost:3000/posts')
    .then( response => {
        const postTitles = []
        const posts = response.data.data
        for(let i = 0; i <= posts.length -1; i++) {
            const b = createDatButt(posts[i])
            display.appendChild(b)
        }
    })

function renderPost(){
    event.preventDefault()
    let postId = this.id
    let display = document.querySelector('#card-display')
    let titleHeader = document.querySelector('#post-title')
    let contentPosts = document.querySelector('#content-posts')
    let formDisplay = document.querySelector('#form-display')
    formDisplay.style.display = 'none'
    axios.get(`http://localhost:3000/posts/${postId}`)
    .then( response => {
        console.log(response.data.data)
        const post = response.data.data
        let title = post.title
        let content = post.content
        display.value = post.id
        titleHeader.innerHTML = title
        display.style.display = 'block'
        contentPosts.innerHTML = content
    })
    .catch( error => {
        const { status, message } = error.response.data
    })
}

document.querySelector('#create-post').addEventListener('click', event => {
    event.preventDefault()
    let cardDisplay = document.querySelector('#card-display')
    let formDisplay = document.querySelector('#form-display')
    cardDisplay.style.display = 'none'
    formDisplay.style.display = 'block'
    let titleHeader = document.querySelector('#post-title')
    let contentPosts = document.querySelector('#content-posts')

    document.querySelector('#form-submit').addEventListener('click', event => {
        let title = document.querySelector('#form-title').value
        let content = document.querySelector('#form-content').value
        if(title && content) {
            axios.post(`http://localhost:3000/posts`, { title, content })
            .then(response => {
                const post = response.data.data
                let title = post.title
                let content = post.content
                formDisplay.style.display = "none"
                cardDisplay.style.display = "block"
                titleHeader.innerHTML = title
                contentPosts.innerHTML = content
                location.reload()
              })
              .catch( error => {

                const {
                  status,
                  message
                } = error.response.data
              })
          }
        })
      })
      
      document.querySelector('#edit-post').addEventListener('click', function(event) {
        event.preventDefault()
        const postID = event.target.parentNode.value
        let carddisplay = document.querySelector('#card-display')
        let formdisplay = document.querySelector('#form-display')
        let titleHeader = document.querySelector('#post-title').innerHTML
        let contentPosts = document.querySelector('#content-posts').innerHTML
        let formTitle = document.querySelector('#form-title')
        let formContent = document.querySelector('#form-content')
        carddisplay.style.display = "none"
        formdisplay.style.display = "block"
        formTitle.value = titleHeader
        formContent.innerHTML = contentPosts
        console.log(postID)
        document.querySelector('#form-submit').addEventListener('click', function(event) {
          let title = document.querySelector('#form-title').value
          let content = document.querySelector('#form-content').value
          axios.put(`http://localhost:3000/posts/${postID}`, {title, content})
            .then(function(response) {
              const post = response.data.data
              let title = post.title
              let content = post.content
              titleHeader.innerHTML = title
              contentPosts.innerHTML = content
              formdisplay.style.display = "none"
              carddisplay.style.display = "block"
              location.reload()
            })
            .catch(function(error) {
              const { status, message} = error.response.data
            })
        })
      })
      
      document.querySelector('#remove-post').addEventListener('click', function(event) {
        event.preventDefault()
        const postID = event.target.parentNode.value
      
        axios.delete(`http://localhost:3000/posts/${postID}`)
          .then(function(response) {
            location.reload()
          })
          .catch(function(error) {
            const {
              status,
              message
            } = error.response.data
          })
      })
      