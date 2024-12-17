import axios from "axios";

const API_BASE_URL = "https://raw.githubusercontent.com/RashitKhamidullin/Educhain-Assignment/refs/heads/main/applications";

export const fetchApplications = async () => {
    try{
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error){
        console.error("Error Fetching Applications:", error);
        throw error;
    }
}