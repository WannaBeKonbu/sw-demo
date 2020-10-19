Vue.component('base-page', {
    name:"basePage",
    props:{
        page:{
            type:Object,
            default:{}
        }
    },
    data: function () {
        return {

        }
    },
    template:`<Page :total="page.total"
                    transfer
                    :page-size="page.pageSize"
                    show-elevator
                    show-total
                    show-sizer
                    @on-change="onChange"
                    @on-page-size-change="onPageSizeChange"
              />`,
    methods:{
        /**页码改变
         * method onChange
         * */
        onChange(page){
            this.$emit('onChange',page)
        },
        /**page-size改变
         * method onPageSizeChange
         * */
        onPageSizeChange(pageSize){
            this.$emit('onPageSizeChange',pageSize)
        }
    }
})


