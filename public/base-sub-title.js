Vue.component('base-sub-title', {
    name:"baseSubTitle",
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
    template:`<div class="m-title-two">
                <div class="m-title-left"><span class="u-name">{{title}}</span></div>
                <div class="m-title-right">
                  <slot></slot>
                </div>
              </div>`
})