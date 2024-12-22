// const target_tauri = false
const target_tauri = true

export const api_proxy_addr = "http://localhost:8000"
export const img_proxy_addr = "http://localhost:9000"
export const dest_api = (target_tauri) ? "http://192.168.43.190:8000" : 'http://localhost:8000'
export const dest_img =  (target_tauri) ?  "http://192.168.43.190:9000" : 'http://localhost:9000'
export const dest_root = (target_tauri) ? "192.168.43.190" : "0.0.0.0"