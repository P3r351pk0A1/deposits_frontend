export interface MiningServicesInfo {
    mining_service_id: number
    name: string
    description: string
    long_description: string
    url: string
    price: number
    id: number
}

export interface CurMiningOrderInfo {
    UsersDraftId: number
    MiningServicesInUsersDraft: number
}

export interface MiningServicesResult {
    cur_mining_order: CurMiningOrderInfo
    Services: MiningServicesInfo[]
}

export const getMiningServicesByName = async (name = ""): Promise<MiningServicesResult> => {
    return fetch(`http://192.168.1.20:8000/miningServices?name=${name}`).then(
        (response) => response.json()
    )
}

export const getMiningServiceById = async (id: number): Promise<MiningServicesInfo> => {
    return fetch(`http://192.168.1.20:8000/miningServices/${id}`).then(
        (response) => response.json()
    )
}