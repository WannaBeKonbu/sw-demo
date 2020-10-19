Vue.component('base-title', {
    name:"baseTitle",
    props:{
        title:{
            type:String,
            default(){
                return ''
            }
        },
    },
    data: function () {
        return {

        }
    },
    template:`<div class="m-title">
                <span class="u-name">{{title}}</span>
              </div>`
})