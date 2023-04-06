<template>
    <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add" ref="inp"/>
    </div>
</template>

<script>

    import {nanoid} from "nanoid"
    export default {
        name:"TodoHeader",
        data() {
            return {
                title:""
            }
        },
        props:{
            //不推荐利用props修改数据，
            todos:{
                type:Array,
                required:true
            }/* ,
            addTodo:{

            } */
        },
        methods:{
            add(){
                //对输入的数据进行校验，不能为空和空格trim()
                if(!this.title.trim()) {
                    this.title = ""
                    return alert("输入不能为空")
                }

                const todoObj = {id:nanoid() , name:this.title , done:false /* , isEdit:false */}

                this.$emit("addtodo" , todoObj)
               /*  //添加信息
                this.$props.addTodo(todoObj) */
                this.title = ""
            }
        }
    }

</script>

<style scoped lang="less">
    .todo-header{
        width: 450px;
        height: 40px;
        margin: auto;

        input{
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            color: darkolivegreen;
            padding-left: 10px;
            box-sizing: border-box;
            
        }
        input::-webkit-input-placeholder{
                color: darkolivegreen;
            }
    }
</style>