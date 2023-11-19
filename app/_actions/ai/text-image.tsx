import axios from "axios"
import { absoluteUrl } from "@/lib/utils";

const faqEndpoint = absoluteUrl("/api");

const aiTextImageApi = axios.create({
    baseURL: faqEndpoint,
})

export const textImageEndpoint = '/ai/text-image'

export const getTextImage = async () => {
    const response = await aiTextImageApi.get(textImageEndpoint)
    return response.data
}