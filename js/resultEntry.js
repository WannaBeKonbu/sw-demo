var vm = new Vue({
    el: '.layout',
    data: {
        treeData:[
            {
                title: 'parent 1',
            },
            {
                title: 'parent 2',
            }
        ],
        table:['s'],
        testResultList:[
            {dataId:1,dataName:"通过"},
            {dataId:2,dataName:"基本通过"},
            {dataId:3,dataName:"不通过"},
            {dataId:4,dataName:"不适用"},
        ],
        formValidate:{

        },
        ruleValidate:{
           casePurpose: [
               { required: true, message: '该项为必填！', trigger: 'blur' }
           ],
        },
    },
    watch:{

    },
    computed:{

    },
    components:{

    },
    mounted(){

    },
    methods:{
        /**新增
         * method add
         * */
        add(){
          this.table.push('')
        },
        /**
         * method showModal
         * */
        showModal(){

        },
        del(index) {
          this.table.splice(index, 1)
        },
        /**获取用例编号
         * method getCaseCode
         * */
        getCaseCode(index,indexChild){
            var string=this.getCaseItemName[this.getCaseItem];
            var num1=index<9 ? '0' : '';
            var num2=indexChild<99 ? '0' : '';
            var num3=indexChild<9 ? '0' : '';
            string=`${string}_${num1}${index+1}_${num2}${num3}${indexChild+1}`
            return string
        },
    }
})
