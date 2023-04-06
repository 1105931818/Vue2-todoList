<template>
    <div class="todo-footer" v-show="total">
        <label for="">
            <input type="checkbox" :checked="isAll" @change="overAll">
            <!-- <input type="checkbox" v-model="isAll">  计算属性修改值得设置setter方法-->
            <span>已完成<span>{{ doneTotal }}</span>/全部<span>{{ total }}</span></span>
        </label>
        <button @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>

    export default {
        name:"TodoFooter",
        data() {
            return {
               
            }
        },
        props:{
            todos:{
                type:Array,
                reqiured:true
            }/* ,
            todoAll:{

            },
            todoClear:{

            } */
        },
        computed:{
            doneTotal(){
                /* let i = 0
                this.$props.todos.forEach((todo) => {
                    if(todo.done){
                        i++
                    } 
                });
                
                return i */
                return this.todos.reduce((pre , current) => pre + (current.done ? 1 : 0) ,0)
            },
            total(){
                return this.todos.length
            },
            isAll:{
                get(){
                    return this.doneTotal === this.total && this.total > 0
                },
                set(checked){
                    this.todoAll(checked)
                }
            }
        },
        methods:{
            overAll(e){
                /* this.todoAll(e.target.checked) */
                this.$emit("todoall" , e.target.checked)
            },
            clearAll(){
                /* this.todoClear() */
                if(confirm("确定全部清除吗")){
                    this.$emit("todoclear")
                }
            }
        }
    }

</script>

<style scoped lang="less">
    .todo-footer{
        width: 500px;
        height: 40px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;

        button{
            width: 150px;
            height: 40px;
            background-color:cadetblue;
            border: none;
            border-radius: 8px;
            color: darkolivegreen;
        }
        input{
            margin-right: 10px;
        }
    }
</style>