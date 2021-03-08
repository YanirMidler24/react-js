import React, { Component } from 'react'
import UsersDataUtils from './UsersDataUtils'
import UsersComp from './Users/UsersComp'

class UserMainComp extends Component 
{
    constructor() 
    {
        super()
        this.state = 
        {
            user_data: [], user_posts: [], user_todos: [],
            addUserDIv: false
        }
    }
    async componentDidMount() 
    {
        //user state 
        let resp_users = await UsersDataUtils.getUserData()
        let resp_posts = await UsersDataUtils.getUsersPosts()
        let resp_todos = await UsersDataUtils.getUsersTodos()
        this.setState({ user_data: resp_users,user_posts: resp_posts, user_todos: resp_todos })

    }
    addPosts = (obj) => 
    {
        const user_posts = [...this.state.user_posts]
        const nextId = user_posts.length
        user_posts.push({ title: obj.NewPost, id: nextId + 1, body: obj.newBody, userId: obj.id })
        this.setState({ user_posts })
    }
    addTodos = (obj) => 
    {
        const user_todos = [...this.state.user_todos]
        const nextId = user_todos.length
        user_todos.push({ title: obj.NewTodo, id: nextId + 1, completed: false, userId: obj.id })
        this.setState({ user_todos })
    }
    getNameUser1 = (obj) => 
    {
        const user_data = [...this.state.user_data]
        user_data.filter(x => 
        {
            if (x.id === obj.id) 
            {
                x.name = obj.NameUser1FromChg
                x.email = obj.EmailUserFromChg
                x.street = obj.StreetFromUserChg
                x.zipcode = obj.ZipFromUserChg
                x.city = obj.CityFromUserChg

            }

            return x
        })
        this.setState({ user_data })
    }
    DelUser = (obj) => 
    {
        const user_data = [...this.state.user_data]
        user_data.map(x => 
        {
            if (x.id === obj.id) 
            {
                x.name = obj.delName
                x.email = obj.delEmail
                x.street = obj.delStreet
                x.city = obj.delCity
                x.zipcode = obj.delZip
            }

            return x
        })
        this.setState({ user_data })
    }
    addUserData = (NewUserName, NewUserEmail) => 
    {
        const user_data = [...this.state.user_data]
        const nextId = user_data.length
        user_data.push({ id: nextId + 1, name: NewUserName, email: NewUserEmail, address: { city: null, street : null, zipcode : null } })
        this.setState({ user_data })
    }
    render() 
    {

        let addUser;
        if (this.state.addUserDIv) 
        {
            addUser =
                <div className="container">
                    <div className="flex-item" class="border">
                        <div>
                            <h1>Add New User</h1> <br />
                            Enter User Name  : 
                            <input type="text" 
                            style={{ border: "2px solid black" ,marginLeft : "5.5px"}}
                            onChange={e => this.setState({ NewUserName: e.target.value })} /> 
                            <br />
                            Enter User Email  : 
                            <input type="text" 
                            style={{ border: "2px solid black", marginLeft : "10px"}} 
                            onChange={e => this.setState({ NewUserEmail: e.target.value })} /> 
                            <br />
                            add New User :  
                            <input type="button" 
                            style={{ border: "2px solid black" }} 
                            value="add" className="buttons" 
                            onClick={() => this.addUserData(this.state.NewUserName, this.state.NewUserEmail)} />
                            <br />
                            cancel:  
                            <input 
                            type="button" 
                            style={{ border: "2px solid black" }} 
                            className="buttons" value="cancel" 
                            onClick={() => this.setState({ addUserDIv: false })} />
                        </div>
                    </div>
                </div>
        }
        return (
            <div>
                Search <input type="text"
                style={{ border: "2px solid black" }} 
                onChange={e => this.setState({ searchData: e.target.value })} />
                .Add New User : 
                <button type="button" 
                onClick={() => this.setState({ addUserDIv: !this.state.addUserDIv })}
                style={{marginLeft : "5px"}}>Add</button>
                
                <br/>
                {addUser}
                {this.state.user_data.map(x => 
                {
                    if (x.name.includes(this.state.searchData) || x.email.includes(this.state.searchData) || this.state.searchData == null) 
                    {
                        let user_todos = [];
                        this.state.user_todos.forEach(toDo => 
                        {

                            if (toDo.userId === x.id) 
                            {
                                user_todos.push(toDo);
                            }
                            
                        })
                        let user_posts = []
                        this.state.user_posts.forEach(posts => 
                        {

                            if (posts.userId === x.id) 
                            {
                                user_posts.push(posts);
                            }

                        })
                        return <UsersComp 
                            UserTodos={user_todos} UserPosts={user_posts} name={x.name} email={x.email} id={x.id}
                            city={x.address.city} zipCode={x.address.zipcode} street={x.address.street}
                            callback={obj => this.getNameUser1(obj)}
                            callbackDelete={obj => this.DelUser(obj)}
                            callbackTodos={obj => this.addTodos(obj)}
                            callbackPosts={obj => this.addPosts(obj)} />

                    }
                })}

            </div>
        )
    }
}
export default UserMainComp