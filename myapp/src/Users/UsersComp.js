import React, { Component } from 'react'
import "./Users.css"
class UsersComp extends Component {
    constructor() {
        super()
        //the state of every user 
        this.state =
        {
            name: "", email: "", street: "", city: "", zipcode: "",
            isExist: false,
            todos: [],
            TodosDIVCretae: false,
            PostsDIVCretae: false,
            flag: false,
            addTodosDiv: false,
            changeDiv: false,
            changeDivPosts: false,
            buttonDiv: false

        }
    }
    //set the props to the state when the comp Mount
    componentDidMount() {
        this.setState({ name: this.props.name, email: this.props.email, street: this.props.street, city: this.props.city, zipcode: this.props.zipCode })
    }
    //the other data div
    createDestroy = () => {
        this.setState({ isExist: true })

    }
    //the other data close div
    createDestroyClick = () => {
        this.setState({ isExist: false })

    }
    //the todos div
    TodosDIVCretae = () => {

        this.setState({ TodosDIVCretae: !this.state.TodosDIVCretae })
    }
    //the update user data form 
    CustomSubmit = async (e) => {

        e.preventDefault();

        {
            let id = this.props.id
            let NameUser1FromChg = this.state.name ? this.state.name : this.props.name
            let EmailUserFromChg = this.state.email ? this.state.email : this.props.email
            let StreetFromUserChg = this.state.street ? this.state.street : this.props.street
            let CityFromUserChg = this.state.city ? this.state.city : this.props.city
            let ZipFromUserChg = this.state.zipcode ? this.state.zipcode : this.props.zipCode
            let obj = { id, NameUser1FromChg, EmailUserFromChg, StreetFromUserChg, CityFromUserChg, ZipFromUserChg }
            await this.props.callback(obj)
        }


    }
    //add new post to the posts list
    addNewPosts = async () => {
        let userId = this.props.userId
        let newBody = this.state.newBody
        let NewPost = this.state.newPosts
        let id = this.props.id
        let obj = { id, NewPost, newBody, userId }
        await this.props.callbackPosts(obj)
    }
    //add new todo to the todos list
    addNewTOdos = async () => {
        let userId = this.props.userId
        let NewTodo = this.state.newTodos
        let id = this.props.id
        let obj = { id, NewTodo, userId }
        await this.props.callbackTodos(obj)
    }
    //delete the from state and update the data in the parents
    deleteData1 = async () => {

        await this.setState({ name: "", email: "", street: "", city: "", zipcode: "" })
        let delStreet = ""
        let delName = ""
        let delEmail = ""
        let delCity = ""
        let delZip = ""
        let id = this.props.id
        let obj = { id, delName, delEmail, delStreet, delCity, delZip }
        await this.props.callbackDelete(obj)
    }
    //mark complete the todos tasks
    MarkTaskComp = (id) => {
        this.props.UserTodos.filter(({ userId }) => userId === this.props.id).map(item => {
            if (id === item.id) {
                if (item.completed === false) {
                    this.setState({ flag: true })
                    item.completed = true
                }
            }
            return item
        })

    }


    render() {



        //border style based on completed
        let Completed = this.props.UserTodos.map(x => x.completed)
        let BorderStyle = Completed.includes(false) ? "redStyle" : "greenStyle"
        //the other data div
        let divElement;
        if (this.state.isExist) {
            divElement =
                <div className="OtherDataBackGround">
                    street :
                    <input type="text"
                        style={{ marginLeft: "13px" }}
                        defaultValue={this.state.street}
                        onChange={e => this.setState({ street: e.target.value })} />
                    <br />
                    City:
                    <input type="text"
                        style={{ marginLeft: "30.5px" }}
                        defaultValue={this.state.city}
                        onChange={e => this.setState({ city: e.target.value })} />
                    <br />
                    zipCode:
                    <input type="text"
                        defaultValue={this.state.zipcode}
                        onChange={e => this.setState({ zipcode: e.target.value })} />
                    <br />
                </div>
        }
        // the divisions  of add buttons ,the button will not seen when they clicked a
        let buttonDivisionTodos;
        let buttonDivisionPosts;
        if (this.state.changeDiv === false) {
            buttonDivisionTodos = <input type="button" style={{ marginInline: "3px" }} value="add" className="buttons" onClick={() => this.setState({ changeDiv: true })} />

        }
        if (this.state.changeDivPosts === false) {
            buttonDivisionPosts = <input type="button" value="add" style={{ marginInline: "3px" }} className="buttons" onClick={() => this.setState({ changeDivPosts: true })} />

        }
        if (this.state.changeDiv === true) {
            buttonDivisionTodos = ""
        }
        if (this.state.changeDivPosts === true) {
            buttonDivisionPosts = ""
        }




        //the posts div
        let postsDiv;
        if (this.state.TodosDIVCretae) {
            postsDiv =
                <div class="fixed" className="border">
                    {buttonDivisionPosts}
                    {/*  the condision for the add new posts div*/}
                    {!this.state.changeDivPosts ?
                        this.props.UserPosts.filter(({ userId }) => userId === this.props.id).map(item => {
                            return <div style={{ border: "3px solid black", marginInline: "3px" ,marginBlock: "5px" }}>
                                <h5 key={item.id}>title : {item.title}</h5>
                                <h5 key={item.id}> boby : {item.body}</h5>
                            </div>

                        })
                        :
                        <div style={{ marginInline: "35px" }}>
                            <h5> add new post</h5>
                                title:
                                <input type="text"
                                style={{ border: "2px solid black", marginLeft: "9px" }}
                                placeholder="enter new Title..."
                                onChange={e => this.setState({ newPosts: e.target.value })} />
                            <br />
                                body:
                                <input type="text"
                                style={{ border: "2px solid black" }}
                                placeholder="enter new Body..."
                                onChange={e => this.setState({ newBody: e.target.value })} />
                            <br />
                                add new post:
                                <input type="button"
                                style={{ border: "2px solid black" }}
                                className="buttons" value="add post"
                                onClick={() => this.addNewPosts(this.props.id, this.props.userId)} />
                            <br />
                                cancel:
                                <input type="button"
                                style={{ border: "2px solid black" }}
                                className="buttons" value="cancel"
                                onClick={() => this.setState({ changeDivPosts: false })} />
                            <br />
                        </div>
                    }




                </div>
        }


        //the todos div 
        let TodosDiv;
        if (this.state.TodosDIVCretae) {
            TodosDiv =
                <div class="fixed" className="border">
                    {buttonDivisionTodos}
                    {/*  the condision for the add new todos div*/}
                    {!this.state.changeDiv ?

                        this.props.UserTodos.filter(({ userId }) => userId === this.props.id).map(item => {
                            return <div style={{ border: "3px solid black", marginInline: "3px" ,marginBlock: "5px"}} >
                                <h5 key={item.id}>title : {item.title}</h5>
                                <h5 key={item.id}> complete   : {item.completed.toString()}</h5>
                                        click to complete task  : <input type="button" value="complete Task" onClick={() => this.MarkTaskComp(item.id)} />
                           
                            </div>
                            
                        })



                        :
                        <div style={{ marginInline: "35px" }}>
                            <h5> add new todos</h5>
                            title  :
                            <input type="text"
                                style={{ border: "3px solid black" }}
                                placeholder="enter new Title..."
                                onChange={e => this.setState({ newTodos: e.target.value })} />
                            <br />
                            add new todos :
                            <input type="button"
                                className="buttons"
                                style={{ border: "2px solid black" }}
                                value="add todos"
                                onClick={() => this.addNewTOdos(this.props.id, this.props.userId)} />
                            <br />
                            cancel  :
                            <input type="button"
                                className="buttons"
                                style={{ border: "2px solid black" }}
                                value="cancel"
                                onClick={() => this.setState({ changeDiv: false })} />
                            <br />
                        </div>
                    }


                </div>
        }



        //the backGroung when we click on id label 
        let OrangeBackGroung
        if (this.state.TodosDIVCretae) {
            OrangeBackGroung = "TodosDivBackGroung"
        }
        return (

            <div className="container">
                <div className="flex-item" class={BorderStyle} >
                    <form onSubmit={e => this.CustomSubmit(e)} className={OrangeBackGroung}>
                        ID :
                        <input style={{ border: "2px solid black", marginLeft: "34.5px" }}
                            value={this.props.id}
                            onClick={this.TodosDIVCretae} />
                        <br />
                    Name  :
                        <input type="text"
                            style={{ border: "2px solid black", marginLeft: "8px" }}
                            defaultValue={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />
                        <br />
                   Email :
                        <input type="text"
                            style={{ border: "2px solid black", marginLeft: "12px" }}
                            defaultValue={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })} />
                        <br />
                        {/*the buttons  */}
                        {/*"Other Data button"*/}
                        <input type="button" className="buttonOhterData" value="Other Data" onMouseOver={this.createDestroy} onClick={this.createDestroyClick}></input>
                        {/*"update button"*/}
                        <input type="submit" className="buttons" value="Update" ></input>
                        {/*"Delete button"*/}
                        <input type="button" className="buttons" value="Delete" onClick={() => this.deleteData1(this.props.id)}></input>
                        {divElement}
                    </form>
                </div>
                {TodosDiv}
                {postsDiv}
    
            </div>


        )
    }
}
export default UsersComp