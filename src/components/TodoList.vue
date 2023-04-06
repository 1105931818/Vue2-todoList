<template>
    <div class="todo-list">
        <transition-group name="todo" appear>
        <TodoItem v-for="todo in todos" 
            :key="todo.id" 
            :todo="todo" />
            <!-- :deleteTodo="deleteTodo" :checkTodo="checkTodo" -->
        </transition-group>
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue';
    export default {
        name:"TodoList",
        data() {
            return {

            }
        },
        props:{
            todos:{
                type:Array,
                required:true
            },
            /* deleteTodo:{

            },
            checkTodo:{

            } */
        },
        components:{
            TodoItem
        }
    }

</script>

<style scoped>
    .todo-list{
        width: 450px;
        margin: auto;
        margin-top: 30px;
        border-radius: 8px;
        overflow: hidden;
    }

    .todo-enter-active{
        animation: animtodo 0.5s;
    }

    .todo-leave-active{
        animation: animtodo 0.5s reverse;
    }

    @keyframes animtodo{
        from{
            transform: translateX(100%);
        }
        to{
            transform: translateX(0);
        }
    }
</style>