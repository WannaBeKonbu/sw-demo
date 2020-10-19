Vue.component('base-head', {
    name:"baseHead",
    props:{
        name:{
            type:String,
            default(){
                return ''
            }
        },
    },
    template:`<div id="head">
                    <div class="m-top">
                      <div class="u-img"></div>
                    </div>
              </div>`
})
