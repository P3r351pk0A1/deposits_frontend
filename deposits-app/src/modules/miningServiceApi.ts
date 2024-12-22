import {dest_api} from "../../target_config"


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
    active_m_order: CurMiningOrderInfo
    services: MiningServicesInfo[]
}

export const getMiningServicesByName = async (name = ""): Promise<MiningServicesResult> => {
    try {
        const response = await fetch(dest_api + `/miningServices?name=${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch mining services:', error);
        throw new Error('Failed to fetch mining services');
    }
}

export const getMiningServiceById = async (id: number): Promise<MiningServicesInfo> => {
    return fetch(dest_api + `/miningServices/${id}`).then(
        (response) => response.json()
    )
}