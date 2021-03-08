import axios from "axios"

const getUserData =  async function()
{
    let resp_users = await axios.get("http://jsonplaceholder.typicode.com/users")
    return  resp_users.data
}
const getUsersPosts =async function()
{
    let resp_posts = await axios.get("http://jsonplaceholder.typicode.com/posts")
    return resp_posts.data
}
const getUsersTodos =async function()
{
    let resp_todos = await axios.get("http://jsonplaceholder.typicode.com/todos")
    return resp_todos.data
}
export default {getUserData,getUsersPosts,getUsersTodos}