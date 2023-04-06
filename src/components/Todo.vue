<template>
    <div class="todo">
        <TodoHeader :todos="todos"  @addtodo="addTodo" /><!-- :addTodo="addTodo" -->
        <TodoList :todos="todos" /><!-- :deleteTodo="deleteTodo" :checkTodo="checkTodo" -->
        <TodoFooter :todos="todos"  @todoall="todoAll" @todoclear="todoClear" /><!-- :todoAll="todoAll" :todoClear="todoClear" -->
    </div>
</template>

<script>

    import TodoHeader from './TodoHeader.vue';
    import TodoList from './TodoList.vue';
    import TodoFooter from './TodoFooter.vue';
    import { nanoid } from 'nanoid';

    export default {
        name:"ToDo",
        data() {
            return {
               todos: JSON.parse(localStorage.getItem("todos")) || [
                {id:nanoid() , name:"学习" , done:"false" /* , isEdit:"false" */}
               ]
            }
        },
        components:{
            TodoHeader,
            TodoList,
            TodoFooter
        },
        mounted(){
            this.$bus.$on("deletetodo" ,/* (id) => {
                this.todos = this.todos.filter(todo => todo.id !== id)
            } */ this.deleteTodo)
            this.$bus.$on("checktodo" , /* (id) => {
                this.todos.forEach((todo) => {
                    if(todo.id ===id) todo.done = !todo.done
                })
            } */ this.checkTodo)
            this.$bus.$on("todoedit" , this.todoEdit)
        },
        beforeDestroy(){
            this.$bus.$off(["deletetodo" , "checktodo" , "todoedit"])
        },
        methods:{
            addTodo(todoObj){
                this.todos.unshift(todoObj)
            },
            deleteTodo(id){
                this.todos = this.todos.filter(todo => todo.id !== id)
            },
            checkTodo(id){
                this.todos.forEach((todo) => {
                    if(todo.id ===id) todo.done = !todo.done
                })
            },
            todoAll(done){
                this.todos.forEach((todo) => {
                    todo.done = done
                })
            },
            todoClear(){
                this.todos = this.todos.filter(todo => !todo.done )
            },
            todoEdit(id , name){
                this.todos.forEach((todo) => {
                    if(todo.id === id) {
                        if(todo.name !== name) todo.name = name
                    }
                })
            }
        },
        watch:{
            todos:{
                deep:true,
                handler(value){
                    localStorage.setItem("todos" , JSON.stringify(value))
                }
            }
        }
    }

</script>

<style scoped>
    .todo{
        width: 600px;
        background-color: darkolivegreen;
        border-radius: 12px;
        margin: auto;
        padding: 50px;
        box-sizing: border-box;
    }
</style>