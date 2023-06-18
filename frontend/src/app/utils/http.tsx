import getBaseURL from "./common";

export async function upload(formData: FormData): Promise<any> {
    try {
      const API_URL = (getBaseURL() === 'https://frontend-zeta-five-61.vercel.app/') ? 'https://kidy-dult-backend.vercel.app/' : 'http://localhost:3000/';

      const response = await fetch(`${API_URL}upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error occurred while processing the files.');
      }
    } catch (error) {
      throw new Error('Error occurred while uploading the files.');
    }
}
  