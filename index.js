var vm = new Vue({
    el: '.layout',
    data: {
        columns: [
            {
                title: '序号',
                type: 'index',
                width: 100
            },
            {
                title: '单位名称',
                key: 'title',
            },
            {
                title: '联系人',
                key: 'columnTitle',
            },
            {
                title: '软件名称',
                key: 'createPerson',
            },
            {
                title: '测试类型',
                key: 'createPerson',
            },
            {
                title: '申请日期',
                key: 'createPerson',
            },
            {
                title: '状态',
                key: 'createPerson',
            },
            {
                title: '操作',
                width: 300,
                slot: "action",
            },
        ],
        tableData: [],
        postList: {
            "page": 1
            , "pageSize": 10
            , "title": ""    //标题
            , "columnTitle": ""    //栏目标题
        },
        page: {
            total: 0,
            pageSize: 10
        },
        modal: false,
        modal2: false,
        modal3: false,
        formValidate: {},
        ruleValidate: {
            //                    name: [
            //                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            //                    ],
        },
        onLine: navigator.onLine,//网络状态 true：在线；false：离线
    },
    watch: {

    },
    computed: {

    },
    components: {

    },
    mounted() {
        this.initSW()
        this.init()
        this.addEventListener()
        location.reload();
    },
    //销毁
    beforeDestroy() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },
    methods: {

        /**初始化数据
         * method init
         * */
        init() {
            // post('http://localhost:8080/ycs_back/columnManage/getColumnContentList',this.postList).then((res)=>{
            //     if(res.messageCode==10000){
            //         this.tableData=res.result.columnContentList.list;
            //         this.page.total=res.result.columnContentList.total;
            //     }
            // })
        },
        initSW() {
            if ('serviceWorker' in navigator) {
                console.log('浏览器支持serviceWorker')

                // 开始注册service workers
                navigator.serviceWorker.register('./sw.js', {
                    scope: './'
                }).then(registration => {
                    console.log('service worker注册成功:', registration)

                    let serviceWorker
                    if (registration.installing) {
                        serviceWorker = registration.installing
                        console.log('当前注册状态：installing')
                    } else if (registration.waiting) {
                        serviceWorker = registration.waiting
                        console.log('当前注册状态：waiting')
                    } else if (registration.active) {
                        serviceWorker = registration.active
                        console.log('当前注册状态：active')
                    }
                    if (serviceWorker) {
                        console.log(serviceWorker.state)
                        serviceWorker.addEventListener('statechange', e => {
                            console.log('&emsp;状态变化为' + e.target.state)
                        })
                    }
                }).catch(error => {
                    console.log('service worker注册失败:', error)
                })
            } else {
                console.log('浏览器不支持serviceWorker')
            }
            fetch('https://fomenyesu.github.io/service-worker-demo/api.json', {
                method: 'get'
            }).then(function (response) {
                console.log(response);
            }).catch(function (err) {
                // Error :(
                console.log(err);
            });
        },
        initWebSql() {
            let ycsDb = openDatabase('ycsDb', '1.0', 'ycs db', 50 * 1024 * 1024);
            console.log(ycsDb)
            ycsDb.transaction(function (tx) {
                tx.executeSql('SELECT * FROM T_YCS_PROGRAM WHERE program_id = ?', [1], function (tx, results) {
                    for (let i = 0; i < results.rows.length; i++) {
                        let program = results.rows.item(i);
                        alert(program.program_id + "--" + program.code + "--" + program.name + "--" + program.company + "--" + program.program_type + "--" + program.apply_date);
                    }
                })
            })
        },
        /**添加监听事件
         * method addEventListener
         * */
        addEventListener() {
            console.log(1)
            //监听网络连接状态-离线转在线
            window.addEventListener('online', this.updateOnlineStatus)
            //监听网络连接状态-在线转离线
            window.addEventListener('offline', this.updateOnlineStatus)
            console.log(this.onLine)
            if (this.onLine) {

            } else {
                this.initWebSql()
            }
        },
        /**获取网络状态
         * method updateOnlineStatus
         * */
        updateOnlineStatus(e) {
            const { type } = e;
            this.onLine = type === 'online';
        },
        /**查询
         * method search
         * */
        search() {
            this.postList.page = 1;
            this.init()
        },
        // <div class="m-btn-item" @click="view(row)">查看</div>
        // <div class="m-btn-item" @click="update(row)">更新</div>
        // <div class="m-btn-item" @click="synchronous(row)">同步</div>
        // <div class="m-btn-item" @click="resultEntry(row)">结果录入</div>
        // <div class="m-btn-item" @click="regressionTest(row)">回归测试</div>
        /**查看
         * method view
         * */
        view(item) {

        },
        /**更新
         * method update
         * */
        update(item) {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/ycs_back/ycsOffline/getYcsResultInputInfo",
                data: item.id,
                dataType: "JSON",
                success: function (result) {
                    alert(result.messageCode);
                    if ("10000" == result.messageCode) {
                        var ycsDb = openDatabase('ycsDb', '1.0', 'ycs db', 50 * 1024 * 1024);
                        ycsDb.transaction(function (tx) {
                            //删除表
                            // tx.executeSql('DROP TABLE IF  EXISTS T_YCS_PROJECT');
                            //创建项目表（如不存在）
                            tx.executeSql('CREATE TABLE IF NOT EXISTS T_YCS_PROGRAM (program_id unique , code, name, company, program_type, apply_date)');
                            //创建测试用例-功能性表（如不存在）
                            tx.executeSql('CREATE TABLE IF NOT EXISTS T_YCS_CASE_FUNCTIONAL (functional_id unique , case_id, case_item, program_id, ' +
                                'case_code, case_purpose, case_init, operating_steps, input_elements, hop_result, test_result, result_status, defect_description, test_status)');
                            //创建测试用例-性能效率表
                            //创建测试用例-表头表
                            //创建测试用例-结果表
                            //创建其他类测试用例表
                            //插入项目表信息
                            tx.executeSql('INSERT INTO T_YCS_PROGRAM (program_id, code, name, company, program_type, apply_date) values (?,?,?,?,?,?)',
                                [1, 1, "测试项目", "测试单位", 10002, "2020/10/10"], function (tx, rs) {
                                    alert("保存成功！");
                                },
                                function (tx, error) {
                                    alert(error.source + "::" + error.message);
                                });
                            //插入功能性用例及结果
                            //插入测试用例-性能效率信息
                            //插入测试用例-表头信息
                            //插入测试用例-结果信息
                            //插入其他累测试用例及结果
                        })
                    }
                }

            });
        },
        /**同步
         * method synchronous
         * */
        synchronous(item) {
            var ycsDb = openDatabase('ycsDb', '1.0', 'ycs db', 50 * 1024 * 1024);
            ycsDb.transaction(function (tx) {
                tx.executeSql('SELECT * FROM T_YCS_PROGRAM WHERE program_id = ?', [1], function (tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        var program = results.rows.item(i);
                        alert(program.program_id + "--" + program.code + "--" + program.name + "--" + program.company + "--" + program.program_type + "--" + program.apply_date);
                    }
                })
            })
        },
        /**结果录入
         * method resultEntry
         * */
        resultEntry(item) {

        },
        /**回归测试
         * method regressionTest
         * */
        regressionTest(item) {

        },
        /**页码改变
         * method onChange
         * */
        onChange(page) {
            this.postList.page = page;
            this.init()
        },
        /**page-size改变
         * method onPageSizeChange
         * */
        onPageSizeChange(pageSize) {
            this.postList.pageSize = pageSize;
            this.init()
        }
    }
})
