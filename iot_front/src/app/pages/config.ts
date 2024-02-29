export const config = {
    apiUrl: 'http://localhost:3000/api/v1/'
}

export interface Milieu {
    temperature: number,
    humidite: number,
    created_at: Date
}