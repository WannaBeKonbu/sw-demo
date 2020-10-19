//url
var url='http://192.168.1.178:8080';
axios.defaults.baseURL = 'http://192.168.1.178:8080'
axios.interceptors.request.use(
    config => {
        // loading show
        // document.getElementById('ajaxLoader').style.display = "inline-block";
        // this.$Spin.show();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    response => {
        // loading hidden
        // document.getElementById('ajaxLoader').style.display = "none";
        // this.$Spin.hide();
// 如果http状态码正常，则直接返回数据
        if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
            const res = response.data;
            if (res.messageCode !== 10000) {
                // 判断登录状态
                if (res.messageCode === 500004) {
                    iview.Modal.confirm({
                        title: "消息提示",
                        content: "登录超时，是否重新登录",
                        cancelText: "取消",
                        okText: "确定",
                        onOk: function () {
                            router.replace('/');
                        }
                    });
                }
                iView.Message.error(res.messageContent);
                return Promise.reject(res.messageContent || 'error');
            } else {
                // console.log(response.headers.authorization);
                let token = response.headers.authorization;
                localStorage.setItem("token", token);
                return res;

            }
        }
    },
    error => {
        // loading hidden
        // this.$Spin.hide();
        // document.getElementById('ajaxLoader').style.display = "none";
        // iView.Message.error("接口报错啦！");
        return Promise.reject(error);
    }
);
function  post(url, data) {
    return axios({
        method: 'post',
        baseURL: '/',
        url:url,
        data: JSON.stringify(data),
        // timeout: 20000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization':  getToken(),
        },
        proxy: {
            host: '192.168.1.178',
            port: 8080,
            auth: {
                username: 'mikeymike',
                password: 'rapunz3l'
            }
        },
    })
};
function get(url, params) {
    return axios({
        method: 'get',
        baseURL: '/',
        url:url+url,
        params,
        // timeout: 20000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'authorization': getToken(),
        }
    })
}
