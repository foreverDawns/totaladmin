import { Loading } from 'element-ui'

let loading

export const startLoading = (text="加载中....") => {
    loading = Loading.service({
        lock: true,
        text,
        customClass: 'loadingStyle',
        background: 'rgba(0, 0, 0, 0.01)'
    })
}

export const endLoading = () => {
    loading.close()
}