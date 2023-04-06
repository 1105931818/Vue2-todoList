<template>

    <div>
        <Todo/>
    </div>

</template>


<script>

    //引入组件
    import Todo from "./components/Todo.vue"
    export default {
        name:"App",
        data() {
            return {
                
            }
        },
        components:{
            Todo
        },
    }

</script>

