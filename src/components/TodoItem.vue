<template>
    <!-- <transition name="todo" appear> -->
    <div class="todo-item">
        <label for="">
            <input type="checkbox" class="box1" :checked="todo.done" @change="headerCheck(todo.id)"/>
            <!-- <input type="checkbox" v-model="todo.done"> 不能通过props修改值-->
            <span v-show="!todo.isEdit">{{ todo.name }}</span>
            <input v-show="todo.isEdit" 
                type="text" class="box2" 
                v-model="title" 
                @blur="add(todo,$event)"
                ref="box2" ><!-- @keyup.enter="add(todo)" -->
        </label>
        <div class="btn">
            <button v-show="!todo.isEdit" @click="edit(todo)">编辑</button>
            <button @click="del(todo.id)">删除</button>
        </div>
    </div>
    <!-- </transition> -->
</template>

<script>

    export default {
        name:"TodoItem",
        data() {
            return {
                title:this.todo.name
            }
        },
        props:{
            todo:{
                type:Object,
                required:true
            }/* ,
            deleteTodo:{

            },
            checkTodo:{

            } */
        },
        methods:{
            del(id){
                if(confirm("确定删除吗？")){
                    /* this.$props.deleteTodo(id) */
                    this.$bus.$emit("deletetodo" , id)
                }
            },
            headerCheck(id){
                /* this.$props.checkTodo(id) */
                this.$bus.$emit("checktodo" , id)
            },
            edit(todo){
                /* todo.isEdit = !todo.isEdit */

                //判断todo里面是否有isEdit这个属性
                if(Object.prototype.hasOwnProperty.call(todo , "isEdit")){
                    todo.isEdit = true
                }else{
                    this.$set(todo , "isEdit" , true)
                }

                /* setTimeout(() => {
                    this.$refs.box2.focus()
                }) */

                //DOM节点更新后执行
                this.$nextTick(() => {
                    this.$refs.box2.focus()
                })
            },
            add(todo ,event){
                if(!this.title.trim()){
                    this.title = this.todo.name
                    return alert("不能修改为空！")
                }
                console.log(event.target.value)
                this.$bus.$emit("todoedit" , todo.id , this.title)
                todo.isEdit = !todo.isEdit
            }
        }
    }

</script>

<style scoped lang="less">
    .todo-item{
        width: 450px;
        height: 40px;
        margin: auto;
        background-color: white;
        border-bottom: 1px solid #8a8a8a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:  0 10px;
        box-sizing: border-box;
        color:darkolivegreen;

        &:hover{
            background-color: #ddd;
        }

        &:hover .btn{
            display: flex;
        }

        .box1{
            margin-right: 10px;
        }

        .box2{
            width: 200px;
            height: 25px;
            color: darkolivegreen;
            font-size: 16px;
            border-radius: 4px;
            border: none;
            outline: none;
        }


        .btn{
            width: 110px;
            height: 25px;
            display: flex;
            justify-content: space-between;
            display: none;

            button{
                width: 50px;
                height: 25px;
                border: none;
                border-radius: 6px;
                background-color: darkolivegreen;

                &:first-child{
                background-color: skyblue;
                }
            }
        }
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