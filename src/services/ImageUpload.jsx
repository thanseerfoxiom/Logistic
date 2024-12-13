import { BaseUrl, uploadapi } from "./BaseUrls";

export const   uploadImage = async (file) => {
  console.log("{BaseUrl+uploadapi",BaseUrl+uploadapi)
    const formData = new FormData();
    formData.append('files', file); 
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BaseUrl+uploadapi}`, {
        method: 'POST',
        body: formData, 
      });
      const result = await response.json(); 
      if (response.ok) {
        return result
        if (onUploadSuccess) {
          onUploadSuccess(result); 
            
        }
      } else {
        throw new Error(result.message || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };