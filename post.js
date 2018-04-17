const newPost = document.querySelector('#create-post')

newPost.addEventListener('click', event => {
    const formContainer = document.querySelector('#view')
    formContainer.classList.remove('d-none')
})

function createDatButt(post){
    const newButt = document.createElement('button')
    newButt.classList.add('list-group-item', 'list-group-item-action')
    newButt.id = post.id
    newButt.innerHTML = post.title
    newButt.addEventListener('click', renderPost)
    return newButt
}

const sidebar = document.querySelector('#sidebar')
axios.get('http://localhost:3000/posts')
    .then( response => {
        const titles = []
        const posts = response.data.data
        posts.forEach( ele => {
            console.log(createDatButt(ele))
            // sidebar.appendChild(createDatButt(ele))
        })
    })

function renderPost(event){
    event.preventDefault()
    let postId = this.id
    let display = document.querySelector('')
}    